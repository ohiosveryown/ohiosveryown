<template>
  <menu class="container">
    <BtnPrimary btnLabel="Adventure time" />
    <BtnSecondary btnLabel="Always learning" />
  </menu>
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
