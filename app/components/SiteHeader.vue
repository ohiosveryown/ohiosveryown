<template>
  <header class="site-header">
    <p class="greeting"><span class="greeting-w">W</span>{{ greetingRest }}</p>
    <h1 class="intro">
      <slot />
    </h1>
  </header>
</template>

<style scoped lang="scss">
  .site-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 58.6rem;
  }

  .greeting {
    color: #000;
    font-size: clamp(3rem, 6vw, 3.6rem);
    font-family: var(--system-font);
    font-weight: 400;
    letter-spacing: -0.06rem;
    line-height: 1.1;
    @include breakpoint(md) {
      letter-spacing: -0.14rem;
    }
  }

  .greeting-w {
    margin-right: -0.2rem;
  }

  .intro {
    color: #7d7d7d;
    font-size: clamp(2.8rem, 6vw, 3.6rem);
    font-family: var(--system-font);
    font-weight: 400;
    letter-spacing: -0.1rem;
    line-height: 1.18;
    @include breakpoint(md) {
      letter-spacing: -0.14rem;
    }
  }
</style>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ greeting?: string }>(), {
    greeting: 'Welcome traveler',
  })

  // Strip the leading "W" so it can be wrapped for manual W/e kerning.
  const greetingRest = computed(() => props.greeting.replace(/^W/, ''))
</script>
