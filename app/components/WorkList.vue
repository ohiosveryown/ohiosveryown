<template>
  <section class="work">
    <ul class="work-list">
      <li
        v-for="entry in entries"
        :key="entry.path"
        class="work-item"
        @mouseenter="handleEnter(entry.path)"
        @mousemove="handleMove"
        @mouseleave="handleLeave"
      >
        <NuxtLink
          :to="entry.path"
          class="work-link"
        >
          <div class="work-text">
            <ul class="work-tags">
              <li
                v-for="(tag, i) in entry.tags"
                :key="tag"
              >
                {{ tag }}{{ i < (entry.tags?.length ?? 0) - 1 ? ',' : '' }}
              </li>
            </ul>
            <h3 class="work-title">
              <span
                v-if="entry.folder"
                class="work-folder-anchor"
              >
                <AnimatePresence>
                  <motion.span
                    v-if="hoveredPath === entry.path"
                    :key="entry.path"
                    class="work-folder-wrap"
                    :initial="{
                      opacity: 0,
                      scale: 0.88,
                      filter: 'blur(1rem)',
                    }"
                    :animate="{
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0)',
                    }"
                    :exit="{
                      opacity: 0,
                      scale: 1,
                      filter: 'blur(1rem)',
                    }"
                    :transition="{
                      duration: 0.2,
                      ease: 'easeInOut',
                    }"
                  >
                    <motion.img
                      :src="entry.folder"
                      alt=""
                      class="work-folder"
                      :style="{ x: parallaxX, y: parallaxY }"
                    />
                  </motion.span>
                </AnimatePresence>
              </span>
              {{ entry.title }}
            </h3>
            <p class="work-description">{{ entry.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
  .work {
    margin-top: 5rem;

    @include breakpoint(md) {
      width: grid-width(5);
    }
  }

  .work-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .work-item {
    position: relative;
  }

  .work-link {
    display: flex;
    flex-direction: column;
    cursor: var(--cursor);
  }

  .work-link:hover {
    .work-title {
      background: #f7f7f7;
    }
  }

  .work-folder-anchor {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(100% + 0.8rem);
    width: 3.2rem;
    pointer-events: none;
  }

  .work-folder-wrap {
    display: block;
    width: 100%;
    transform-origin: right center;
    will-change: transform, opacity, filter;
  }

  .work-folder {
    display: block;
    width: 100%;
    height: auto;
    will-change: transform;
  }

  .work-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin: 0 0 0.8rem;
    padding: 0;
    list-style: none;
  }

  .work-tags li {
    font-family: 'thin', Georgia, serif;
    font-size: clamp(1.7rem, 1.1vw, 1.9rem);
    font-weight: 360;
    line-height: 1.32;
  }

  .work-title {
    position: relative;
    border-radius: 0.5rem;
    margin-bottom: 1.3rem;
    width: fit-content;
    font-size: clamp(2.4rem, 2.1vw, 2.8rem);
    font-weight: 440;
    line-height: 1.2;
    letter-spacing: -0.068rem;
  }

  .work-description {
    font-size: clamp(1.7rem, 1.26vw, 1.8rem);
    font-weight: 450;
    letter-spacing: -0.024rem;
    line-height: 1.3;
    opacity: 0.72;
    text-wrap: balance;
  }
</style>

<script setup lang="ts">
  import { ref } from 'vue'
  import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion-v'

  const PARALLAX_MAX = 6
  const PARALLAX_SPRING = { stiffness: 140, damping: 18, mass: 0.5 }

  const router = useRouter()
  const entries = router
    .getRoutes()
    .filter((r) => r.path.startsWith('/work/'))
    .map((r) => ({
      path: r.path,
      title: r.meta.title,
      description: r.meta.description,
      tags: r.meta.tags,
      cover: r.meta.cover,
      folder: r.meta.folder,
    }))

  const hoveredPath = ref<string | null>(null)

  const parallaxRawX = useMotionValue(0)
  const parallaxRawY = useMotionValue(0)
  const parallaxX = useSpring(parallaxRawX, PARALLAX_SPRING)
  const parallaxY = useSpring(parallaxRawY, PARALLAX_SPRING)

  function handleEnter(path: string) {
    hoveredPath.value = path
  }

  function handleMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const relX =
      (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const relY =
      (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    const clampedX = Math.max(-1, Math.min(1, relX))
    const clampedY = Math.max(-1, Math.min(1, relY))
    parallaxRawX.set(clampedX * PARALLAX_MAX)
    parallaxRawY.set(clampedY * PARALLAX_MAX)
  }

  function handleLeave() {
    hoveredPath.value = null
  }
</script>
