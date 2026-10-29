// The desk's background photo, picked from the right-click menu's Change
// Wallpaper. Each is in public/field in three widths, as AVIF and WebP
// (cached for a year there, so a new photo needs new filenames). The
// choice isn't remembered: every visit starts on a random one (see
// wallpaperPickScript). While the page is open it moves on to the next
// photo every few minutes (see useWallpaperRotation).

// `accent`: the color of the copy, the contact button and Mallow's send
// button over this photo (--accent, set by the page). Light enough for
// the send button's dark arrow to sit on.
export type Wallpaper = {
  id: string
  name: string
  widths: number[]
  accent: string
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: 'field',
    name: 'Field',
    widths: [1280, 1920, 2544],
    accent: '#d2f976',
  },
  {
    id: 'poplars',
    name: 'Poplars',
    widths: [1280, 1920, 2464],
    accent: '#f4f1ea',
  },
  {
    id: 'hillside',
    name: 'Hillside',
    widths: [1280, 1920, 2464],
    accent: '#ffd6a5',
  },
  {
    id: 'starlight',
    name: 'Starlight',
    widths: [1280, 1920, 2464],
    accent: '#b8dcff',
  },
  {
    id: 'outpost',
    name: 'Outpost',
    widths: [1280, 1920, 2464],
    accent: '#ff9f80',
  },
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

// The home page is cached at the CDN, so a visit's wallpaper is picked in
// the browser: this runs in the page's <head>, before anything is drawn.
// It picks one at random, sets its accent, and picks its width the way
// WALLPAPER_SIZES would (the screen's share times its density, the
// smallest file at least that wide). It paints that file as the desk's
// backdrop (--wallpaper-first) so it shows as soon as it loads, before
// the page is running; the page's first <img> then uses the same file,
// so it's one download (see firstWallpaper).
export function wallpaperPickScript() {
  const options = WALLPAPERS.map((wallpaper) => ({
    id: wallpaper.id,
    accent: wallpaper.accent,
    widths: wallpaper.widths,
  }))
  return `(() => {
  const options = ${JSON.stringify(options)}
  const pick = options[Math.floor(Math.random() * options.length)]
  const needed =
    Math.max(innerWidth * 0.5, innerHeight * 0.67) * (devicePixelRatio || 1)
  const width =
    pick.widths.find((w) => w >= needed) ?? pick.widths[pick.widths.length - 1]
  const file = '/field/' + pick.id + '-' + width
  window.__ovoWallpaper = { id: pick.id, file }
  const root = document.documentElement.style
  root.setProperty('--accent', pick.accent)
  root.setProperty(
    '--wallpaper-first',
    'image-set(url(' + file + '.avif) type("image/avif"), url(' + file +
      '.webp) type("image/webp"))',
  )
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.type = 'image/avif'
  link.fetchPriority = 'high'
  link.href = file + '.avif'
  document.head.append(link)
})()`
}

// The visit's first photo as single files (the pick script's), for the
// page's first <img>: the same file the backdrop has already loaded.
export function firstWallpaper() {
  if (!import.meta.client) return null
  const pick = (window as { __ovoWallpaper?: { id: string; file: string } })
    .__ovoWallpaper
  if (!pick || !WALLPAPERS.some((wallpaper) => wallpaper.id === pick.id)) {
    return null
  }
  return {
    id: pick.id,
    avif: `${pick.file}.avif`,
    webp: `${pick.file}.webp`,
    fallback: `${pick.file}.webp`,
  }
}

export function useWallpaper() {
  const id = useState('wallpaper', () => WALLPAPERS[0]!.id)
  // Set to the visit's pick (wallpaperPickScript) once, on the page's first
  // load; going to a post and back keeps whatever is showing.
  const started = useState('wallpaper-started', () => false)
  function start() {
    if (started.value || !import.meta.client) return
    started.value = true
    const pick = firstWallpaper()
    if (pick) id.value = pick.id
  }
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

  return { wallpapers: WALLPAPERS, current, choose, start }
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
