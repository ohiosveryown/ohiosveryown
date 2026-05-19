<template>
  <header class="site-header">
    <div class="greeting">Welcome traveler</div>
    <h1>
      <span class="row">
        I'm
        <span
          class="has-tooltip"
          data-tooltip="Hey there 👋"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
          >Matt</span
        >, a principal designer at
        <span
          class="has-tooltip"
          data-tooltip="$XYZ"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
          >Square</span
        >
        <IconSquare class="icon-square" />
        ,
      </span>
      <span class="row">
        living in always peachy,
        <span
          class="has-tooltip"
          data-tooltip="The city in a forest"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp?updatedAt=1716129844773"
          >Atlanta, Ga</span
        >
        🍑.
      </span>
    </h1>
  </header>
</template>

<style scoped lang="scss">
  .greeting {
    margin-bottom: 1.2rem;
    font-size: clamp(1rem, -0.875rem + 12vw, 6rem);
    font-weight: 360;
    letter-spacing: -0.2rem;
    line-height: 114%;
  }

  h1,
  span {
    font-family: italic, Courier, monospace;
    font-size: clamp(1rem, -0.875rem + 10vw, 4.2rem);
    font-weight: 100;
    line-height: 128%;
    letter-spacing: -0.072rem;
  }

  .row {
    display: block;
  }

  span.has-tooltip {
    color: #7b7b7b;
    text-decoration-thickness: 0.064rem;
    text-decoration-color: currentColor;
    text-underline-offset: 0.8rem;
  }

  span.has-tooltip:hover {
    text-decoration: none;
  }

  .icon-square {
    width: 2.6rem;
    height: 2.6rem;
    margin-left: 1rem;
    transform: translateY(0.1rem);
  }
</style>

<script setup lang="ts"></script>
