<template>
  <div>
    <Navigation/>
    <nuxt class="work"/>
  </div>
</template>


<style lang="scss">
  @import '../style/grid.scss';

  .work {

    p {
      margin-bottom: 1rem;
      font-family: 'Founders', var(--system-ui);
      font-size: 2.2rem;
    }

    p + p { text-indent: 3ch; }

    .fs--lg {
      font-size: 2.6rem;
      @include breakpoint(md) { font-size: 3rem; }
    }

    .fs--md {
      font-size: 2rem;
      @include breakpoint(md) { font-size: 2.4rem; }
    }

    .title { margin-bottom: 4rem; }

    .meta {
      margin: 0 auto;
      padding-top: 16rem;
      @include breakpoint(md) { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(5.5); }
    }

    .hero {
      margin: 4rem auto 0;
      padding: 4rem 4rem 0;
      background: var(--mailchimp);
      overflow: hidden;

      @include breakpoint(md) { margin: 6.4rem auto 0; padding: 8rem 8rem 0; }
      @include breakpoint(mdl) { padding: 12rem 16rem 0; }

      img { box-shadow: 0px 4px 64px rgba(12,0,0,.08); }
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 4rem auto 8rem;

      @include breakpoint(mdl) { width: grid-width(6); }
    }
  }
</style>


<script>
  import Navigation from '../components/Navigation'

  export default {
    components: { Navigation }
  }
</script>
