<template>
  <section class="last-played">
    <p class="last-played__label thin">Last played</p>

    <component
      :is="url ? 'a' : 'div'"
      class="last-played__row"
      v-bind="url ? { href: url, target: '_blank', rel: 'noopener' } : {}"
    >
      <div class="last-played__art">
        <img
          v-if="cover"
          :src="cover"
          alt=""
          class="last-played__cover"
        />
        <span class="last-played__overlay" />
      </div>

      <div class="last-played__meta">
        <p class="last-played__title">{{ title }}</p>
        <p class="last-played__artist">{{ artist }}</p>
      </div>
    </component>
  </section>
</template>

<style scoped lang="scss">
  .last-played {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 4rem;
    width: 100%;
    max-width: 56.6rem;
    @include breakpoint(md) {
      transform: translateX(0.6rem);
    }
  }

  .last-played__label {
    font-size: 1.5rem;
    letter-spacing: 0.025rem;
  }

  .last-played__row {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  a.last-played__row {
    cursor: var(--cursor);
  }

  a.last-played__row:hover .last-played__title {
    text-decoration: underline;
    text-decoration-thickness: 0.064rem;
    text-underline-offset: 0.3rem;
  }

  .last-played__art {
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 1.3rem;
    background: linear-gradient(135deg, #b08a6a, #5b3f6b 55%, #2c2640);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22);
  }

  .last-played__cover {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: cover;
    object-position: center;
    transform: scale(1.4);
  }

  .last-played__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  .last-played__meta {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    letter-spacing: -0.075rem;
  }

  .last-played__title {
    margin: 0;
    color: #000;
    font-size: 1.7rem;
    font-family: var(--system-font);
    line-height: 1;
    letter-spacing: -0.025rem;
  }

  .last-played__artist {
    margin: 0;
    opacity: 0.5;
    color: #000;
    font-size: 1.5rem;
    font-family: var(--system-font);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.025rem;
  }
</style>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      title?: string
      artist?: string
      cover?: string | null
      url?: string | null
    }>(),
    {
      title: 'Say You Will (ft. Caroline Shaw)',
      artist: 'Kanye West',
      cover: null,
      url: null,
    },
  )
</script>
