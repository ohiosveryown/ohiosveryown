<template>
  <div>
    <Navigation/>
    <RainbowSm/>
    <nuxt class="detail"/>
  </div>
</template>


<style lang="scss">
  @import '../style/grid.scss';

  .detail {

    section { padding-bottom: 6vw; }
    article { padding-bottom: 4vw; }

    padding: 11.8rem 0 8rem;

    ul.process {
      display: none;
      width: 100%;
      @include breakpoint(md) { display: flex; }
      * { margin-right: 2.4rem; opacity: .4; }
      li:first-of-type { margin-right: .8rem; opacity: 1; }
      span { margin-right: 0; }
      span, svg, path { opacity: 1; }
    }

    .case-header {
      @include breakpoint(md)  { width: grid-width(10); }
      @include breakpoint(mdl) { max-width: 66rem; width: grid-width(7); }
    }

    .img--hero {
      margin: 4rem auto 0;
      padding: 3.2rem 3.2rem 0;
      overflow: hidden;
      @include breakpoint(md)  { margin: 6.4rem auto 0; }
      @include breakpoint(mdl) { padding: 8rem 8rem 0; }
      @include breakpoint(xl)  { padding: 12rem 16rem 0; }
      img { box-shadow: 0px 4px 64px rgba(12,0,0,.08); }
    }

    article {
      margin: auto;
      @include breakpoint(md)  { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(7); }
    }

    .not-wide {
      margin: auto;
      @include breakpoint(md)  { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(10); }
    }

    .img--not-wide {
      margin: auto;
      @include breakpoint(md)  { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(10); }
    }

    .img--w-bg {
      padding: 4rem;
      @include breakpoint(md)  { padding: 6.4rem; }
      @include breakpoint(mdl) { padding: 11.2rem; }
    }

    .img--shadow {
      padding: 3.2rem 2.8rem;
      box-shadow: 0 4px 64px rgba(0,0,0,.12);
    }

    p {
      margin-bottom: 1rem;
      font-family: 'Founders', var(--system-ui);
      font-size: 2.2rem;
    }

    p + p { text-indent: 3ch; }

    @media(pointer: fine) {
      ul.process > li:first-of-type {
        &:hover { text-decoration: none; cursor: inherit; }
      }
      ul.process > li {
        &:hover { opacity: 1; text-decoration: underline; cursor: pointer; }
      }
    }
  }

  figcaption {
    text-align: center !important;
    @include breakpoint(mdl) { text-align: right !important; }
  }
</style>


<script>
  import Navigation from '../components/Navigation'
  import RainbowSm from '../components/RainbowSm'

  export default {
    components: { Navigation, RainbowSm },

    methods: {
      Entrance() {
        gsap.from('.anim--in', {
          opacity: 0,
          stagger: .1,
          // delay: .2,
          duration: .5,
          ease: Power2.easeInOut
        })
      },
    },

    mounted() {
      // entrance
      this.Entrance()
    },

    beforeDestroy() {
      // this.Exit()
      const index = document.querySelector('.detail')
      index.style.cssText = `
        opacity: 0;
        transition: opacity 300ms ease;
      `
    }
  }
</script>
