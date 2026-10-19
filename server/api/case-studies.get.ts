import type { CaseStudy } from '#shared/types/case-study'

// Cached on Vercel by the `isr` route rule; never call Craft per visitor.
export default defineEventHandler(async (): Promise<CaseStudy[]> => {
  const items = (await getCraftItems()).filter(isPublished).sort(byOrder)
  const images = await syncImages(items.flatMap(imageBlocksOf))
  return items
    .map((item) => toCaseStudy(item, images))
    .filter((study): study is CaseStudy => study !== null)
})
