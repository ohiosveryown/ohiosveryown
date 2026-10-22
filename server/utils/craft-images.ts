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

// A failed block is left out of the map (the caller falls back to the Craft
// URL) and retried on the next refresh; it never fails the whole response.
async function syncAll<T>(
  blocks: (CraftBlock & { url: string })[],
  syncBlock: (block: CraftBlock & { url: string }) => Promise<T>,
) {
  const synced = new Map<string, T>()
  if (!isR2Configured()) return synced

  const queue = [...blocks]
  async function worker() {
    for (let block = queue.shift(); block; block = queue.shift()) {
      try {
        synced.set(block.id, await syncBlock(block))
      } catch (error) {
        console.error(`[craft-images] ${block.id} skipped`, error)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  return synced
}

export function syncImages(blocks: (CraftBlock & { url: string })[]) {
  return syncAll(blocks, syncOne)
}

// Videos are copied as they are (encode them small before adding them to
// Craft). Their size comes from the MP4 itself, so the panel can hold
// their space before they load.
export type SyncedVideo = { src: string; aspectRatio?: number }

// The size from the MP4's own structure: moov > trak > tkhd, whose last 8
// bytes are the track's width and height (16.16 fixed point). Walked box by
// box; the video track is the one with a size (audio tracks are 0 × 0).
function mp4Size(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const type = (at: number) =>
    String.fromCharCode(...bytes.subarray(at + 4, at + 8))
  function walk(
    from: number,
    to: number,
  ): { width: number; height: number } | null {
    for (let at = from; at + 8 <= to;) {
      let size = view.getUint32(at)
      let header = 8
      if (size === 1) {
        size = Number(view.getBigUint64(at + 8))
        header = 16
      } else if (size === 0) size = to - at
      if (size < header || at + size > to) return null
      const box = type(at)
      if (box === 'moov' || box === 'trak') {
        const found = walk(at + header, at + size)
        if (found) return found
      } else if (box === 'tkhd') {
        const width = view.getUint32(at + size - 8) / 65536
        const height = view.getUint32(at + size - 4) / 65536
        if (width && height) return { width, height }
      }
      at += size
    }
    return null
  }
  return walk(0, bytes.length)
}

async function syncVideo(block: CraftBlock & { url: string }) {
  const version = await versionOf(block.url)
  let bytes: Uint8Array | undefined
  const download = async () => {
    const res = await fetch(block.url)
    if (!res.ok) throw new Error(`Craft GET ${block.url}: ${res.status}`)
    return new Uint8Array(await res.arrayBuffer())
  }
  if (!version) bytes = await download()
  // (clip.mp4: copies named video.mp4 were stored with a misread size.)
  const key = `craft/${block.id}-${version ?? short(bytes!)}/clip.mp4`

  let size = await r2Head(key)
  if (!size) {
    bytes ??= await download()
    const found = mp4Size(bytes)
    size = found
      ? { width: String(found.width), height: String(found.height) }
      : {}
    await r2Put(key, bytes, 'video/mp4', size)
  }
  return {
    src: r2PublicUrl(key)!,
    aspectRatio:
      size.width && size.height
        ? Number(size.width) / Number(size.height)
        : undefined,
  } satisfies SyncedVideo
}

export function syncVideos(blocks: (CraftBlock & { url: string })[]) {
  return syncAll(blocks, syncVideo)
}
