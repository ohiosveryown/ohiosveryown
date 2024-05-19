<template>
  <div class="container">
    <BtnPrimary label="Adventure time" />
    <BtnSecondary label="Always learning" />
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    display: none;
    @include breakpoint(lg) {
      display: flex;
      gap: 0.8rem;
    }
  }
</style>

<script setup lang="ts"></script>
