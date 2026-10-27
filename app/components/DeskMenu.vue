<template>
  <AnimatePresence>
    <!-- Fades only: a transform here would make the menus inside position
         from it instead of the window, and an ancestor with one stops their
         backdrop blur from seeing the desk. -->
    <motion.div
      v-if="at"
      ref="layer"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1, transition: { duration: 0.12 } }"
      :exit="{ opacity: 0, transition: { duration: 0.1 } }"
      @keydown="onKeydown"
    >
      <div
        ref="menu"
        class="desk-menu"
        role="menu"
        aria-label="Desktop"
        :style="{ left: `${at.x}px`, top: `${at.y}px` }"
      >
        <button
          v-for="item in items"
          :key="item.label"
          class="desk-menu__item"
          :class="{ 'is-open': item.children && sub === item }"
          type="button"
          role="menuitem"
          :aria-haspopup="item.children ? 'menu' : undefined"
          :aria-expanded="item.children ? sub === item : undefined"
          @pointerenter="hover(item, $event)"
          @click="choose(item, $event)"
        >
          {{ item.label }}
          <svg
            v-if="item.children"
            class="desk-menu__chevron"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        v-if="sub?.children && subAt"
        ref="subMenu"
        class="desk-menu"
        role="menu"
        :aria-label="sub.label"
        :style="{ left: `${subAt.x}px`, top: `${subAt.y}px` }"
      >
        <button
          v-for="child in sub.children"
          :key="child.label"
          class="desk-menu__item"
          type="button"
          role="menuitem"
          @click="choose(child, $event)"
        >
          {{ child.label }}
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</template>

<style scoped lang="scss">
  .desk-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: var(--zmax);
    padding: 0.5rem;
    min-width: 18rem;
    border: 0.5px solid rgba(255, 255, 255, 0.16);
    border-radius: 1.2rem;
    color: #fff;
    background: rgba(24, 24, 24, 0.72);
    box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(2rem) saturate(1.6);
    -webkit-backdrop-filter: blur(2rem) saturate(1.6);
  }

  .desk-menu__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
    padding: 0.7rem 1.2rem;
    border-radius: 0.7rem;
    color: inherit;
    background: none;
    font-family: var(--system-font);
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: -0.014rem;
    line-height: 1.3;
    text-align: left;
    cursor: var(--cursor);

    &:hover,
    &:focus-visible,
    &.is-open {
      background: rgba(255, 255, 255, 0.14);
      outline: none;
    }
  }

  .desk-menu__chevron {
    flex-shrink: 0;
    opacity: 0.6;
  }
</style>

<script setup lang="ts">
  import { AnimatePresence, motion } from 'motion-v'

  // AnimatePresence renders no element of its own to pass attributes to.
  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    // Off while something covers the desk (an open case study).
    disabled?: boolean
  }>()

  const { surface, cleanUp } = useDesk()

  // An item runs something, or opens a submenu of its own.
  type Item = { label: string; run?: () => void; children?: Item[] }
  const items: Item[] = [
    { label: 'Clean Up', run: () => cleanUp() },
    {
      label: 'Sort By',
      children: [
        { label: 'Date', run: () => cleanUp('date') },
        { label: 'Most Opened', run: () => cleanUp('opens') },
        { label: 'Name', run: () => cleanUp('name') },
      ],
    },
  ]

  // Where it's open (viewport px), or null when closed; likewise the open
  // submenu and where it sits.
  const at = ref<{ x: number; y: number } | null>(null)
  const sub = shallowRef<Item | null>(null)
  const subAt = ref<{ x: number; y: number } | null>(null)
  const layer = useTemplateRef<{ $el: HTMLElement }>('layer')
  const menu = useTemplateRef<HTMLElement>('menu')
  const subMenu = useTemplateRef<HTMLElement>('subMenu')

  // Only on the bare desk: text, links, icons and the chat keep the
  // browser's own menu, and so does a Shift right-click anywhere.
  const NATIVE =
    'a, button, input, textarea, p, span, h1, h2, h3, svg, img, video, [contenteditable], .desk-item, .home__ask'

  // Kept this far in from the window's edges.
  const EDGE = 8

  // A mouse and room for the desk (md up); phones have no right-click.
  let wide: MediaQueryList | undefined

  async function onContextMenu(event: MouseEvent) {
    const target = event.target as Element | null
    if (
      props.disabled ||
      event.shiftKey ||
      !wide?.matches ||
      !target ||
      target.closest(NATIVE)
    ) {
      return
    }
    event.preventDefault()
    dismissTooltip()
    closeSub()
    at.value = { x: event.clientX, y: event.clientY }
    await nextTick()
    const el = menu.value
    if (!el) return
    // Kept on screen: flips left or up at the edges, like the system menu.
    const { width, height } = el.getBoundingClientRect()
    at.value = {
      x:
        event.clientX + width + EDGE > window.innerWidth
          ? Math.max(EDGE, event.clientX - width)
          : event.clientX,
      y:
        event.clientY + height + EDGE > window.innerHeight
          ? Math.max(EDGE, event.clientY - height)
          : event.clientY,
    }
    focusFirst(el)
  }

  function close() {
    at.value = null
    closeSub()
  }

  function closeSub() {
    sub.value = null
    subAt.value = null
  }

  // Beside its item, its first item level with it; on the left when
  // there's no room on the right.
  async function openSub(item: Item, from: HTMLElement) {
    if (sub.value === item) return
    sub.value = item
    subAt.value = { x: -9999, y: -9999 }
    await nextTick()
    const el = subMenu.value
    const parent = menu.value
    if (!el || !parent || sub.value !== item) return
    const row = from.getBoundingClientRect()
    const box = parent.getBoundingClientRect()
    const { width, height } = el.getBoundingClientRect()
    const inset = (el.firstElementChild as HTMLElement).offsetTop
    const right = box.right + 2
    subAt.value = {
      x:
        right + width + EDGE > window.innerWidth
          ? Math.max(EDGE, box.left - width - 2)
          : right,
      y: Math.max(
        EDGE,
        Math.min(row.top - inset, window.innerHeight - height - EDGE),
      ),
    }
  }

  // Pointing at an item with a submenu opens it; at any other closes it.
  function hover(item: Item, event: PointerEvent) {
    const row = event.currentTarget as HTMLElement
    if (item.children) openSub(item, row)
    else closeSub()
  }

  async function choose(item: Item, event: MouseEvent) {
    if (item.children) {
      await openSub(item, event.currentTarget as HTMLElement)
      if (subMenu.value) focusFirst(subMenu.value)
      return
    }
    close()
    item.run?.()
  }

  function focusFirst(el: HTMLElement) {
    el.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }

  // Up and down move between a menu's items, wrapping; right opens a
  // submenu and left goes back out of one; Escape and Tab close it all.
  async function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault()
      close()
      return
    }
    const current = document.activeElement as HTMLElement | null
    const list = current?.closest<HTMLElement>('[role="menu"]')
    if (!current || !list) return
    const inSub = list === subMenu.value

    const buttons = [...list.querySelectorAll<HTMLElement>('[role="menuitem"]')]
    const index = buttons.indexOf(current)

    if (event.key === 'ArrowRight' && !inSub) {
      const item = items[index]
      if (!item?.children) return
      event.preventDefault()
      await openSub(item, current)
      if (subMenu.value) focusFirst(subMenu.value)
      return
    }
    if (event.key === 'ArrowLeft' && inSub) {
      event.preventDefault()
      const parent = menu.value?.querySelector<HTMLElement>('.is-open')
      closeSub()
      parent?.focus()
      return
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const step = event.key === 'ArrowDown' ? 1 : -1
    buttons.at((index + step) % buttons.length)?.focus()
  }

  // Any press outside it, a scroll, a resize or leaving the window closes it.
  function onPointerDown(event: PointerEvent) {
    if (!at.value) return
    if (layer.value?.$el.contains(event.target as Node)) return
    close()
  }

  watch(
    () => props.disabled,
    (disabled) => {
      if (disabled) close()
    },
  )

  onMounted(() => {
    wide = window.matchMedia('(min-width: 700px) and (pointer: fine)')
    surface.value?.addEventListener('contextmenu', onContextMenu)
    surface.value?.addEventListener('scroll', close, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { capture: true })
    window.addEventListener('resize', close)
    window.addEventListener('blur', close)
  })

  onBeforeUnmount(() => {
    surface.value?.removeEventListener('contextmenu', onContextMenu)
    surface.value?.removeEventListener('scroll', close)
    window.removeEventListener('pointerdown', onPointerDown, { capture: true })
    window.removeEventListener('resize', close)
    window.removeEventListener('blur', close)
  })
</script>
