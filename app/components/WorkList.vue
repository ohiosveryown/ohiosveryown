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

  <AnimatePresence>
    <motion.div
      v-if="activeCover"
      :key="activeCover.path"
      class="work-cover"
      :style="{ backgroundColor: activeCover.color }"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="{ duration: 0.2, ease: 'easeInOut' }"
    >
      <motion.div
        class="work-cover__media-wrap"
        :initial="{ opacity: 0, scale: 0.98, filter: 'blur(2rem)' }"
        :animate="{ opacity: 1, scale: 1, filter: 'blur(0)' }"
        :exit="{
          opacity: 0,
          scale: 1,
          filter: 'blur(2rem)',
        }"
        :transition="{
          duration: 0.5,
          delay: 0.04,
          ease: 'easeInOut',
        }"
      >
        <video
          v-if="activeCover.video"
          :ref="bindCoverVideo"
          :src="activeCover.video"
          :poster="activeCover.cover"
          class="work-cover__media"
          muted
          playsinline
          loop
          disablePictureInPicture
          disableRemotePlayback
          @loadeddata="onCoverVideoReady"
        />
        <img
          v-else-if="activeCover.cover"
          :src="activeCover.cover"
          alt=""
          class="work-cover__media"
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
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

  .work-cover {
    display: none;

    @include breakpoint(md) {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: var(--z0);
      padding: 1.2rem;
      width: 40dvw;
      height: 100dvh;
      pointer-events: none;
      will-change: transform, opacity, filter;
    }
  }

  .work-cover__media-wrap {
    will-change: opacity, filter, transform;
  }

  .work-cover__media {
    display: block;
    height: 30dvh;
    width: auto;
    border-radius: 1.2rem;
    object-fit: contain;
  }
</style>

<script setup lang="ts">
  import {
    ref,
    computed,
    onBeforeUnmount,
    type ComponentPublicInstance,
  } from 'vue'
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
      coverColor: r.meta.coverColor,
      video: r.meta.video,
      folder: r.meta.folder,
    }))

  const hoveredPath = ref<string | null>(null)
  const coverVideoRef = ref<HTMLVideoElement | null>(null)

  const activeCover = computed(() => {
    if (!hoveredPath.value) return null
    const entry = entries.find((e) => e.path === hoveredPath.value)
    if (!entry?.cover && !entry?.video) return null
    return {
      path: entry.path,
      cover: entry.cover,
      video: entry.video,
      color: entry.coverColor ?? '#111',
    }
  })

  async function playCoverVideo(video?: HTMLVideoElement | null) {
    const el = video ?? coverVideoRef.value
    if (!el || !activeCover.value?.video) return
    el.currentTime = 0
    try {
      await el.play()
    } catch {
      // poster/cover remains visible if autoplay is blocked
    }
  }

  function bindCoverVideo(el: Element | ComponentPublicInstance | null) {
    const video = el instanceof HTMLVideoElement ? el : null
    coverVideoRef.value = video
    if (video) void playCoverVideo(video)
  }

  function onCoverVideoReady(event: Event) {
    void playCoverVideo(event.target as HTMLVideoElement)
  }

  function pauseCoverVideo() {
    const video = coverVideoRef.value
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  onBeforeUnmount(pauseCoverVideo)

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
    pauseCoverVideo()
    hoveredPath.value = null
  }
</script>
