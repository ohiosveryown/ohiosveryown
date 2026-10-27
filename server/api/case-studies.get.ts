import type { CaseStudy } from '#shared/types/case-study'

// Cached on Vercel by the `isr` route rule; never call Craft per visitor.
export default defineEventHandler(async (): Promise<CaseStudy[]> => {
  const items = (await getCraftItems()).filter(isPublished).sort(byOrder)
  const covers = new Set(items.map((item) => imageBlocksOf(item)[0]?.id ?? ''))
  const [images, videos] = await Promise.all([
    syncImages(items.flatMap(imageBlocksOf), covers),
    syncVideos(items.flatMap(videoBlocksOf)),
  ])
  return items
    .map((item) => toCaseStudy(item, images, videos))
    .filter((study): study is CaseStudy => study !== null)
})
