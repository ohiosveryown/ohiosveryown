<template>
  <motion.div
    ref="root"
    class="desk-item"
    :class="{ 'is-listed': !roomy }"
    :style="{ zIndex: carrying ? 'calc(var(--zmax) - 1)' : 2 + layer, x, y }"
    :drag="roomy"
    :drag-constraints="bounds"
    :drag-elastic="0.12"
    :drag-transition="{ power: 0.18, timeConstant: 220 }"
    :while-drag="{ scale: 1.04 }"
    :transition="{ type: 'spring', stiffness: 420, damping: 30 }"
    :initial="{
      opacity: 0,
      filter: reduceMotion ? 'blur(0px)' : 'blur(10px)',
    }"
    :animate="{
      opacity: 1,
      filter: 'blur(0px)',
      // Any filter left on, even blur(0px), stops backdrop-filter inside
      // the item (the desk-file count pill) from seeing the desk behind it.
      transitionEnd: { filter: 'none' },
      transition: {
        duration: reduceMotion ? 0.01 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease,
      },
    }"
    @drag-start="onDragStart"
    @drag="onDrag"
    @drag-end="onDragEnd"
    @pointerdown.capture="onGrab"
    @click.capture="onClick"
    @keydown="onKeydown"
    @focusout="raisedByKeys = false"
    @dragstart.capture.prevent
  >
    <!-- Its own element for the drop fade: the item itself has motion's
         entrance on its opacity and filter. -->
    <div
      class="desk-item__body"
      :class="{ 'is-away': away }"
    >
      <slot :asking="asking" />
    </div>
  </motion.div>
</template>

<style scoped lang="scss">
  .desk-item {
    user-select: none;
    touch-action: none;
    -webkit-user-drag: none;

    // In the page's list (small screens): stays put, and scrolls the page.
    &.is-listed {
      touch-action: auto;
    }
  }

  // Dropped on Mallow: it fades out where it was let go, and back in where
  // it was picked up.
  .desk-item__body {
    transition:
      opacity 250ms ease,
      filter 250ms ease;

    &.is-away {
      opacity: 0;
      filter: blur(10px);
    }
  }
</style>

<script setup lang="ts">
  import { animate, motion, useMotionValue } from 'motion-v'
  import type { AskDropItem } from '~/composables/useAskDrop'
  import { DESK_EDGE_REM, type DeskSortKeys } from '~/composables/useDesk'

  const props = withDefaults(
    defineProps<{
      delay?: number
      // What Mallow is asked if this is dropped on him (see useAskDrop).
      ask?: AskDropItem
      // What the desk's Sort By orders it by.
      sort?: DeskSortKeys
    }>(),
    { delay: 0, ask: undefined, sort: undefined },
  )

  const { surface, raise, register, moved } = useDesk()

  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)
  const layer = ref(0)

  let dragged = false

  // Where the item has been dragged to.
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Room for the desk (md up). Smaller, the page lists the items in place
  // (see pages/index): no dragging or nudging, and none of where they'd
  // been moved to.
  const roomy = ref(false)
  let roomyQuery: MediaQueryList | undefined
  function onRoomyChange() {
    roomy.value = !!roomyQuery?.matches
    if (roomy.value) return
    x.stop()
    y.stop()
    x.set(0)
    y.set(0)
  }

  // On every window resize, motion re-fits dragged items into the desk by
  // re-measuring both. On iOS, scrolling shows and hides the toolbar, which
  // fires resizes mid-scroll; the measurements land at different scroll
  // positions and items jump back. A resize that only changes the height
  // (the toolbar) keeps the item where it was; width changes still re-fit.
  // The capture listener runs before motion's, the other one after it.
  let before: { x: number; y: number; width: number } | undefined
  function beforeResize() {
    before = { x: x.get(), y: y.get(), width: window.innerWidth }
  }
  function afterResize() {
    if (!roomy.value) {
      before = undefined
      return
    }
    if (before && window.innerWidth === before.width) {
      x.set(before.x)
      y.set(before.y)
    } else {
      // A narrower window: back inside the margin, if it now hangs past it.
      const limits = measureBounds()
      if (limits) {
        x.set(
          Math.min(
            Math.max(x.get(), limits.left),
            Math.max(limits.left, limits.right),
          ),
        )
        y.set(
          Math.min(
            Math.max(y.get(), limits.top),
            Math.max(limits.top, limits.bottom),
          ),
        )
      }
    }
    before = undefined
  }

  // Where it can be dragged and thrown: the desk, less a margin along every
  // edge (the same as Mallow's bar), as offsets from its spot in the layout.
  // Measured when it's picked up, and on resizes.
  const bounds = ref<
    | {
        left: number
        right: number
        top: number
        bottom: number
      }
    | false
  >(false)
  function measureBounds() {
    const desk = surface.value
    const item = root.value?.$el
    if (!desk || !item) return null
    const edge =
      DESK_EDGE_REM *
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    // offsetLeft/Top are its spot in the layout; x/y move it from there.
    const measured = {
      left: -item.offsetLeft + edge,
      top: -item.offsetTop + edge,
      right: desk.clientWidth - item.offsetLeft - item.offsetWidth - edge,
      bottom: desk.clientHeight - item.offsetTop - item.offsetHeight - edge,
    }
    bounds.value = measured
    return measured
  }

  function onGrab() {
    measureBounds()
    dragged = false
    layer.value = raise()
    // On press: motion reports the drag start only after it has moved.
    pickedUp = { x: x.get(), y: y.get() }
  }

  // Dropping on Mallow (mouse and trackpad only). While dragged the item
  // sits above the ask bar; dropped on it, it fades out and back in where
  // it was picked up from, so asking never rearranges the desk.
  const askDrop = useAskDrop()
  const finePointer = ref(false)
  const carrying = ref(false)
  // Held over Mallow: the item shows just its picture.
  const asking = computed(() => carrying.value && askDrop.over.value)
  let pickedUp = { x: 0, y: 0 }
  const away = ref(false)
  const FADE_MS = 250

  function onDragStart() {
    dragged = true
    moved()
    suppressTooltip(true)
    carrying.value = !!props.ask && finePointer.value
    if (carrying.value) askDrop.measure()
    window.addEventListener('keydown', onDragKey)
  }

  // Escape mid-drag puts it back where it was picked up. Motion can't cancel
  // a drag, so this ends it with a release of its own (motion listens on
  // the window) and onDragEnd springs it home instead of dropping it.
  let cancelled = false
  const SPRING_BACK = { type: 'spring', stiffness: 300, damping: 28 } as const
  function onDragKey(event: KeyboardEvent) {
    if (event.key !== 'Escape') return
    event.preventDefault()
    cancelled = true
    window.dispatchEvent(
      new PointerEvent('pointerup', { isPrimary: true, pointerType: 'mouse' }),
    )
  }

  function onDrag(event: PointerEvent) {
    if (!carrying.value) return
    askDrop.over.value = askDrop.isOver(event.clientX, event.clientY)
  }

  function onDragEnd() {
    window.removeEventListener('keydown', onDragKey)
    suppressTooltip(false)
    dismissTooltip()
    const droppedOnMallow = carrying.value && askDrop.over.value && !cancelled
    carrying.value = false
    askDrop.over.value = false
    if (cancelled) {
      cancelled = false
      // A frame later, so it replaces motion's own throw.
      requestAnimationFrame(() => {
        animate(x, pickedUp.x, SPRING_BACK)
        animate(y, pickedUp.y, SPRING_BACK)
      })
      return
    }
    if (!droppedOnMallow || !props.ask) return
    askDrop.drop(props.ask)
    away.value = true
    setTimeout(() => {
      // Ends motion's throw, which carries on while it fades.
      x.stop()
      y.stop()
      x.set(pickedUp.x)
      y.set(pickedUp.y)
      requestAnimationFrame(() => (away.value = false))
    }, FADE_MS)
  }

  // The arrow keys move a focused item (Shift for bigger steps), inside
  // the desk like a drag. Repeated presses add up from where the last one
  // was heading, not from wherever the glide has got to.
  // A short glide, not a spring: a spring restarted on every press carries
  // its speed into the next, and held arrow keys (key repeat) wound it up
  // until it flew off.
  const NUDGE = { duration: 0.18, ease: [0.22, 1, 0.36, 1] } as const
  const NUDGE_PX = { small: 10, large: 50 }
  const ARROWS: Record<string, [number, number]> = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
  }
  let nudgedTo: { x: number; y: number } | null = null
  // Brought to the front once per focus, not on every press.
  let raisedByKeys = false
  function onKeydown(event: KeyboardEvent) {
    const arrow = ARROWS[event.key]
    const desk = surface.value
    if (
      !arrow ||
      !desk ||
      !roomy.value ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    )
      return
    event.preventDefault()
    if (!raisedByKeys) {
      layer.value = raise()
      raisedByKeys = true
    }
    dismissTooltip()

    const limits = measureBounds()
    if (!limits) return
    const step = event.shiftKey ? NUDGE_PX.large : NUDGE_PX.small
    const moving = x.isAnimating() || y.isAnimating()
    const from = (moving && nudgedTo) || { x: x.get(), y: y.get() }
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), Math.max(min, max))
    const to = {
      x: clamp(from.x + arrow[0] * step, limits.left, limits.right),
      y: clamp(from.y + arrow[1] * step, limits.top, limits.bottom),
    }
    nudgedTo = to
    moved()
    if (reduceMotion.value) {
      x.set(to.x)
      y.set(to.y)
      return
    }
    animate(x, to.x, NUDGE)
    animate(y, to.y, NUDGE)
  }

  function onClick(event: MouseEvent) {
    if (!dragged) return
    event.preventDefault()
    event.stopPropagation()
    dragged = false
  }

  // Clean Up and Sort By (the desk's right-click menu) move it to a spot on a grid,
  // with the same spring as an Escape mid-drag.
  const root = useTemplateRef<{ $el: HTMLElement }>('root')
  const unregister = register({
    el: () => root.value?.$el ?? null,
    sortKeys: () => props.sort,
    moveTo(toX, toY, delay, instant) {
      if (instant || reduceMotion.value) {
        x.stop()
        y.stop()
        x.set(toX)
        y.set(toY)
        return
      }
      animate(x, toX, { ...SPRING_BACK, delay })
      animate(y, toY, { ...SPRING_BACK, delay })
    },
  })

  onBeforeUnmount(() => {
    unregister()
    window.removeEventListener('keydown', onDragKey)
    if (dragged) suppressTooltip(false)
    window.removeEventListener('resize', beforeResize, { capture: true })
    window.removeEventListener('resize', afterResize)
    roomyQuery?.removeEventListener('change', onRoomyChange)
  })

  onMounted(() => {
    roomyQuery = window.matchMedia('(min-width: 700px)')
    roomyQuery.addEventListener('change', onRoomyChange)
    onRoomyChange()
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    finePointer.value = window.matchMedia('(pointer: fine)').matches
    // Added after motion's own listener (the motion.div mounts first).
    window.addEventListener('resize', beforeResize, { capture: true })
    window.addEventListener('resize', afterResize)
  })
</script>
