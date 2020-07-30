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
      padding-top: 14rem;
      @include breakpoint(md) { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(5.5); }
    }

    .fs--lg {
      font-size: 2.8rem;
      @include breakpoint(md) { font-size: 3rem; }
    }

    .hero {
      margin: 0 auto;
      padding: 4rem 4rem 0;
      background: var(--mailchimp);
      overflow: hidden;
      @include breakpoint(md) { padding: 8rem 8rem 0; }
      @include breakpoint(mdl) { padding: 12rem 16rem 0; }
      img { box-shadow: 0px 4px 64px rgba(12,0,0,.08); }
    }

  }
</style>


<script>
  import Navigation from '../components/Navigation'

  export default {
    components: { Navigation }
  }
</script>
