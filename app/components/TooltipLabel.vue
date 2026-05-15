<template>
  <AnimatePresence>
    <motion.div
      v-if="visible && image"
      class="tooltip-label__image-anchor"
      :style="{ top: `${anchorY}px`, left: `${anchorX}px` }"
      :initial="{
        opacity: 0,
        scale: 0.72,
        x: '-50%',
        y: '-80%',
        filter: 'blur(2rem)',
      }"
      :animate="{
        opacity: 1,
        scale: 1,
        x: '-50%',
        y: '-90%',
        filter: 'blur(0)',
        transition: { duration: 0.25 },
      }"
      :exit="{
        opacity: 0,
        scale: 0.72,
        x: '-50%',
        y: '-90%',
        filter: 'blur(2rem)',
        transition: { duration: 0.15 },
      }"
    >
      <img
        :src="image"
        alt=""
        class="tooltip-label__image"
      />
    </motion.div>
  </AnimatePresence>

  <AnimatePresence>
    <motion.div
      v-if="visible"
      class="tooltip-label"
      :style="{ x, y }"
      :initial="{ opacity: 0, scale: 0.5, filter: 'blur(2rem)' }"
      :animate="{
        opacity: 1,
        scale: 1,
        filter: 'blur(0)',
        transition: { duration: 0.3 },
      }"
      :exit="{
        opacity: 0,
        scale: 0.5,
        filter: 'blur(2rem)',
        transition: { duration: 0.15 },
      }"
    >
      {{ content }}
    </motion.div>
  </AnimatePresence>
</template>

<style scoped lang="scss">
  .tooltip-label {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--zmax);
    padding: 0.4rem 1.2rem 0.6rem;
    border-radius: 100rem;
    background: #000;
    box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.32);
    color: #fff;
    font-weight: 600;
    font-family: var(--system-font);
    font-size: 1.3rem;
    text-align: center;
    letter-spacing: -0.04rem;
    line-height: 1.4;
    pointer-events: none;
    will-change: transform;
  }

  .tooltip-label__image-anchor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--zmax);
    pointer-events: none;
    transform-origin: center bottom;
    will-change: transform, filter, opacity;
  }

  .tooltip-label__image {
    display: block;
    width: 8.8rem;
    height: 8.8rem;
    border-radius: 1.7rem;
    box-shadow: 0 0.4rem 1.6rem 0 rgba(0, 0, 0, 0.32);
    object-fit: cover;
  }
</style>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion-v'

  const OFFSET_X = 14
  const OFFSET_Y = 14
  const ANCHOR_GAP = 16
  const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }

  const visible = ref(false)
  const content = ref('')
  const image = ref('')
  const anchorX = ref(0)
  const anchorY = ref(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, SPRING)
  const y = useSpring(mouseY, SPRING)

  let primed = false
  let currentTarget: HTMLElement | null = null

  function getTooltipContent(el: HTMLElement): string {
    return el.dataset.tooltip ?? el.textContent?.trim() ?? ''
  }

  function getTooltipImage(el: HTMLElement): string {
    return el.dataset.tooltipImage ?? ''
  }

  function updateAnchor(target: HTMLElement) {
    const rect = target.getBoundingClientRect()
    anchorX.value = rect.left + rect.width / 2
    anchorY.value = rect.top - ANCHOR_GAP
  }

  function handleMouseMove(event: MouseEvent) {
    const nextX = event.clientX + OFFSET_X
    const nextY = event.clientY + OFFSET_Y

    if (!primed) {
      mouseX.jump(nextX)
      mouseY.jump(nextY)
      x.jump(nextX)
      y.jump(nextY)
      primed = true
      return
    }

    mouseX.set(nextX)
    mouseY.set(nextY)
  }

  function handleMouseOver(event: MouseEvent) {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      '.has-tooltip',
    )
    if (!target) return
    currentTarget = target
    updateAnchor(target)
    content.value = getTooltipContent(target)
    image.value = getTooltipImage(target)
    visible.value = true
  }

  function handleMouseOut(event: MouseEvent) {
    const from = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      '.has-tooltip',
    )
    if (!from) return
    const to = (
      event.relatedTarget as HTMLElement | null
    )?.closest<HTMLElement>('.has-tooltip')
    if (to) return
    currentTarget = null
    visible.value = false
  }

  function handleViewportChange() {
    if (currentTarget) updateAnchor(currentTarget)
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleViewportChange, { passive: true })
    window.addEventListener('resize', handleViewportChange)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('scroll', handleViewportChange)
    window.removeEventListener('resize', handleViewportChange)
    document.removeEventListener('mouseover', handleMouseOver)
    document.removeEventListener('mouseout', handleMouseOut)
  })
</script>
