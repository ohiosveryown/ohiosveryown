<template>
  <section class="lab">
    <LittleGuy
      ref="guy"
      :size="size"
      :mood="mood"
      :files="files"
    />

    <div class="lab__controls">
      <button
        v-for="option in moods"
        :key="option"
        type="button"
        class="lab__button"
        :class="{ 'is-active': mood === option }"
        @click="mood = option"
      >
        {{ option }}
      </button>
      <button
        type="button"
        class="lab__button"
        @click="guy?.hop()"
      >
        hop
      </button>
      <button
        v-for="option in fileOptions"
        :key="option"
        type="button"
        class="lab__button"
        :class="{ 'is-active': files === option }"
        @click="files = option"
      >
        {{ option }} files
      </button>
      <button
        v-for="option in backgrounds"
        :key="option.name"
        type="button"
        class="lab__button"
        :class="{ 'is-active': background === option }"
        @click="background = option"
      >
        {{ option.name }}
      </button>
      <label class="lab__size">
        size
        <input
          v-model.number="size"
          type="range"
          min="4"
          max="40"
        />
      </label>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .lab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    min-height: 70svh;
    color: var(--lab-ink);
  }

  .lab__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }

  .lab__button {
    padding: 0.8rem 1.6rem;
    border: 1px solid var(--lab-ink);
    border-radius: 100rem;
    color: var(--lab-ink);
    font-size: 1.4rem;
    cursor: var(--cursor);

    &.is-active {
      color: #fff;
      background: var(--lab-ink);
    }
  }

  .lab__size {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-left: 1.6rem;
    font-family: var(--system-font);
    font-size: 1.4rem;
  }
</style>

<script setup lang="ts">
  // Prototype playground for the little guy; not linked from the site.
  const guy = useTemplateRef<{ hop: () => void }>('guy')
  const moods = ['idle', 'talking'] as const
  const mood = ref<(typeof moods)[number]>('idle')
  const size = ref(24)
  const fileOptions = ['auto', 'small', 'full'] as const
  const files = ref<(typeof fileOptions)[number]>('auto')
  // He renders on a transparent background, so try him on a few surfaces.
  const backgrounds = [
    { name: 'dark', color: '#020809', ink: '#d2f976' },
    { name: 'light', color: '#f3f1ea', ink: '#285955' },
    { name: 'lime', color: '#d2f976', ink: '#285955' },
  ]
  const background = ref(backgrounds[0]!)

  useHead({
    title: 'Little guy',
    meta: [{ name: 'robots', content: 'noindex' }],
    bodyAttrs: {
      style: computed(
        () =>
          `background: ${background.value.color}; --lab-ink: ${background.value.ink}`,
      ),
    },
  })
</script>
