// Dragging a desk item onto Mallow (the ask bar) asks him about it. Mouse
// and trackpad only. Desk items report where they're being dragged; the ask
// bar shows it's a target while one is over it, and asks when it's dropped.

export type AskDropItem = {
  // The visitor's bubble: the item's picture, and a line about it by name
  // (worded a little differently each time; see AskBar).
  kind: 'study' | 'track'
  name: string
  label: string
  image?: string | null
  // What Mallow is actually asked.
  prompt: string
}

// The ask bar's element. Client-only, and there's one bar per page.
let target: HTMLElement | null = null

export function useAskDrop() {
  const over = useState('ask-drop-over', () => false)
  const dropped = useState<{ item: AskDropItem; at: number } | null>(
    'ask-drop',
    () => null,
  )

  return {
    over,
    dropped,
    setTarget(el: HTMLElement | null) {
      target = el
    },
    isOver(x: number, y: number) {
      if (!target) return false
      const r = target.getBoundingClientRect()
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
    },
    drop(item: AskDropItem) {
      dropped.value = { item, at: Date.now() }
    },
  }
}
