<template>
  <header class="container">
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
      <br />
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
</style>

<script setup lang="ts"></script>
