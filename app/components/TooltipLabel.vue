<template>
  <AnimatePresence>
    <motion.div
      v-if="visible && image"
      class="tooltip-label__image-anchor"
      :style="{ top: `${anchorY}px`, left: `${anchorX}px` }"
      :initial="{
        opacity: 0,
        scale: 0.72,
        rotate: -10,
        x: '-50%',
        y: '-80%',
        filter: 'blur(2rem)',
      }"
      :animate="{
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: '-50%',
        y: '-90%',
        filter: 'blur(0)',
        transition: { duration: 0.25 },
      }"
      :exit="{
        opacity: 0,
        scale: 0.72,
        rotate: 10,
        x: '-50%',
        y: '-90%',
        filter: 'blur(2rem)',
        transition: { duration: 0.15 },
      }"
    >
      <motion.div
        class="tooltip-label__image-parallax"
        :style="{ x: parallaxX, y: parallaxY }"
      >
        <img
          :src="image"
          alt=""
          class="tooltip-label__image"
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>

  <AnimatePresence>
    <motion.div
      v-if="visible"
      class="tooltip-label"
      :style="{ x, y }"
      :initial="{ opacity: 0, scale: 0.5, filter: 'blur(2rem)', rotate: 10 }"
      :animate="{
        opacity: 1,
        scale: 1,
        filter: 'blur(0)',
        rotate: 0,
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
    padding: 0.4rem 1rem 0.6rem;
    border-radius: 100rem;
    border: 1px solid #000;
    background: #000;
    color: #fff;
    font-weight: 600;
    font-family: var(--system-font);
    font-size: 1.3rem;
    text-align: center;
    letter-spacing: -0.04rem;
    line-height: 1.4;
    pointer-events: none;
    will-change: transform;
    box-shadow:
      0 1px 0px 0 rgba(255, 255, 255, 0.4) inset,
      0 2px 3px 0 rgba(0, 0, 0, 0.32);
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

  .tooltip-label__image-parallax {
    display: block;
    filter: drop-shadow(0 0.4rem 1.6rem rgba(0, 0, 0, 0.32));
    will-change: transform, filter;
  }

  .tooltip-label__image {
    --squircle: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M45.4,0 L54.6,0 C73.75,0 80.85,0 86.52,2.41 C92.2,5.25 94.75,7.8 97.59,13.48 C100,19.15 100,26.25 100,45.4 L100,54.6 C100,73.75 100,80.85 97.59,86.52 C94.75,92.2 92.2,94.75 86.52,97.59 C80.85,100 73.75,100 54.6,100 L45.4,100 C26.25,100 19.15,100 13.48,97.59 C7.8,94.75 5.25,92.2 2.41,86.52 C0,80.85 0,73.75 0,54.6 L0,45.4 C0,26.25 0,19.15 2.41,13.48 C5.25,7.8 7.8,5.25 13.48,2.41 C19.15,0 26.25,0 45.4,0 Z'/></svg>");

    display: block;
    width: 8.8rem;
    height: 8.8rem;
    -webkit-mask: var(--squircle) center / 100% 100% no-repeat;
    mask: var(--squircle) center / 100% 100% no-repeat;
    object-fit: cover;
  }
</style>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion-v'

  const OFFSET_X = 14
  const OFFSET_Y = 14
  const ANCHOR_GAP = 16
  const PARALLAX_MAX = 12
  const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }
  const PARALLAX_SPRING = { stiffness: 140, damping: 18, mass: 0.5 }

  const visible = ref(false)
  const content = ref('')
  const image = ref('')
  const anchorX = ref(0)
  const anchorY = ref(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, SPRING)
  const y = useSpring(mouseY, SPRING)

  const parallaxRawX = useMotionValue(0)
  const parallaxRawY = useMotionValue(0)
  const parallaxX = useSpring(parallaxRawX, PARALLAX_SPRING)
  const parallaxY = useSpring(parallaxRawY, PARALLAX_SPRING)

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
    } else {
      mouseX.set(nextX)
      mouseY.set(nextY)
    }

    if (currentTarget) {
      const rect = currentTarget.getBoundingClientRect()
      const relX =
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const relY =
        (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      const clampedX = Math.max(-1, Math.min(1, relX))
      const clampedY = Math.max(-1, Math.min(1, relY))
      parallaxRawX.set(clampedX * PARALLAX_MAX)
      parallaxRawY.set(clampedY * PARALLAX_MAX)
    } else {
      parallaxRawX.set(0)
      parallaxRawY.set(0)
    }
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
