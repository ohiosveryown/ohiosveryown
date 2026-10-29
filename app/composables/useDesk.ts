import type { InjectionKey, Ref } from 'vue'
import type { DeskCategory } from '#shared/types/case-study'

type Surface = Readonly<Ref<HTMLElement | null>>

// What Sort By orders items by. `date` is a timestamp; `category` is the
// label's place in DESK_CATEGORIES. An item without one (or without an
// open count) goes last.
export type DeskSort = 'date' | 'opens' | 'name' | 'category'
export type DeskSortKeys = {
  name: string
  date?: number
  opens?: number
  category?: number
}

// An item on the desk, as Clean Up sees it: its element (laid out where
// Craft put it), what it sorts by, and a way to move it from there
// (`instant`: straight there, no spring).
export type DeskPiece = {
  el: () => HTMLElement | null
  sortKeys: () => DeskSortKeys | undefined
  moveTo: (x: number, y: number, delay: number, instant?: boolean) => void
}

type Desk = {
  surface: Surface
  raise: () => number
  register: (piece: DeskPiece) => () => void
  cleanUp: (by?: DeskSort) => void
  restore: () => void
  // An item was moved by hand, so the desk is no longer tidied.
  moved: () => void
  // A label lit in the menu's key: while it is, everything else on the
  // desk blurs. Null brings it all back.
  spotlit: Readonly<Ref<DeskCategory | null>>
  spotlight: (category: DeskCategory | null) => void
}

const deskKey: InjectionKey<Desk> = Symbol('desk')

// How far in from the desk's edges things can be dragged (rem): the desk
// items and Mallow's bar, so nothing sits flush against the screen.
export const DESK_EDGE_REM = 1.2

// Clean Up's grid (rem): in from the desk's top-left corner, and between
// rows and columns.
const MARGIN_REM = 3.2
const ROW_GAP_REM = 1.2
const COLUMN_GAP_REM = 2.4
// Spots where an item would overlap one of these are skipped (the ask bar,
// the copy), so nothing gets tidied under them.
const KEEP_OUT = '[data-desk-keep-out]'
// Each item starts a beat after the one before it (seconds).
const STAGGER = 0.04

export function provideDesk(surface: Surface) {
  let top = 0
  const pieces = new Set<DeskPiece>()

  function register(piece: DeskPiece) {
    pieces.add(piece)
    return () => pieces.delete(piece)
  }

  // Newest, most opened, A to Z, or grouped by label (in the key's
  // order); ties keep page order.
  const byKey: Record<
    DeskSort,
    (a: DeskSortKeys | undefined, b: DeskSortKeys | undefined) => number
  > = {
    date: (a, b) => (b?.date ?? 0) - (a?.date ?? 0),
    opens: (a, b) => (b?.opens ?? -1) - (a?.opens ?? -1),
    category: (a, b) =>
      (a?.category ?? Infinity) - (b?.category ?? Infinity) || 0,
    name: (a, b) =>
      (a?.name ?? '').localeCompare(b?.name ?? '', undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
  }

  // Like a desktop's icons: stacked in a tight column from the top-left
  // corner, in page order (or sorted `by`), starting a new column to the
  // right when the next spot is taken by the copy or runs off the bottom.
  function cleanUp(by?: DeskSort, instant = false) {
    const desk = surface.value
    if (!desk) return
    tidied = { by }
    const items = [...pieces]
      .map((piece) => ({ piece, el: piece.el() }))
      .filter((item): item is { piece: DeskPiece; el: HTMLElement } =>
        Boolean(item.el?.offsetParent),
      )
      .sort((a, b) =>
        a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      )
    if (by) {
      items.sort((a, b) => byKey[by](a.piece.sortKeys(), b.piece.sortKeys()))
    }
    if (!items.length) return

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const margin = MARGIN_REM * rem
    const rowGap = ROW_GAP_REM * rem
    const columnGap = COLUMN_GAP_REM * rem
    const width = Math.max(...items.map(({ el }) => el.offsetWidth))
    const height = Math.max(...items.map(({ el }) => el.offsetHeight))

    // Rects in the desk's own coordinates (offsetLeft/Top's).
    const box = desk.getBoundingClientRect()
    const keepOut = [...desk.querySelectorAll<HTMLElement>(KEEP_OUT)].map(
      (el) => {
        const rect = el.getBoundingClientRect()
        return {
          x: rect.left - box.left + desk.scrollLeft,
          y: rect.top - box.top + desk.scrollTop,
          width: rect.width,
          height: rect.height,
        }
      },
    )
    const overlaps = (x: number, y: number) =>
      keepOut.some(
        (rect) =>
          x < rect.x + rect.width &&
          x + width > rect.x &&
          y < rect.y + rect.height &&
          y + height > rect.y,
      )

    // Down the column; past the bottom, or into the copy, the next column.
    // Items that don't fit at all (a very full desk) stay where they are.
    const right = desk.clientWidth - margin
    const bottom = desk.clientHeight - margin
    let x = margin
    let y = margin
    let order = 0
    for (const { piece, el } of items) {
      while (x + width <= right && (y + height > bottom || overlaps(x, y))) {
        if (y + height > bottom) {
          x += width + columnGap
          y = margin
        } else {
          y += height + rowGap
        }
      }
      if (x + width > right) break
      piece.moveTo(
        x - el.offsetLeft,
        y - el.offsetTop,
        instant ? 0 : order++ * STAGGER,
        instant,
      )
      y += height + rowGap
    }
  }

  // Back where Craft put everything: every item undragged.
  function restore() {
    tidied = null
    let order = 0
    for (const piece of pieces) piece.moveTo(0, 0, order++ * STAGGER)
  }

  // Tidied (Clean Up or Sort By) and untouched since: a resize tidies it
  // again for the new size, straight into place. Each item is placed as an
  // offset from its spot in the layout, which moves with the window, so
  // the old offsets would scatter them. A resize that only changes the
  // height on a touch screen (the iOS toolbar showing and hiding while
  // scrolling) is left alone, as the items do.
  let tidied: { by?: DeskSort } | null = null
  let frame = 0
  let width = 0
  function onResize() {
    if (!tidied) return
    const touch = !window.matchMedia('(pointer: fine)').matches
    if (touch && window.innerWidth === width) return
    width = window.innerWidth
    // Smaller than md the page lists the items instead (see DeskItem); it's
    // tidied again on the way back.
    if (!window.matchMedia('(min-width: 700px)').matches) return
    // A frame later, after the items' own resize handling (see DeskItem).
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (tidied) cleanUp(tidied.by, true)
    })
  }
  const spotlit = ref<DeskCategory | null>(null)
  function spotlight(category: DeskCategory | null) {
    spotlit.value = category
  }

  onMounted(() => {
    width = window.innerWidth
    window.addEventListener('resize', onResize)
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', onResize)
  })

  provide(deskKey, {
    surface,
    raise: () => ++top,
    register,
    cleanUp: (by) => cleanUp(by),
    restore,
    moved: () => (tidied = null),
    spotlit: readonly(spotlit),
    spotlight,
  })
}

export function useDesk() {
  const desk = inject(deskKey, null)
  if (!desk) {
    throw new Error('useDesk() needs a parent that called provideDesk()')
  }
  return desk
}
