import type { CaseStudy } from '#shared/types/case-study'
import type { CraftBlock, CraftItem } from './craft'
import { altOf, captionOf, plainText, toBody } from './craft-body'
import type { SyncedImage, SyncedVideo } from './craft-images'

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function number(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

// Craft's date properties come as "YYYY-MM-DD" (possibly with a time).
function isoDate(value: unknown): string | undefined {
  const match = typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)
  return match ? match[0] : undefined
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

type ImageBlock = CraftBlock & { url: string }
type Images = Map<string, SyncedImage>
type Videos = Map<string, SyncedVideo>

export function isPublished(item: CraftItem) {
  return item.properties.published === true && !!text(item.properties.slug)
}

// Only top-level images are rendered (hero + body), so only those are synced.
export function imageBlocksOf(item: CraftItem): ImageBlock[] {
  return (item.content ?? []).filter(
    (block): block is ImageBlock => block.type === 'image' && !!block.url,
  )
}

// Videos in the body, synced the same way.
export function videoBlocksOf(item: CraftItem): ImageBlock[] {
  return (item.content ?? []).filter(
    (block): block is ImageBlock => block.type === 'video' && !!block.url,
  )
}

// Synced R2 sizes when available; otherwise Craft's URL for this refresh.
export function imageFor(block: ImageBlock, images: Images) {
  const synced = images.get(block.id)
  return {
    src: synced?.src ?? block.url,
    thumb: synced?.thumb ?? block.url,
    og: synced?.og,
    aspectRatio: synced?.aspectRatio ?? block.aspectRatio,
  }
}

export function toCaseStudy(
  item: CraftItem,
  images: Images,
  videos: Videos = new Map(),
): CaseStudy | null {
  const p = item.properties
  const slug = text(p.slug)
  if (!isPublished(item) || !slug) return null

  // Collection-item covers aren't exposed by Craft's API, so by convention
  // the first image in the body is the hero.
  const heroBlock = imageBlocksOf(item)[0]
  // An italic line right after it is its caption, shown under it.
  const content = (item.content ?? []).filter(
    (block) => block.type !== 'text' || (block.markdown ?? '').trim(),
  )
  const afterHero = heroBlock
    ? content[content.findIndex((block) => block.id === heroBlock.id) + 1]
    : undefined
  const heroCaption = captionOf(afterHero)
  const tooltip = text(p.tooltip)
  const position = {
    x: number(p.x),
    y: number(p.y),
    mobileX: number(p.mobile_x),
    mobileY: number(p.mobile_y),
  }

  return {
    id: item.id,
    slug,
    label: text(p.label) ?? slug,
    title: item.title,
    intro: text(p.intro),
    summary: text(p.summary),
    date: text(p.date),
    publishedOn: isoDate(p.published_on),
    link: text(p.link),
    disciplines: strings(p.disciplines),
    hero: heroBlock && {
      ...imageFor(heroBlock, images),
      alt: altOf(heroBlock) || (heroCaption ? plainText(heroCaption) : ''),
      caption: heroCaption,
    },
    tooltip: tooltip ? { text: tooltip } : undefined,
    position: Object.values(position).some((value) => value != null)
      ? position
      : undefined,
    // The hero (and its caption) is shown above the details, so it isn't
    // repeated in the body.
    body: toBody(
      item.content ?? [],
      [heroBlock?.id, heroCaption ? afterHero?.id : undefined],
      (block) => imageFor(block, images),
      (block) => ({
        src: videos.get(block.id)?.src ?? block.url,
        aspectRatio: videos.get(block.id)?.aspectRatio,
      }),
    ),
  }
}

export function byOrder(a: CraftItem, b: CraftItem) {
  return (
    (number(a.properties.order) ?? Number.MAX_SAFE_INTEGER) -
    (number(b.properties.order) ?? Number.MAX_SAFE_INTEGER)
  )
}
