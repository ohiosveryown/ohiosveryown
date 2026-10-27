<template>
  <AnimatePresence>
    <motion.div
      v-if="at"
      ref="menu"
      class="desk-menu"
      role="menu"
      aria-label="Desktop"
      :style="{ left: `${at.x}px`, top: `${at.y}px` }"
      :initial="{ opacity: 0, scale: 0.96 }"
      :animate="{ opacity: 1, scale: 1, transition: { duration: 0.12 } }"
      :exit="{ opacity: 0, transition: { duration: 0.1 } }"
      @keydown="onKeydown"
    >
      <button
        v-for="item in items"
        :key="item.label"
        class="desk-menu__item"
        type="button"
        role="menuitem"
        @click="choose(item)"
      >
        {{ item.label }}
      </button>
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
    transform-origin: top left;
    backdrop-filter: blur(2rem) saturate(1.6);
    -webkit-backdrop-filter: blur(2rem) saturate(1.6);
  }

  .desk-menu__item {
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
    &:focus-visible {
      background: rgba(255, 255, 255, 0.14);
      outline: none;
    }
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

  type Item = { label: string; run: () => void }
  const items: Item[] = [{ label: 'Clean Up', run: cleanUp }]

  // Where it's open (viewport px), or null when closed.
  const at = ref<{ x: number; y: number } | null>(null)
  const menu = useTemplateRef<{ $el: HTMLElement }>('menu')

  // Only on the bare desk: text, links, icons and the chat keep the
  // browser's own menu, and so does a Shift right-click anywhere.
  const NATIVE =
    'a, button, input, textarea, p, span, h1, h2, h3, svg, img, video, [contenteditable], .desk-item, .home__ask'

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
    at.value = { x: event.clientX, y: event.clientY }
    await nextTick()
    const el = menu.value?.$el
    if (!el) return
    // Kept on screen: flips left or up at the edges, like the system menu.
    const { width, height } = el.getBoundingClientRect()
    const edge = 8
    at.value = {
      x:
        event.clientX + width + edge > window.innerWidth
          ? Math.max(edge, event.clientX - width)
          : event.clientX,
      y:
        event.clientY + height + edge > window.innerHeight
          ? Math.max(edge, event.clientY - height)
          : event.clientY,
    }
    el.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }

  function close() {
    at.value = null
  }

  function choose(item: Item) {
    close()
    item.run()
  }

  // Up and down move between items, wrapping; Escape and Tab close it.
  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const buttons = [
      ...(menu.value?.$el.querySelectorAll<HTMLElement>('[role="menuitem"]') ??
        []),
    ]
    const index = buttons.indexOf(document.activeElement as HTMLElement)
    const step = event.key === 'ArrowDown' ? 1 : -1
    buttons.at((index + step) % buttons.length)?.focus()
  }

  // Any press outside it, a scroll, a resize or leaving the window closes it.
  function onPointerDown(event: PointerEvent) {
    if (!at.value) return
    if (menu.value?.$el.contains(event.target as Node)) return
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
