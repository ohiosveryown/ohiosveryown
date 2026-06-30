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
    padding-top: 10rem;
    max-width: 2100rem;
    width: 90dvw;
  }
</style>
