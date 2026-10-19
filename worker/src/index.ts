// Open counter for case studies, stored in D1 (atomic increments, unlike KV).
//
//   POST /hit/:id  → adds 1 (at most once per visitor per study per minute)
//                    and returns { count, counted }
//   GET  /counts   → { "<craft item id>": count, … }
//
// The browser calls this directly from the site, so CORS only allows the
// site's own origins (ALLOWED_ORIGINS).

interface Env {
  DB: D1Database
  ALLOWED_ORIGINS: string
  SITE_URL: string
  IP_SALT: string
}

const RATE_WINDOW_MS = 60_000
const IDS_TTL_MS = 5 * 60_000

// Only IDs that exist in the Craft collection can be counted, so random
// POSTs can't create junk rows. Cached per isolate.
let known: { ids: Set<string>; at: number } | undefined

async function knownIds(env: Env) {
  if (known && Date.now() - known.at < IDS_TTL_MS) return known.ids
  try {
    const res = await fetch(`${env.SITE_URL}/api/case-studies`)
    if (!res.ok) throw new Error(`site ${res.status}`)
    const studies = (await res.json()) as { id: string }[]
    known = { ids: new Set(studies.map((study) => study.id)), at: Date.now() }
  } catch (error) {
    console.error('Could not load case-study IDs', error)
  }
  return known?.ids
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  )
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function isAllowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get('Origin') ?? ''
  return env.ALLOWED_ORIGINS.split(',')
    .map((item) => item.trim())
    .includes(origin)
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') ?? ''
  return isAllowedOrigin(request, env)
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
      }
    : { Vary: 'Origin' }
}

function json(data: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

async function hit(id: string, request: Request, env: Env, ctx: ExecutionContext) {
  const now = Date.now()
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const key = await sha256(`${env.IP_SALT}:${ip}:${id}`)

  // Claims the window only if the last counted open is older than a minute;
  // no row back means this visitor was already counted recently.
  const claimed = await env.DB.prepare(
    `INSERT INTO recent_hits (key, at) VALUES (?1, ?2)
     ON CONFLICT(key) DO UPDATE SET at = excluded.at
     WHERE recent_hits.at <= ?2 - ?3
     RETURNING at`,
  )
    .bind(key, now, RATE_WINDOW_MS)
    .first()

  // Occasionally clear out rate-limit rows nobody needs any more.
  if (Math.random() < 0.01) {
    ctx.waitUntil(
      env.DB.prepare('DELETE FROM recent_hits WHERE at < ?1')
        .bind(now - RATE_WINDOW_MS)
        .run(),
    )
  }

  if (!claimed) {
    const row = await env.DB.prepare('SELECT count FROM views WHERE id = ?1')
      .bind(id)
      .first<{ count: number }>()
    return { count: row?.count ?? 0, counted: false }
  }

  const row = await env.DB.prepare(
    `INSERT INTO views (id, count) VALUES (?1, 1)
     ON CONFLICT(id) DO UPDATE SET count = count + 1
     RETURNING count`,
  )
    .bind(id)
    .first<{ count: number }>()
  return { count: row?.count ?? 1, counted: true }
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const cors = corsHeaders(request, env)
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    const { pathname } = new URL(request.url)

    if (request.method === 'GET' && pathname === '/counts') {
      const { results } = await env.DB.prepare(
        'SELECT id, count FROM views',
      ).all<{ id: string; count: number }>()
      return json(
        Object.fromEntries(results.map((row) => [row.id, row.count])),
        200,
        cors,
      )
    }

    const match = pathname.match(/^\/hit\/([^/]+)$/)
    if (request.method === 'POST' && match) {
      // CORS only stops a browser reading the response; the POST itself
      // still arrives. Refuse it from other sites so they can't inflate
      // counts from their visitors' browsers.
      if (request.headers.has('Origin') && !isAllowedOrigin(request, env)) {
        return json({ error: 'forbidden' }, 403, cors)
      }
      const id = decodeURIComponent(match[1]!)
      const ids = await knownIds(env)
      if (!ids) return json({ error: 'unavailable' }, 503, cors)
      if (!ids.has(id)) return json({ error: 'unknown id' }, 404, cors)
      return json(await hit(id, request, env, ctx), 200, cors)
    }

    return json({ error: 'not found' }, 404, cors)
  },
} satisfies ExportedHandler<Env>
