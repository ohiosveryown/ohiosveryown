// Open counter for case studies, stored in D1 (atomic increments, unlike KV).
//
//   POST /hit/:id  → adds 1 (at most once per visitor per study per minute)
//                    and returns { count, counted }
//   GET  /counts   → { "<craft item id>": count, … }
//   POST /ask-limit → 204, or 429 once a visitor has asked too many of
//                    Mallow's chat questions lately; allowed questions are
//                    kept in ask_questions for 90 days. Called by the site's
//                    server (Bearer ASK_LIMIT_SECRET), never by browsers.
//   GET  /marks    → the Post Office: { total, states, countries, cities, pages,
//                    page, marks, here }, the marks on one sheet (?page=N,
//                    from 0; the newest by default), and where the visitor is
//   POST /marks    → stamps one { type, size, ink, x, y, seed } on the newest sheet,
//                    where Cloudflare places the visitor, and returns it
//                    with `turned` when that about covers the sheet; 429
//                    past MARKS_MAX in MARKS_WINDOW_MS
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

// The site's dev server on another device on the same network (a phone
// on the Wi-Fi): any private address on port 8080, since the router can
// hand the Mac a new one.
const LAN_DEV_ORIGIN =
  /^http:\/\/(10(\.\d{1,3}){3}|192\.168(\.\d{1,3}){2}|172\.(1[6-9]|2\d|3[01])(\.\d{1,3}){2}):8080$/

function isAllowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get('Origin') ?? ''
  return (
    LAN_DEV_ORIGIN.test(origin) ||
    env.ALLOWED_ORIGINS.split(',')
      .map((item) => item.trim())
      .includes(origin)
  )
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') ?? ''
  return isAllowedOrigin(request, env)
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
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

// The Post Office (greetings.app). Types kept in step with
// app/data/postmarks.ts, the limit with STAMPS_MAX/STAMPS_WINDOW_MS in
// app/composables/usePostOffice.ts.
// Each type's size in its art's units (POSTMARKS' width and height).
const MARK_SIZES: Record<string, [number, number]> = {
  stars: [48, 48],
  dashed: [48, 48],
  house: [48, 48],
  banner: [55.3, 53.8],
  triangle: [62.7, 51.6],
  meter: [92.2, 40.6],
  classic: [92.2, 48],
  cancel: [94, 23],
  hello: [70.1, 38.4],
  burgee: [57.7, 35.5],
  hand: [71.9, 33.2],
}
const MARK_TYPES = new Set(Object.keys(MARK_SIZES))
const MARKS_SHOWN = 400

// How much of a sheet a mark covers: stamped at SHEET_SCALE of its art's
// size on a sheet SHEET_WIDTH × SHEET_HEIGHT (app/components/PostOffice.vue).
// Once a sheet's marks add up to SHEET_FULL of it, the next one starts a
// new sheet.
const SHEET_SCALE = 2.1
const SHEET_WIDTH = 812
const SHEET_HEIGHT = 568
const SHEET_FULL = 0.85
// How big a visitor can make a stamp (STAMP_SIZE in app/data/postmarks.ts),
// as a scale of the usual size.
const STAMP_SIZE_MIN = 0.7
const STAMP_SIZE_MAX = 1.4
function coverage(type: string, size = 1) {
  const [width, height] = MARK_SIZES[type] ?? [0, 0]
  return (
    (width * height * SHEET_SCALE * SHEET_SCALE * size * size) /
    (SHEET_WIDTH * SHEET_HEIGHT)
  )
}

// The sheet new marks go on: the last one, or a new one after it once
// that's about covered. `covered` is how much of it is.
async function openSheet(env: Env) {
  const last =
    (
      await env.DB.prepare('SELECT MAX(page) AS page FROM marks').first<{
        page: number | null
      }>()
    )?.page ?? 0
  const { results } = await env.DB.prepare(
    'SELECT type, size FROM marks WHERE page = ?1',
  )
    .bind(last)
    .all<{ type: string; size: number }>()
  const covered = results.reduce(
    (sum, row) => sum + coverage(row.type, row.size),
    0,
  )
  return covered >= SHEET_FULL
    ? { page: last + 1, covered: 0 }
    : { page: last, covered }
}
const MARKS_WINDOW_MS = 10 * 60_000
const MARKS_MAX = 8

type Mark = {
  id: number
  at: number
  page: number
  type: string
  size: number
  ink: number | null
  x: number
  y: number
  seed: number
  city: string | null
  region: string | null
  country: string | null
}

async function sheet(env: Env, asked: number | null) {
  const open = await openSheet(env)
  const page =
    asked === null || !Number.isInteger(asked)
      ? open.page
      : Math.min(Math.max(asked, 0), open.page)
  const [marks, totals] = await env.DB.batch([
    env.DB.prepare(
      `SELECT id, at, page, type, size, ink, x, y, seed, city, region, country FROM marks
       WHERE page = ?1 ORDER BY id DESC LIMIT ?2`,
    ).bind(page, MARKS_SHOWN),
    env.DB.prepare(
      `SELECT COUNT(*) AS total,
         COUNT(DISTINCT CASE WHEN country = 'US' THEN region END) AS states,
         COUNT(DISTINCT country) AS countries,
         COUNT(DISTINCT city || '|' || IFNULL(region, '') || '|' || IFNULL(country, '')) AS cities
       FROM marks`,
    ),
  ])
  const counts = (totals!.results[0] ?? {}) as {
    total?: number
    states?: number
    countries?: number
    cities?: number
  }
  return {
    total: counts.total ?? 0,
    states: counts.states ?? 0,
    countries: counts.countries ?? 0,
    cities: counts.cities ?? 0,
    pages: open.page + 1,
    page,
    // Oldest first, so later ones are drawn on top.
    marks: (marks!.results as Mark[]).reverse(),
  }
}

// Cloudflare's guess at where the visitor is (request.cf); any of it can be
// missing, and the stamp says so.
function placeOf(request: Request) {
  const cf = (request.cf ?? {}) as {
    city?: string
    regionCode?: string
    country?: string
  }
  const clean = (value: string | undefined, max: number) =>
    value?.trim().slice(0, max) || null
  return {
    city: clean(cf.city, 40),
    region: clean(cf.regionCode, 8),
    country: clean(cf.country, 2),
  }
}

async function stamp(request: Request, env: Env) {
  const body = (await request.json().catch(() => ({}))) as Partial<Mark>
  const { type, x, y, seed } = body
  const size =
    typeof body.size === 'number' ? Math.round(body.size * 100) / 100 : 1
  const unit = (value: unknown): value is number =>
    typeof value === 'number' && value >= 0 && value <= 1
  // Where along the ink gradient (0–1), to three places; none is the
  // type's own ink.
  const ink =
    body.ink === undefined || body.ink === null
      ? null
      : unit(body.ink)
        ? Math.round(body.ink * 1000) / 1000
        : undefined
  if (
    typeof type !== 'string' ||
    !MARK_TYPES.has(type) ||
    !unit(x) ||
    !unit(y) ||
    !Number.isInteger(seed) ||
    !(size >= STAMP_SIZE_MIN && size <= STAMP_SIZE_MAX) ||
    ink === undefined
  ) {
    return { status: 400 as const }
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const visitor = await sha256(`${env.IP_SALT}:ask:${ip}`)
  const now = Date.now()
  const recent = await env.DB.prepare(
    'SELECT COUNT(*) AS n, MIN(at) AS first FROM marks WHERE visitor = ?1 AND at > ?2',
  )
    .bind(visitor, now - MARKS_WINDOW_MS)
    .first<{ n: number; first: number | null }>()
  if ((recent?.n ?? 0) >= MARKS_MAX) {
    const wait = ((recent?.first ?? now) + MARKS_WINDOW_MS - now) / 1000
    return { status: 429 as const, retryAfter: Math.max(Math.ceil(wait), 1) }
  }

  const place = placeOf(request)
  const open = await openSheet(env)
  const mark = await env.DB.prepare(
    `INSERT INTO marks (at, page, type, size, ink, x, y, seed, city, region, country, visitor)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
     RETURNING id, at, page, type, size, ink, x, y, seed, city, region, country`,
  )
    .bind(
      now,
      open.page,
      type,
      size,
      ink,
      x,
      y,
      Math.abs(seed!) % 2 ** 31,
      place.city,
      place.region,
      place.country,
      visitor,
    )
    .first<Mark>()
  // This one about covers it: the next goes on a new sheet.
  const turned = open.covered + coverage(type, size) >= SHEET_FULL
  return { status: 200 as const, mark: { ...mark, turned } }
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const cors = corsHeaders(request, env)
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    const { pathname, searchParams } = new URL(request.url)

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

    if (pathname === '/marks') {
      // `here` is where the visitor's own stamp will say, for the preview.
      if (request.method === 'GET') {
        const asked = searchParams.get('page')
        return json(
          {
            ...(await sheet(env, asked === null ? null : Number(asked))),
            here: placeOf(request),
          },
          200,
          cors,
        )
      }
      if (request.method === 'POST') {
        // As with /hit: other sites can't stamp from their visitors.
        if (!isAllowedOrigin(request, env)) {
          return json({ error: 'forbidden' }, 403, cors)
        }
        const result = await stamp(request, env)
        if (result.status === 429) {
          return json({ error: 'too many' }, 429, {
            ...cors,
            'Retry-After': String(result.retryAfter),
          })
        }
        if (result.status === 400) {
          return json({ error: 'bad mark' }, 400, cors)
        }
        return json(result.mark, 200, cors)
      }
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
