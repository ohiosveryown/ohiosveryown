<template>
  <NuxtLayout>
    <ClientOnly>
      <GradientBackdrop />
    </ClientOnly>
    <main>
      <NuxtPage />
    </main>
    <TooltipLabel />
  </NuxtLayout>
</template>

<style scoped lang="scss">
  main {
    position: relative;
    margin: 0 auto;
    width: min(90dvw, 100%);
    max-width: 2100rem;
    padding-top: calc(var(--safe-top) + 4.8rem);
    padding-right: var(--safe-right);
    padding-bottom: calc(var(--safe-bottom) + 12rem);
    padding-left: var(--safe-left);

    @include breakpoint(lg) {
      padding-top: calc(var(--safe-top) + 10rem);
      padding-bottom: calc(var(--safe-bottom) + 5.6rem);
    }
  }
</style>

<script setup lang="ts">
  const route = useRoute()

  useHead({
    title: computed(() => (route.meta.title as string | undefined) ?? 'Matthew Pence'),
  })
</script>
