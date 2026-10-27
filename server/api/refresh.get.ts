import { timingSafeEqual } from 'node:crypto'
import type { CaseStudy } from '#shared/types/case-study'

// The "Publish changes" link in Craft: GET /api/refresh?key=<NUXT_REFRESH_KEY>
// regenerates every ISR page now instead of within the 60-second expiry.
// The key only allows a refresh (re-reading Craft), never edits, and it's
// separate from the ISR bypass token, which stays server-side.

const COOLDOWN_MS = 30_000
// Per server instance, so best-effort; enough to stop rapid repeat clicks
// from spending Craft's rate limit.
let lastRefresh = 0

function matches(given: string, expected: string) {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

function page(title: string, detail: string) {
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title>
<style>
  body { display: flex; flex-direction: column; justify-content: center; gap: 8px; margin: 0; padding: 24px; min-height: 100svh; box-sizing: border-box; color: #d2f976; background: #1f2b24; font: 500 16px/1.4 system-ui, sans-serif; text-align: center; }
  h1 { margin: 0; font-size: 28px; }
  p { margin: 0; opacity: 0.8; }
</style>
<h1>${title}</h1>
<p>${detail}</p>
</html>`
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  setHeader(event, 'Content-Type', 'text/html; charset=utf-8')

  const { refreshKey, isrBypassToken } = useRuntimeConfig(event)
  const key = String(getQuery(event).key ?? '')
  if (!refreshKey || !matches(key, refreshKey)) {
    setResponseStatus(event, 401)
    return page('Not allowed', 'This refresh link’s key is missing or wrong.')
  }

  const wait = lastRefresh + COOLDOWN_MS - Date.now()
  if (wait > 0) {
    setResponseStatus(event, 429)
    return page(
      'Just refreshed',
      `Try again in ${Math.ceil(wait / 1000)} seconds.`,
    )
  }
  lastRefresh = Date.now()

  const origin = getRequestURL(event).origin
  const revalidate = (path: string) =>
    fetch(`${origin}${path}`, {
      headers: isrBypassToken
        ? { 'x-prerender-revalidate': isrBypassToken }
        : undefined,
    }).then(
      (res) => res.ok,
      () => false,
    )

  // Data first, so the pages below are rebuilt from the fresh list.
  if (!(await revalidate('/api/case-studies'))) {
    setResponseStatus(event, 502)
    return page('Couldn’t reach Craft', 'Nothing changed. Try again shortly.')
  }
  const studies = await $fetch<CaseStudy[]>(`${origin}/api/case-studies`)

  // The pages (their data is inline: payload extraction is off).
  const pages = [
    '/',
    '/sitemap.xml',
    ...studies.map((study) => `/work/${study.slug}`),
  ]
  const results = await Promise.all(pages.map((path) => revalidate(path)))
  const failed = results.filter((ok) => !ok).length

  return failed
    ? page('Partly updated', `${failed} of ${results.length} pages failed.`)
    : page(
        'Site updated',
        `${studies.length} case ${studies.length === 1 ? 'study' : 'studies'} refreshed. You can close this tab.`,
      )
})
