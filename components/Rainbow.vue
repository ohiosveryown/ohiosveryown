<template>
  <aside class="rainbow">
    <div class="r"></div>
    <div class="o"></div>
    <div class="y"></div>
    <div class="g"></div>
  </aside>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .rainbow {
    position: fixed;
    z-index: var(--zmin);
    top: 0; right: 0; bottom: 0;
    width: 100vw; height: 100vh;
    filter: blur(80px) saturate(1.5);
    @include breakpoint(mdl) { width: 46vw; height: 100vh; }

    // &:hover { cursor: url('../static/img/arrow.svg'), auto; }
  }

  .rainbow > div {
    position: absolute;
    border-radius: 50%;
  }

  .r {
    left: 2%;
    width: 80%; height: 75%;
    background: #f8e1df;
  }

  .o {
    top: 8%; right: 0%;
    width: 60%; height: 60%;
    background: #ffbbfa;
  }

  .y {
    top: 2%; right: -12%;
    width: 60%; height: 60%;
    background: #ffbbfa;
  }

  .g {
    top: 60%; right: 0%;
    width: 60%; height: 30%;
    background: #dfedf1;
  }
</style>


<script>
  export default {

  }
</script>