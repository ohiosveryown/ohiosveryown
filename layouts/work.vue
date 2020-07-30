<template>
  <div>
    <Navigation/>
    <nuxt class="work"/>
  </div>
</template>


<style lang="scss">
  @import '../style/grid.scss';

  .work {

    .meta {
      margin: 0 auto;
      padding-top: 11.2rem;
      @include breakpoint(md) { width: grid-width(5.5); }
    }

  }
</style>


<script>
  import Navigation from '../components/Navigation'

  export default {
    components: { Navigation }
  }
</script>
