<template>
  <menu class="container">
    <ButtonPrimary buttonLabel="Adventure Time" />
    <ButtonSecondary buttonLabel="Always Learning" />
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
