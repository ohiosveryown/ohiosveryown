<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  .container {
    background: pink;
    width: grid-width(6);
  }
</style>

<script>
  export default {}
</script>
