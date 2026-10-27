// /sitemap.xml: the home page and every published case study, so search
// engines find the /work pages (on the desk they open in a panel). Cached
// on Vercel by the `isr` route rule, and rebuilt by the Craft refresh link.
const ORIGIN = 'https://ohiosveryown.co'

export default defineEventHandler(async (event) => {
  const slugs = (await getCraftItems())
    .filter(isPublished)
    .sort(byOrder)
    .map((item) => String(item.properties.slug).trim())

  const urls = [`${ORIGIN}/`, ...slugs.map((slug) => `${ORIGIN}/work/${slug}`)]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')
})

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
