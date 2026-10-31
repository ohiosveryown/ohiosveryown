import {
  isCovered,
  type Mark,
  type PostmarkType,
} from '~/data/postmarks'

// The Post Office's sheets, from the counter Worker (worker/, GET/POST
// /marks). The newest sheet loads with the page; older ones when asked
// for. A stamp shows straight away with the serial number it should get,
// and takes the real one from the Worker when it answers.

type Place = Pick<Mark, 'city' | 'region' | 'country'>
type Sheet = {
  total: number
  states: number
  countries: number
  cities: number
  // How many sheets, the last being the one stamps go on.
  pages: number
  // The marks on that last sheet.
  marks: Mark[]
  // Where this visitor's stamps will say.
  here: Place
}

let loading: Promise<void> | undefined
// What it opened from (the desk icon's art), for the window to grow out of
// and shrink back into. Not in useState: an element can't be serialised.
const origin = shallowRef<HTMLElement | null>(null)

// Stamps a visitor can leave in a while: the Worker's limit
// (worker/src/index.ts, MARKS_MAX and MARKS_WINDOW_MS), kept here too so the
// window can say so before the Worker has to.
export const STAMPS_MAX = 8
export const STAMPS_WINDOW_MS = 10 * 60_000
const MINE_KEY = 'greetings-stamps'

export function usePostOffice() {
  const { counterUrl, stampsInDev } = useRuntimeConfig().public
  const open = useState('post-office-open', () => false)
  const sheet = useState<Sheet | null>('post-office-sheet', () => null)
  // Marks on the sheets before it, by page, as they're looked at.
  const older = useState<Record<number, Mark[]>>(
    'post-office-older',
    () => ({}),
  )
  // Set while the Worker refuses more stamps for a while (429).
  const closedUntil = useState('post-office-closed', () => 0)
  // When this visitor stamped lately, kept in the browser so reopening the
  // window doesn't start the count again.
  const mine = useState<number[] | null>('post-office-mine', () => null)

  function recentStamps(now: number) {
    if (import.meta.server) return []
    if (!mine.value) {
      try {
        mine.value = JSON.parse(localStorage.getItem(MINE_KEY) ?? '[]')
      } catch {
        mine.value = []
      }
    }
    return (mine.value ?? []).filter((at) => at > now - STAMPS_WINDOW_MS)
  }

  function remember(stamps: number[]) {
    mine.value = stamps
    try {
      localStorage.setItem(MINE_KEY, JSON.stringify(stamps))
    } catch {
      // Private browsing and the like: the Worker still counts.
    }
  }

  // When the ink's dry again: 0 if it is now. Never limited in dev while
  // stamps stay on the page (see stamp), so a sheet can be filled to test.
  function inkDryAt(now: number) {
    if (import.meta.dev && !stampsInDev) return 0
    const recent = recentStamps(now)
    const ours =
      recent.length >= STAMPS_MAX
        ? recent[recent.length - STAMPS_MAX]! + STAMPS_WINDOW_MS
        : 0
    const worker = closedUntil.value > now ? closedUntil.value : 0
    return Math.max(ours, worker)
  }
  // The Worker couldn't be reached: nothing to stamp on.
  const unavailable = useState('post-office-unavailable', () => false)

  function load() {
    if (import.meta.server || !counterUrl) return Promise.resolve()
    loading ??= $fetch<Sheet & { page?: number }>(`${counterUrl}/marks`)
      .then(({ page: _, ...data }) => {
        sheet.value = { ...data, pages: data.pages ?? 1, cities: data.cities ?? 0 }
        unavailable.value = false
      })
      .catch((error) => {
        loading = undefined
        unavailable.value = true
        console.warn('[post-office] unavailable', error)
      })
    return loading
  }

  // An earlier sheet, once.
  async function loadPage(page: number) {
    if (!counterUrl || older.value[page]) return
    try {
      const { marks } = await $fetch<{ marks: Mark[] }>(`${counterUrl}/marks`, {
        query: { page },
      })
      older.value = { ...older.value, [page]: marks }
    } catch (error) {
      console.warn('[post-office] sheet unavailable', error)
    }
  }

  // The last sheet is about covered: it joins the older ones, and stamps go
  // on a new, blank one. Says whether it turned.
  function turnIfCovered() {
    const current = sheet.value
    if (!current || !isCovered(current.marks)) return false
    older.value = { ...older.value, [current.pages - 1]: current.marks }
    current.marks = []
    current.pages += 1
    return true
  }

  // The state's new for the US, the country's for anywhere.
  function isNewPlace(place: Place) {
    const marks = sheet.value?.marks ?? []
    return {
      state:
        place.country === 'US' &&
        !!place.region &&
        !marks.some((m) => m.country === 'US' && m.region === place.region),
      country:
        !!place.country && !marks.some((m) => m.country === place.country),
      city:
        !!place.city &&
        !marks.some(
          (m) =>
            m.city === place.city &&
            m.region === place.region &&
            m.country === place.country,
        ),
    }
  }

  // Says 'dry' when the Worker turned it away for stamping too much.
  async function stamp(
    type: PostmarkType,
    x: number,
    y: number,
    size = 1,
    ink?: number,
  ): Promise<'dry' | void> {
    const current = sheet.value
    if (!current || !counterUrl) return
    const fresh = isNewPlace(current.here)
    const stampedAt = Date.now()
    remember([...recentStamps(stampedAt), stampedAt])
    current.marks.push({
      id: current.total + 1,
      at: stampedAt,
      page: current.pages - 1,
      type,
      size,
      ink,
      x,
      y,
      seed: Math.floor(Math.random() * 2 ** 31),
      ...current.here,
    })
    // The sheet's own (reactive) copy, to update when the Worker answers.
    const pending = current.marks[current.marks.length - 1]!
    current.total += 1
    if (fresh.state) current.states += 1
    if (fresh.country) current.countries += 1
    if (fresh.city) current.cities += 1

    const undo = () => {
      remember(recentStamps(Date.now()).filter((at) => at !== stampedAt))
      // It may have turned the sheet since: wherever it is now.
      const list =
        current.marks.indexOf(pending) >= 0
          ? current.marks
          : older.value[pending.page]
      const index = list?.indexOf(pending) ?? -1
      if (list && index >= 0) list.splice(index, 1)
      current.total -= 1
      if (fresh.state) current.states -= 1
      if (fresh.country) current.countries -= 1
      if (fresh.city) current.cities -= 1
    }

    // Dev shares the real database: stamps stay on this page unless
    // NUXT_PUBLIC_STAMPS_IN_DEV=true (apart from the open counts' switch).
    if (import.meta.dev && !stampsInDev) return

    try {
      const { turned: _, ...saved } = await $fetch<Mark & { turned?: boolean }>(
        `${counterUrl}/marks`,
        { method: 'POST', body: { type, size, ink, x, y, seed: pending.seed } },
      )
      Object.assign(pending, saved)
    } catch (error) {
      undo()
      const response = (error as { response?: Response }).response
      if (response?.status === 429) {
        const wait = Number(response.headers.get('Retry-After')) || 60
        closedUntil.value = Date.now() + wait * 1000
        return 'dry'
      } else {
        console.warn('[post-office] stamp failed', error)
      }
    }
  }

  return {
    open,
    origin,
    sheet,
    older,
    unavailable,
    inkDryAt,
    load,
    loadPage,
    stamp,
    turnIfCovered,
  }
}
