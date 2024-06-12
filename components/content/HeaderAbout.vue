<template>
  <header class="container">
    <h1>Travel guide.</h1>
    <h2>
      ⌨ or 👋's can be sent to:
      <Tooltip
        trigger="matt@ohiosveryown.co"
        img="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/me@3x.webp"
        alt="Illustration of me"
        tooltipLabel=".co, not .com"
      />
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

  h1 {
    margin-bottom: 1.6rem;
    @include breakpoint(md) {
      margin-bottom: 2rem;
    }
  }

  br {
    display: none;
    @include breakpoint(md) {
      display: initial;
    }
  }
</style>

<script setup></script>
