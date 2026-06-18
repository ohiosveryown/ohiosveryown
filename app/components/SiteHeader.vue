<template>
  <header class="site-header">
    <div class="greeting">
      <slot name="greeting"
        ><span class="greeting-w">W</span>{{ greetingRest }}</slot
      >
    </div>
    <h1>
      <slot />
    </h1>
  </header>
</template>

<style scoped lang="scss">
  .greeting {
    margin-bottom: 1.2rem;
    font-size: clamp(1rem, -0.875rem + 12vw, 6rem);
    font-weight: 360;
    letter-spacing: -0.2rem;
    line-height: 114%;
  }

  .greeting-w {
    margin-right: -0.3rem;
  }

  h1,
  h1 :deep(span) {
    font-family: 'italic', Courier, monospace;
    font-size: clamp(1rem, -0.875rem + 10vw, 4.2rem);
    font-weight: 100;
    line-height: 128%;
    letter-spacing: -0.072rem;
  }

  h1 :deep(.row) {
    display: block;
  }

  h1 :deep(span.has-tooltip) {
    color: #7b7b7b;
    text-decoration-thickness: 0.064rem;
    text-decoration-color: currentColor;
    text-underline-offset: 0.8rem;
  }

  h1 :deep(span.has-tooltip:hover) {
    text-decoration: none;
  }

  h1 :deep(.icon-square) {
    width: 2.6rem;
    height: 2.6rem;
    margin-left: 1rem;
    transform: translateY(0.1rem);
  }
</style>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ greeting?: string }>(), {
    greeting: 'Welcome traveler',
  })

  // Strip the leading "W" so it can be wrapped for manual W/e kerning.
  const greetingRest = computed(() => props.greeting.replace(/^W/, ''))
</script>
