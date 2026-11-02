<template>
  <!-- Any page that isn't there (or broke): Mallow in each of its forms,
       still looking. -->
  <main class="error-page">
    <motion.div
      class="error-page__inner"
      :initial="{ opacity: 0, filter: 'blur(10px)' }"
      :animate="{ opacity: 1, filter: 'blur(0px)' }"
      :transition="{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }"
    >
      <!-- The reel (Mallow as a patch, a cloud, a s'more, stained glass…),
           0.4s a form. With reduced motion, just its first. -->
      <video
        ref="video"
        class="error-page__reel"
        poster="/mallow/forms.webp"
        width="480"
        height="640"
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="/mallow/forms.webm"
          type="video/webm"
        />
        <source
          src="/mallow/forms.mp4"
          type="video/mp4"
        />
      </video>

      <div class="error-page__words">
        <small class="error-page__code">{{ code }}</small>
        <p class="h5 error-page__title">{{ title }}</p>
        <p class="error-page__body">{{ body }}</p>
      </div>

      <a
        class="error-page__home"
        href="/"
        @click.prevent="clearError({ redirect: '/' })"
        >Back to the desk</a
      >
    </motion.div>
  </main>
</template>

<style scoped lang="scss">
  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh;
    padding: calc(var(--safe-top) + 4rem) 2rem calc(var(--safe-bottom) + 4rem);
    color: #fff;
    background: #000;
  }

  .error-page__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    width: 100%;
    max-width: 32rem;
    text-align: center;

    @include breakpoint(md) {
      max-width: 44rem;
    }
  }

  .error-page__reel {
    display: block;
    width: 100%;
    max-width: 24rem;
    height: auto;
    aspect-ratio: 3 / 4;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.08);
    object-fit: cover;
  }

  .error-page__words {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .error-page__code {
    opacity: 0.5;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.06em;
  }

  .error-page__title {
    color: #fff;
  }

  .error-page__body {
    opacity: 0.7;
    text-wrap: pretty;
  }

  .error-page__home {
    padding: 1rem 1.8rem;
    border-radius: 10rem;
    color: #000;
    background: #fff;
    font-size: 1.4rem;
    font-weight: 500;
    text-decoration: none;
    cursor: var(--cursor);

    &:focus-visible {
      outline: 1px solid rgba(255, 255, 255, 0.6);
      outline-offset: 0.3rem;
    }
  }
</style>

<script setup lang="ts">
  import { motion } from 'motion-v'
  import type { NuxtError } from '#app'

  const props = defineProps<{ error: NuxtError }>()

  const code = computed(() => props.error?.statusCode ?? 404)
  const missing = computed(() => code.value === 404)
  const title = computed(() =>
    missing.value ? 'Mallow tried everything.' : 'Something broke.',
  )
  const body = computed(() =>
    missing.value
      ? 'It turned into a patch, a cloud, a s’more and a stained-glass window looking for this page. It isn’t here.'
      : 'Mallow is trying every form it knows to fix it. Try again in a moment.',
  )

  useHead({ title: computed(() => (missing.value ? 'Not found' : 'Error')) })

  // With reduced motion the reel stays on its first form (the fade in is
  // only opacity and blur, so it stays).
  const reduceMotion = ref(false)
  const video = useTemplateRef<HTMLVideoElement>('video')
  onMounted(() => {
    reduceMotion.value = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion.value) video.value?.play().catch(() => {})
  })
</script>
