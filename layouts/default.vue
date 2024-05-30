<template>
  <main class="view width">
    <slot />
  </main>

  <picture>
    <source class="rainbow" srcset="https://ik.imagekit.io/ohiosveryown/ovo--3.7/rainbow-02--dark.webp"
      media="(prefers-color-scheme: dark)" alt="dark rainbow gradient" />
    <img class="rainbow" src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/rainbow-01.webp"
      alt="dark rainbow gradient" />
  </picture>
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