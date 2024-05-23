<template>
  <div class="gradient-blur">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .gradient-blur {
    position: fixed;
    z-index: 5;
    inset: -14% 0 auto 0;
    height: 24%;
    pointer-events: none;
    transform: scale(-1);
  }
  .gradient-blur > div,
  .gradient-blur::before,
  .gradient-blur::after {
    position: absolute;
    inset: 0;
  }
  .gradient-blur::before {
    content: "";
    z-index: 1;
    backdrop-filter: blur(0.5px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 12%,
      rgba(0, 0, 0, 1) 24%,
      rgba(0, 0, 0, 0) 36%
    );
  }
  .gradient-blur > div:nth-of-type(1) {
    z-index: 2;
    backdrop-filter: blur(1px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 12%,
      rgba(0, 0, 0, 1) 24%,
      rgba(0, 0, 0, 1) 38%,
      rgba(0, 0, 0, 0) 50%
    );
  }
  .gradient-blur > div:nth-of-type(2) {
    z-index: 3;
    backdrop-filter: blur(2px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 1) 8%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) 64%
    );
  }
  .gradient-blur > div:nth-of-type(3) {
    z-index: 4;
    backdrop-filter: blur(4px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 38%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 1) 64%,
      rgba(0, 0, 0, 0) 76%
    );
  }
  .gradient-blur > div:nth-of-type(4) {
    z-index: 5;
    backdrop-filter: blur(8px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 1) 64%,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 0) 88%
    );
  }
  .gradient-blur > div:nth-of-type(5) {
    z-index: 6;
    backdrop-filter: blur(16px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 62%,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 1) 88%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  .gradient-blur > div:nth-of-type(6) {
    z-index: 7;
    backdrop-filter: blur(32px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 1) 88%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  .gradient-blur::after {
    content: "";
    z-index: 8;
    backdrop-filter: blur(64px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 88%,
      rgba(0, 0, 0, 1) 100%
    );
  }
</style>

<script setup></script>
