<template>
  <main class="view width">
    <slot />
  </main>

  <img
    class="rainbow"
    src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/noisey-gradient(1).webp"
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
