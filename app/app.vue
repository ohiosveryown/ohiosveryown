<template>
  <NuxtLayout>
    <ClientOnly>
      <GradientBackdrop />
      <LastVisit />
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
    z-index: var(--z1);
    margin: 0 auto;
    width: 90%;
    max-width: 2100rem;
    padding-top: 4.8rem;
    padding-right: var(--safe-right);
    padding-bottom: calc(var(--safe-bottom) + 12rem);
    padding-left: var(--safe-left);

    @include breakpoint(lg) {
      padding-top: 13rem;
      padding-bottom: calc(var(--safe-bottom) + 5.6rem);
    }
  }
</style>

<script setup lang="ts">
  import thinWoff2 from '~/assets/type/thin.woff2'

  const route = useRoute()

  useHead({
    title: computed(
      () => (route.meta.title as string | undefined) ?? 'Matthew Pence',
    ),
    link: [
      {
        rel: 'preload',
        href: thinWoff2,
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    ],
  })
</script>
