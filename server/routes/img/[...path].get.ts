// /img/<key>: the post images in R2, served from the site's own domain
// rather than the bucket's r2.dev address (which is rate limited and not
// cached). Read over R2's S3 API, then cached by Vercel's CDN and by
// browsers for good: an image's key changes whenever the image does.
// Images only; videos still load from the bucket (NUXT_R2_PUBLIC_URL).
// Vercel functions can't return more than 4.5 MB; the synced sizes are well
// under (the largest panel is under 1 MB), but a long animated one might
// not be.
const IMAGE = /^craft\/[\w-]+\/[\w.-]+\.(?:webp|jpe?g|png|gif|avif)$/
const FOREVER = 'public, max-age=31536000, immutable'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'path') ?? ''
  if (!IMAGE.test(key)) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const object = await r2Get(key)
  if (!object?.body) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  setResponseHeaders(event, {
    'content-type':
      object.headers.get('content-type') ?? 'application/octet-stream',
    'cache-control': FOREVER,
    // Vercel's CDN reads this one (browsers ignore it).
    'cdn-cache-control': FOREVER,
    ...(object.headers.get('content-length') && {
      'content-length': object.headers.get('content-length')!,
    }),
    ...(object.headers.get('etag') && { etag: object.headers.get('etag')! }),
  })
  return object.body
})
