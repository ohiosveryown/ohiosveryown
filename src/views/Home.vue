<!-- layout -->
<template>
  <div class="home">
    <h1>This is home...</h1>
  </div>
</template>


<!-- style -->
<style scoped lang="scss">
  @import '../assets/style/mq';
  @import '../assets/style/type';
  h1 { @include breakpoint(mdl) { color: pink; } }
</style>


<!-- logic -->
<script>
  export default {
    name: 'home',
  }
</script>
