<template>
  <div class="view width">
    <slot />
  </div>

  <img
    class="rainbow"
    src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/noisey-gradient(1).webp?updatedAt=1714145724935"
    alt="rainbow mesh gradient"
  />
</template>

<style lang="scss" scoped>
  .rainbow {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: var(--zmin);
    transform: scale(80);
    pointer-events: none;
  }
</style>
