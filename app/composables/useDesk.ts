import type { InjectionKey, Ref } from 'vue'

type Surface = Readonly<Ref<HTMLElement | null>>

// What Sort By orders items by. `date` is a timestamp; an item without
// one (or without an open count) goes last.
export type DeskSort = 'date' | 'opens' | 'name'
export type DeskSortKeys = { name: string; date?: number; opens?: number }

// An item on the desk, as Clean Up sees it: its element (laid out where
// Craft put it), what it sorts by, and a way to move it from there.
export type DeskPiece = {
  el: () => HTMLElement | null
  sortKeys: () => DeskSortKeys | undefined
  moveTo: (x: number, y: number, delay: number) => void
}

type Desk = {
  surface: Surface
  raise: () => number
  register: (piece: DeskPiece) => () => void
  cleanUp: (by?: DeskSort) => void
  restore: () => void
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

  // Newest, most opened, or A to Z first; ties keep page order.
  const byKey: Record<
    DeskSort,
    (a: DeskSortKeys | undefined, b: DeskSortKeys | undefined) => number
  > = {
    date: (a, b) => (b?.date ?? 0) - (a?.date ?? 0),
    opens: (a, b) => (b?.opens ?? -1) - (a?.opens ?? -1),
    name: (a, b) =>
      (a?.name ?? '').localeCompare(b?.name ?? '', undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
  }

  // Like a desktop's icons: stacked in a tight column from the top-left
  // corner, in page order (or sorted `by`), starting a new column to the
  // right when the next spot is taken by the copy or runs off the bottom.
  function cleanUp(by?: DeskSort) {
    const desk = surface.value
    if (!desk) return
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
      piece.moveTo(x - el.offsetLeft, y - el.offsetTop, order++ * STAGGER)
      y += height + rowGap
    }
  }

  // Back where Craft put everything: every item undragged.
  function restore() {
    let order = 0
    for (const piece of pieces) piece.moveTo(0, 0, order++ * STAGGER)
  }

  provide(deskKey, {
    surface,
    raise: () => ++top,
    register,
    cleanUp,
    restore,
  })
}

export function useDesk() {
  const desk = inject(deskKey, null)
  if (!desk) {
    throw new Error('useDesk() needs a parent that called provideDesk()')
  }
  return desk
}
