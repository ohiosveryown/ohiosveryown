import { createHash } from 'node:crypto'
import sharp from 'sharp'
import type { CraftBlock } from './craft'

// Copies Craft images into R2 once, as two WebP sizes, so the site never
// serves Craft's URLs (they aren't permanent). Runs on each content refresh;
// images already in R2 cost one HEAD to Craft and two to R2.

export type SyncedImage = {
  src: string // panel size, for the hero and body
  thumb: string // icon size
  aspectRatio: number
}

// The thumb is the desk icon, shown 72px wide: 216 is sharp on 3x screens.
// Its size is in its name, so changing it makes new files (images synced
// before get theirs on the next refresh).
const SIZES = { thumb: 216, panel: 1400 } as const
const THUMB = `thumb-${SIZES.thumb}.webp`
const CONCURRENCY = 4

function short(value: string | Uint8Array) {
  return createHash('sha256').update(value).digest('hex').slice(0, 8)
}

// Craft returns an ETag (and size) on HEAD, so a replaced photo gets a new
// key without downloading anything. Falls back to hashing the bytes.
async function versionOf(url: string) {
  const res = await fetch(url, { method: 'HEAD' })
  if (!res.ok) throw new Error(`Craft HEAD ${url}: ${res.status}`)
  const tag =
    res.headers.get('etag')?.replace(/^W\//, '').replaceAll('"', '') ??
    res.headers.get('content-length')
  return tag ? short(tag) : null
}

function resizer(bytes: Uint8Array, animated: boolean) {
  return (size: number) =>
    sharp(bytes, { animated })
      .rotate()
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer()
}

function isAnimated(meta: sharp.Metadata) {
  return (meta.pages ?? 1) > 1 && meta.format !== 'tiff'
}

async function upload(base: string, bytes: Uint8Array) {
  const meta = await sharp(bytes).metadata()
  // EXIF orientations 5–8 are rotated a quarter turn.
  const turned = (meta.orientation ?? 1) >= 5
  const width = (turned ? meta.height : meta.width) ?? 0
  const height = (turned ? meta.width : meta.height) ?? 0
  if (!width || !height) throw new Error('Unreadable image')

  const sized = resizer(bytes, isAnimated(meta))

  const dimensions = { width: String(width), height: String(height) }
  // Panel last: its existence marks the image as fully synced.
  await r2Put(`${base}/${THUMB}`, await sized(SIZES.thumb), 'image/webp')
  await r2Put(
    `${base}/panel.webp`,
    await sized(SIZES.panel),
    'image/webp',
    dimensions,
  )
  return dimensions
}

async function syncOne(block: CraftBlock & { url: string }) {
  let version = await versionOf(block.url)
  let bytes: Uint8Array | undefined
  if (!version) {
    bytes = new Uint8Array(await (await fetch(block.url)).arrayBuffer())
    version = short(bytes)
  }

  const base = `craft/${block.id}-${version}`
  const download = async () => {
    const res = await fetch(block.url)
    if (!res.ok) throw new Error(`Craft GET ${block.url}: ${res.status}`)
    return new Uint8Array(await res.arrayBuffer())
  }
  let dimensions = await r2Head(`${base}/panel.webp`)
  if (!dimensions?.width || !dimensions.height) {
    bytes ??= await download()
    dimensions = await upload(base, bytes)
  } else if (!(await r2Head(`${base}/${THUMB}`))) {
    // Synced before the thumb's size changed: just the new thumb.
    bytes ??= await download()
    const sized = resizer(bytes, isAnimated(await sharp(bytes).metadata()))
    await r2Put(`${base}/${THUMB}`, await sized(SIZES.thumb), 'image/webp')
  }

  return {
    src: r2PublicUrl(`${base}/panel.webp`)!,
    thumb: r2PublicUrl(`${base}/${THUMB}`)!,
    aspectRatio: Number(dimensions.width) / Number(dimensions.height),
  } satisfies SyncedImage
}

// A failed image is left out of the map (the caller falls back to the Craft
// URL) and retried on the next refresh; it never fails the whole response.
export async function syncImages(blocks: (CraftBlock & { url: string })[]) {
  const synced = new Map<string, SyncedImage>()
  if (!isR2Configured()) return synced

  const queue = [...blocks]
  async function worker() {
    for (let block = queue.shift(); block; block = queue.shift()) {
      try {
        synced.set(block.id, await syncOne(block))
      } catch (error) {
        console.error(`[craft-images] ${block.id} skipped`, error)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  return synced
}
