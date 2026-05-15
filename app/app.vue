<template>
  <NuxtLayout>
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
    max-width: 2100rem;
    width: 90dvw;
    @include breakpoint(lg) {
      padding-top: 10rem;
    }
  }
</style>
