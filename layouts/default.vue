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
  @import "/assets/style/grid.scss";

  .rainbow {
    position: fixed;
    top: 20rem;
    right: 0;
    z-index: var(--zmin);
    transform: scale(40);
    pointer-events: none;

    @include breakpoint(md) {
      top: 0;
      right: 10rem;
      transform: scale(80);
    }
  }
</style>
