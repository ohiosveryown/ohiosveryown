// How many times each case-study panel has been opened, from the counter
// Worker (worker/). Counts load once per visit; a failed Worker just means
// no pills, never a blocked panel.

// Mirrors the Worker's rate limit, so a quick reopen doesn't bump the number
// and then snap back when the Worker answers "not counted".
const RATE_WINDOW_MS = 60_000
const lastOpened = new Map<string, number>()
let loading: Promise<void> | undefined

export function useOpenCounts() {
  const { counterUrl, counterInDev } = useRuntimeConfig().public
  // null until loaded (or if the Worker is unreachable): pills stay hidden.
  const counts = useState<Record<string, number> | null>(
    'open-counts',
    () => null,
  )

  function set(id: string, count: number) {
    if (counts.value) counts.value = { ...counts.value, [id]: count }
  }

  function load() {
    if (import.meta.server || !counterUrl) return Promise.resolve()
    loading ??= $fetch<Record<string, number>>(`${counterUrl}/counts`)
      .then((data) => {
        counts.value = data
      })
      .catch((error) => console.warn('[open-counts] unavailable', error))
    return loading
  }

  async function recordOpen(id: string) {
    if (import.meta.server || !counterUrl) return
    await load()
    // Dev shares the real database, so it reads counts but doesn't add to them
    // unless NUXT_PUBLIC_COUNTER_IN_DEV=true.
    if (import.meta.dev && !counterInDev) return

    const now = Date.now()
    if (now - (lastOpened.get(id) ?? 0) < RATE_WINDOW_MS) return
    lastOpened.set(id, now)

    const before = counts.value?.[id] ?? 0
    set(id, before + 1)
    try {
      const { count } = await $fetch<{ count: number }>(
        `${counterUrl}/hit/${encodeURIComponent(id)}`,
        { method: 'POST' },
      )
      set(id, count)
    } catch (error) {
      set(id, before)
      console.warn('[open-counts] hit failed', error)
    }
  }

  return { counts, load, recordOpen }
}
