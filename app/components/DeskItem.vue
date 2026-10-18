<template>
  <motion.div
    class="desk-item"
    :style="{ zIndex: 2 + layer }"
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
  import { motion } from 'motion-v'

  withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

  const { surface, raise } = useDesk()

  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)
  const layer = ref(0)

  let dragged = false

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
  })

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  })
</script>
