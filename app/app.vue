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
    width: 90dvw;
    max-width: 2100rem;
    padding-top: calc(var(--safe-top) + 4.8rem);
    padding-bottom: calc(var(--safe-bottom) + 10rem);

    @include breakpoint(lg) {
      padding-top: calc(var(--safe-top) + 10rem);
      padding-bottom: calc(var(--safe-bottom) + 5.6rem);
    }
  }
</style>
