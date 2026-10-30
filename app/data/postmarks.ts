// The Post Office's postmarks (PostmarkArt draws them), in the tray's
// order. Ids are stored with each mark, so keep them, and the Worker's
// MARK_TYPES, in step.
// `width`/`height` are the art's own units (the Figma tray, 2414:3858),
// `ink` its color.

export type PostmarkType =
  | 'classic'
  | 'stars'
  | 'dashed'
  | 'triangle'
  | 'hello'
  | 'meter'
  | 'house'
  | 'cancel'
  | 'banner'
  | 'burgee'

export type Postmark = {
  id: PostmarkType
  name: string
  width: number
  height: number
  ink: string
  // Where the art's box starts, when some of it sits above or left of 0.
  x?: number
  y?: number
  // Its tile in the tray (Figma 2449:13077, 40 × 40 px): zoomed in and
  // cropped, the art scaled by `sx`/`sy` and moved by `tx`/`ty` (px).
  tile: { sx: number; sy: number; tx: number; ty: number }
}

export const POSTMARKS: Postmark[] = [
  { id: 'stars', name: 'Double ring', width: 48, height: 48, ink: '#a8322d',
    tile: { sx: 1.2867, sy: 1.2867, tx: 1.153, ty: 1.153 } },
  { id: 'dashed', name: 'Dashed ring', width: 48, height: 48, ink: '#2c4a9a',
    tile: { sx: 1.3058, sy: 1.3058, tx: 0.812, ty: 2.257 } },
  { id: 'house', name: 'House mark', width: 48, height: 48, ink: '#4a3f7a',
    tile: { sx: 1.2933, sy: 1.2933, tx: 0.995, ty: 0.995 } },
  { id: 'classic', name: 'Circle with waves', width: 92.2, height: 48, ink: '#1f2a44',
    tile: { sx: 1.2171, sy: 1.2171, tx: 2.116, ty: 0.768 } },
  { id: 'banner', name: 'Banner', width: 55.3, height: 53.8, ink: '#1a1a1a',
    tile: { sx: 1.1456, sy: 1.1456, tx: 2.309, ty: 1.963 } },
  { id: 'triangle', name: 'Arrival triangle', width: 62.7, height: 51.6, ink: '#2c4a9a',
    tile: { sx: 0.961, sy: 1.038, tx: 1.873, ty: 1.703 } },
  { id: 'meter', name: 'Postage meter', width: 92.2, height: 40.6, ink: '#1a1a1a',
    tile: { sx: 1.157, sy: 1.157, tx: -28.0, ty: 1.868 } },
  { id: 'hello', name: 'Hello from', width: 70.1, height: 38.4, ink: '#b02a2a',
    tile: { sx: 1.16, sy: 1.16, tx: 2.504, ty: 2.504 } },
  { id: 'cancel', name: 'Line cancel', width: 94, height: 23, x: -4.6, y: -4.6, ink: '#1a1a1a',
    tile: { sx: 1.8365, sy: 1.8365, tx: 12.125, ty: 10.78 } },
  { id: 'burgee', name: 'Ohio burgee', width: 57.7, height: 35.5, ink: '#a8322d',
    tile: { sx: 1.32, sy: 1.32, tx: 2.666, ty: 2.621 } },
]

export function postmark(id: string) {
  return POSTMARKS.find((type) => type.id === id) ?? POSTMARKS[0]!
}

// The sheet as drawn (Figma 2440:10134), and how big a stamp is on it
// against its size in the art's units.
export const SHEET_WIDTH = 812
export const SHEET_HEIGHT = 568
export const SHEET_SCALE = 2.1
// Once a sheet's marks add up to this much of it, the next starts a new
// one. The Worker decides (worker/src/index.ts, same numbers); this is so
// the window can turn the page without waiting.
export const SHEET_FULL = 0.85

// How much of the sheet a mark of this type covers (overlaps counted
// twice, so a busy sheet reads as fuller than it is: about right).
export function coverage(type: PostmarkType) {
  const { width, height } = postmark(type)
  return (
    (width * height * SHEET_SCALE * SHEET_SCALE) / (SHEET_WIDTH * SHEET_HEIGHT)
  )
}

export function isCovered(marks: Pick<Mark, 'type'>[]) {
  return marks.reduce((sum, mark) => sum + coverage(mark.type), 0) >= SHEET_FULL
}

// A mark as the Worker keeps it (worker/src/index.ts): `page` is its
// sheet, `x`/`y` are 0–1 of it, `id` is its serial number.
export type Mark = {
  id: number
  at: number
  page: number
  type: PostmarkType
  x: number
  y: number
  seed: number
  city: string | null
  region: string | null
  country: string | null
}

// What a postmark says: the place and date, formatted every way the types
// need. Missing pieces (no location from Cloudflare) read as somewhere.
const MONTHS = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ')
const ROMAN = 'I II III IV V VI VII VIII IX X XI XII'.split(' ')
const US_STATES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'Washington DC',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan',
  MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
  OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  PR: 'Puerto Rico',
}

let countryNames: Intl.DisplayNames | undefined
function countryName(code: string) {
  try {
    countryNames ??= new Intl.DisplayNames(['en'], { type: 'region' })
    return countryNames.of(code) ?? code
  } catch {
    return code
  }
}

// Long city names would run all the way round a ring.
const CITY_MAX = 16
function shorten(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}.` : value
}

export function postmarkText(mark: Pick<Mark, 'id' | 'at' | 'city' | 'region' | 'country'>, serial: number) {
  const date = new Date(mark.at)
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.getMonth()
  const year = date.getFullYear()
  const us = mark.country === 'US'
  const city = shorten((mark.city ?? 'Somewhere').toUpperCase(), CITY_MAX)
  // The state for the US, otherwise the country.
  const area = (us ? mark.region : mark.country) ?? ''
  const areaName = us
    ? (US_STATES[mark.region ?? ''] ?? mark.region ?? 'USA')
    : mark.country
      ? countryName(mark.country)
      : 'Earth'
  const country = mark.country ?? ''
  return {
    city,
    // ATLANTA, GA
    place: area ? `${city}, ${area}` : city,
    // ATLANTA · GEORGIA
    placeLong: `${city} · ${shorten(areaName.toUpperCase(), CITY_MAX)}`,
    // U.S.A. / USA under the ring
    countryDotted: us ? 'U.S.A.' : country.split('').join('.') + (country ? '.' : ''),
    countryShort: us ? 'USA' : country,
    // 29 OCT 2026, 29 OCT, 29·X·26, 29.10.26
    date: `${day} ${MONTHS[month]} ${year}`,
    dayMonth: `${day} ${MONTHS[month]}`,
    dateRoman: `${day}·${ROMAN[month]}·${String(year).slice(2)}`,
    dateDots: `${day}.${String(month + 1).padStart(2, '0')}.${String(year).slice(2)}`,
    serial6: String(serial).padStart(6, '0'),
    serial7: String(serial).padStart(7, '0'),
  }
}

// A small, repeatable random from a mark's seed: its tilt and which way
// its ink fades are the same for every visitor.
export function seeded(seed: number) {
  let state = seed || 1
  return () => {
    state = (state * 1664525 + 1013904223) % 2 ** 32
    return state / 2 ** 32
  }
}
