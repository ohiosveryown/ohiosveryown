<template>
  <header class="test container">
    <h1>Welcome traveler.</h1>
    <h2>
      I'm
      <Tooltip
        trigger="Matt"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/me@3x.webp"
        alt="Illustration of me"
        label="Hey there 👋"
      />, a staff designer at
      <Tooltip
        trigger="Github"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/gh@3x.webp"
        alt="GitHub illustration"
        label="Copilot"
      />
      🐙,
      <br class="show-lg" />
      living in always peachy,
      <Tooltip
        trigger="Atlanta, Ga"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp"
        alt="Atlanta illustration"
        label="The city in a Forest"
      />
      🍑.
    </h2>
  </header>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    @include breakpoint(lg) {
      margin-bottom: 4rem;
    }
  }

  .show-lg {
    display: none;
    @include breakpoint(md) {
      display: inherit;
    }
  }

  h1 {
    margin-bottom: 1.6rem;
    @include breakpoint(md) {
      margin-bottom: 2rem;
    }
  }
</style>

<script setup lang="ts"></script>
