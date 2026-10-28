// The desk's background photo, picked from the right-click menu's Change
// Wallpaper. Each is in public/field in three widths, as AVIF and WebP
// (cached for a year there, so a new photo needs new filenames). The
// choice is remembered in this browser only; the page always renders the
// field first, then switches once it knows.

export type Wallpaper = { id: string; name: string; widths: number[] }

export const WALLPAPERS: Wallpaper[] = [
  { id: 'field', name: 'Field', widths: [1280, 1920, 2544] },
  { id: 'poplars', name: 'Poplars', widths: [1280, 1920, 2464] },
  { id: 'hillside', name: 'Hillside', widths: [1280, 1920, 2464] },
  { id: 'starlight', name: 'Starlight', widths: [1280, 1920, 2464] },
  { id: 'outpost', name: 'Outpost', widths: [1280, 1920, 2464] },
]

const STORAGE_KEY = 'ovo-wallpaper'
// How long a new photo gets to load before it's shown regardless.
const LOAD_TIMEOUT_MS = 4000

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
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private windows and blocked storage: it just isn't remembered.
    }
    return show(next)
  }

  // The remembered choice, once the page is in the browser.
  function restore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return show(saved)
    } catch {
      // As above.
    }
  }

  return { wallpapers: WALLPAPERS, current, choose, restore }
}
