<template>
  <div class="last-visit">
    <AnimatePresence mode="wait">
      <motion.div
        v-if="visible && visit"
        :key="visit.id"
        class="last-visit__pill"
        role="status"
        :initial="{ opacity: 0, y: 12, filter: 'blur(10px)' }"
        :animate="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.45, ease: [0.8, 0, 0.16, 1] },
        }"
        :exit="{
          opacity: 0,
          y: 8,
          filter: 'blur(10px)',
          transition: { duration: 0.3, ease: [0.8, 0, 0.16, 1] },
        }"
      >
        <span class="last-visit__dot" />
        <span class="last-visit__text">Last visit from: {{ visit.label }}</span>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<style scoped lang="scss">
  .last-visit {
    display: flex;
    position: fixed;
    z-index: var(--z4);
    bottom: calc(var(--safe-bottom) + 2.4rem);
    left: calc(var(--safe-left) + 2.4rem);
    pointer-events: none;

    @include breakpoint(lg) {
      bottom: calc(var(--safe-bottom) + 3.2rem);
      left: calc(var(--safe-left) + 3.2rem);
    }
  }

  .last-visit__pill {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.7rem 1.4rem 0.7rem 1.1rem;
    border: 1px solid #000;
    border-radius: 100rem;
    color: #fff;
    background: #000;
    box-shadow:
      0 1px 0 0 rgba(255, 255, 255, 0.4) inset,
      0 2px 3px 0 rgba(0, 0, 0, 0.32);
    font-size: 1.3rem;
    font-family: var(--system-font);
    font-weight: 500;
    letter-spacing: -0.04rem;
    line-height: 1.3;
    white-space: nowrap;
  }

  .last-visit__dot {
    flex-shrink: 0;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 100px;
    background: #5cff6a;
    box-shadow: 0 0 0.7rem 0.1rem rgba(92, 255, 106, 0.7);
    animation: last-visit-glow 1.8s var(--ease) infinite;
  }

  @keyframes last-visit-glow {
    50% {
      box-shadow: 0 0 1.1rem 0.2rem rgba(92, 255, 106, 0.95);
    }
  }

  .last-visit__text {
    color: #fff;
  }
</style>

<script setup lang="ts">
  import { motion, AnimatePresence } from 'motion-v'
  import type { LastVisit } from '~~/server/api/last-visit.get'

  const DISPLAY_MS = 5200
  const POLL_MS = 25000

  const visible = ref(false)
  const shownId = ref<string | null>(null)
  const visit = ref<LastVisit | null>(null)
  let hideTimer: ReturnType<typeof setTimeout> | null = null
  let pollTimer: ReturnType<typeof setInterval> | null = null

  function reveal(id: string) {
    visible.value = true
    shownId.value = id
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      visible.value = false
    }, DISPLAY_MS)
  }

  watch(
    visit,
    (next) => {
      if (!next?.id) return
      if (next.id === shownId.value) return
      reveal(next.id)
    },
    { immediate: true },
  )

  onMounted(async () => {
    try {
      visit.value = await $fetch<LastVisit | null>('/api/last-visit', {
        method: 'POST',
      })
    } catch {
      visit.value = null
    }
    pollTimer = setInterval(async () => {
      try {
        visit.value = await $fetch<LastVisit | null>('/api/last-visit')
      } catch {
        visit.value = null
      }
    }, POLL_MS)
  })

  onBeforeUnmount(() => {
    if (hideTimer) clearTimeout(hideTimer)
    if (pollTimer) clearInterval(pollTimer)
  })
</script>
