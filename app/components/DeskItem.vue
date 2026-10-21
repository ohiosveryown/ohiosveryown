<template>
  <motion.div
    class="desk-item"
    :style="{ zIndex: carrying ? 'calc(var(--zmax) - 1)' : 2 + layer, x, y }"
    drag
    :drag-constraints="surface ?? false"
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

  const props = withDefaults(
    defineProps<{
      delay?: number
      // What Mallow is asked if this is dropped on him (see useAskDrop).
      ask?: AskDropItem
    }>(),
    { delay: 0, ask: undefined },
  )

  const { surface, raise } = useDesk()

  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)
  const layer = ref(0)

  let dragged = false

  // Where the item has been dragged to.
  const x = useMotionValue(0)
  const y = useMotionValue(0)

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
    if (before && window.innerWidth === before.width) {
      x.set(before.x)
      y.set(before.y)
    }
    before = undefined
  }

  function onGrab() {
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

  function onClick(event: MouseEvent) {
    if (!dragged) return
    event.preventDefault()
    event.stopPropagation()
    dragged = false
  }

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onDragKey)
    if (dragged) suppressTooltip(false)
    window.removeEventListener('resize', beforeResize, { capture: true })
    window.removeEventListener('resize', afterResize)
  })

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    finePointer.value = window.matchMedia('(pointer: fine)').matches
    // Added after motion's own listener (the motion.div mounts first).
    window.addEventListener('resize', beforeResize, { capture: true })
    window.addEventListener('resize', afterResize)
  })
</script>
