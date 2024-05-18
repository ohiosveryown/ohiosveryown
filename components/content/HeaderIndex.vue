<template>
  <div class="container">
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
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/gh@3x.png"
        alt="GitHub illustration"
        label="Copilot"
      />
      🐙,
      <br />
      living in always peachy,
      <Tooltip
        trigger="Atlanta, Ga"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta.webp"
        alt="Atlanta illustration"
        label="The city in a forest"
      />
      🍑.
    </h2>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    margin: 3.2rem 0 4rem;
  }
</style>

<script setup lang="ts"></script>
