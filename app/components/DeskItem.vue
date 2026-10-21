<template>
  <motion.div
    class="desk-item"
    :style="{ zIndex: 2 + layer, x, y }"
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
    @drag-end="onDragEnd"
    @pointerdown.capture="onGrab"
    @click.capture="onClick"
    @dragstart.capture.prevent
  >
    <slot />
  </motion.div>
</template>

<style scoped lang="scss">
  .desk-item {
    user-select: none;
    touch-action: none;
    -webkit-user-drag: none;
  }
</style>

<script setup lang="ts">
  import { motion, useMotionValue } from 'motion-v'

  withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

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
  }

  function onDragStart() {
    dragged = true
    suppressTooltip(true)
  }

  function onDragEnd() {
    suppressTooltip(false)
    dismissTooltip()
  }

  function onClick(event: MouseEvent) {
    if (!dragged) return
    event.preventDefault()
    event.stopPropagation()
    dragged = false
  }

  onBeforeUnmount(() => {
    if (dragged) suppressTooltip(false)
    window.removeEventListener('resize', beforeResize, { capture: true })
    window.removeEventListener('resize', afterResize)
  })

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    // Added after motion's own listener (the motion.div mounts first).
    window.addEventListener('resize', beforeResize, { capture: true })
    window.addEventListener('resize', afterResize)
  })
</script>
