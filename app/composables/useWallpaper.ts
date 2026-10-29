// The desk's background photo, picked from the right-click menu's Change
// Wallpaper. Each is in public/field in three widths, as AVIF and WebP
// (cached for a year there, so a new photo needs new filenames). The
// choice isn't remembered: every visit starts on the field. While the
// page is open it moves on to the next photo every few minutes (see
// useWallpaperRotation).

export type Wallpaper = { id: string; name: string; widths: number[] }

export const WALLPAPERS: Wallpaper[] = [
  { id: 'field', name: 'Field', widths: [1280, 1920, 2544] },
  { id: 'poplars', name: 'Poplars', widths: [1280, 1920, 2464] },
  { id: 'hillside', name: 'Hillside', widths: [1280, 1920, 2464] },
  { id: 'starlight', name: 'Starlight', widths: [1280, 1920, 2464] },
  { id: 'outpost', name: 'Outpost', widths: [1280, 1920, 2464] },
]

// How long a new photo gets to load before it's shown regardless.
const LOAD_TIMEOUT_MS = 4000
// How long each photo stays up.
const ROTATE_MS = 5 * 60 * 1000

// About one image pixel per CSS pixel (see the <picture> in pages/index).
export const WALLPAPER_SIZES = 'max(50vw, 67svh)'

export function wallpaperSources(wallpaper: Wallpaper) {
  const set = (ext: string) =>
    wallpaper.widths
      .map((width) => `/field/${wallpaper.id}-${width}.${ext} ${width}w`)
      .join(', ')
  return {
    avif: set('avif'),
    webp: set('webp'),
    fallback: `/field/${wallpaper.id}-1920.webp`,
  }
}

export function useWallpaper() {
  const id = useState('wallpaper', () => WALLPAPERS[0]!.id)
  const current = computed(() =>
    WALLPAPERS.find((wallpaper) => wallpaper.id === id.value)!,
  )

  // Switched once the new photo has loaded, so it fades in whole rather
  // than appearing in pieces. Loaded through a <picture> like the page's,
  // so the browser fetches the same file it will show (AVIF or WebP, and
  // the width `sizes` asks for).
  async function show(next: string) {
    const wallpaper = WALLPAPERS.find((option) => option.id === next)
    if (!wallpaper || next === id.value) return
    const sources = wallpaperSources(wallpaper)
    const picture = document.createElement('picture')
    const avif = document.createElement('source')
    avif.type = 'image/avif'
    avif.srcset = sources.avif
    avif.sizes = WALLPAPER_SIZES
    const img = document.createElement('img')
    img.srcset = sources.webp
    img.sizes = WALLPAPER_SIZES
    img.src = sources.fallback
    picture.append(avif, img)
    // Loaded, not decode(): decode waits for rendering, which a background
    // tab doesn't do. Switched anyway after a few seconds on a slow network.
    await new Promise<void>((resolve) => {
      if (img.complete) return resolve()
      img.addEventListener('load', () => resolve(), { once: true })
      img.addEventListener('error', () => resolve(), { once: true })
      setTimeout(resolve, LOAD_TIMEOUT_MS)
    })
    id.value = next
  }

  function choose(next: string) {
    return show(next)
  }

  return { wallpapers: WALLPAPERS, current, choose }
}

// The next photo in the list every ROTATE_MS the page is open (a hidden
// tab included). Any change (one picked from the menu too) starts the
// clock again. Call once, from the page.
export function useWallpaperRotation() {
  const { wallpapers, current, choose } = useWallpaper()
  let timer: ReturnType<typeof setTimeout> | undefined

  function run() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const index = wallpapers.findIndex(
        (wallpaper) => wallpaper.id === current.value.id,
      )
      choose(wallpapers[(index + 1) % wallpapers.length]!.id)
    }, ROTATE_MS)
  }

  watch(() => current.value.id, run)
  onMounted(run)
  onBeforeUnmount(() => clearTimeout(timer))
}
