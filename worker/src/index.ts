// Open counter for case studies, stored in D1 (atomic increments, unlike KV).
//
//   POST /hit/:id  → adds 1 (at most once per visitor per study per minute)
//                    and returns { count, counted }
//   GET  /counts   → { "<craft item id>": count, … }
//   POST /ask-limit → 204, or 429 once a visitor has asked too many of
//                    Mallow's chat questions lately; allowed questions are
//                    kept in ask_questions for 90 days. Called by the site's
//                    server (Bearer ASK_LIMIT_SECRET), never by browsers.
//
// The browser calls this directly from the site, so CORS only allows the
// site's own origins (ALLOWED_ORIGINS).

interface Env {
  DB: D1Database
  ALLOWED_ORIGINS: string
  SITE_URL: string
  IP_SALT: string
  ASK_LIMIT_SECRET: string
}

const RATE_WINDOW_MS = 60_000
const IDS_TTL_MS = 5 * 60_000
// An unknown ID may just be a study added since the last fetch, so a miss
// refetches early, but at most this often (junk IDs can't hammer the site).
const IDS_MISS_REFRESH_MS = 30_000

// Only IDs that exist in the Craft collection can be counted, so random
// POSTs can't create junk rows. Cached per isolate.
let known: { ids: Set<string>; at: number } | undefined

async function knownIds(env: Env, maxAge = IDS_TTL_MS) {
  if (known && Date.now() - known.at < maxAge) return known.ids
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

const ASK_WINDOW_MS = 10 * 60_000
const ASK_MAX = 10
const QUESTION_MAX = 500
const QUESTION_KEEP_MS = 90 * 24 * 60 * 60_000

async function askLimit(request: Request, env: Env, ctx: ExecutionContext) {
  const auth = request.headers.get('Authorization') ?? ''
  if (!env.ASK_LIMIT_SECRET || auth !== `Bearer ${env.ASK_LIMIT_SECRET}`) {
    return json({ error: 'forbidden' }, 403, {})
  }
  const { ip, question } = (await request.json().catch(() => ({}))) as {
    ip?: string
    question?: string
  }
  const key = await sha256(`${env.IP_SALT}:ask:${ip ?? 'unknown'}`)
  const now = Date.now()
  const since = now - ASK_WINDOW_MS

  const row = await env.DB.prepare(
    'SELECT COUNT(*) AS n, MIN(at) AS first FROM ask_hits WHERE key = ?1 AND at > ?2',
  )
    .bind(key, since)
    .first<{ n: number; first: number | null }>()
  if ((row?.n ?? 0) >= ASK_MAX) {
    const wait = Math.ceil(((row?.first ?? now) + ASK_WINDOW_MS - now) / 1000)
    return new Response(null, {
      status: 429,
      headers: { 'Retry-After': String(Math.max(wait, 1)) },
    })
  }

  // Count the question, and keep its text so Matt can read what people ask.
  const writes = [
    env.DB.prepare('INSERT INTO ask_hits (key, at) VALUES (?1, ?2)').bind(
      key,
      now,
    ),
  ]
  const text = typeof question === 'string' ? question.trim() : ''
  if (text) {
    writes.push(
      env.DB.prepare(
        'INSERT INTO ask_questions (at, visitor, question) VALUES (?1, ?2, ?3)',
      ).bind(now, key, text.slice(0, QUESTION_MAX)),
    )
  }
  await env.DB.batch(writes)

  if (Math.random() < 0.05) {
    ctx.waitUntil(
      env.DB.batch([
        env.DB.prepare('DELETE FROM ask_hits WHERE at <= ?1').bind(since),
        env.DB.prepare('DELETE FROM ask_questions WHERE at <= ?1').bind(
          now - QUESTION_KEEP_MS,
        ),
      ]),
    )
  }
  return new Response(null, { status: 204 })
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

    if (request.method === 'POST' && pathname === '/ask-limit') {
      return askLimit(request, env, ctx)
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
      let ids = await knownIds(env)
      if (ids && !ids.has(id)) ids = await knownIds(env, IDS_MISS_REFRESH_MS)
      if (!ids) return json({ error: 'unavailable' }, 503, cors)
      if (!ids.has(id)) return json({ error: 'unknown id' }, 404, cors)
      return json(await hit(id, request, env, ctx), 200, cors)
    }

    return json({ error: 'not found' }, 404, cors)
  },
} satisfies ExportedHandler<Env>
