<template>
  <main ref="index" class="width">
    <header class="anim--in">
      <h1 class="mb-1 title">My name is Matt 👋🏼</h1>
      <adventure/>
      <h2 class="brow">
        I’m a product designer living in Atlanta, Ga.<br>
        Presently I’m researching
        <subjects/>
      </h2>
    </header>

    <section class="anim--in">
      <header class="caption">
        <h3>Digital Projects ↯</h3>
        <h3>2018—2021</h3>
      </header>

      <ul>
        <list
          v-for="work in works"
          :work="work"
          :key="work.id"
        />
      </ul>
    </section>

    <!-- <rainbow/> -->
  </main>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  li:nth-child(-n+2) { display: none; }
  br { display: none; @include breakpoint(md) { display: inherit; }}

  h1 {
    display: inline-flex;
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 5.6rem;
    @include breakpoint(md) { margin-bottom: 8.8rem; }
  }

  section {
    @include breakpoint(md) { width: grid-width(6.4); }
    @include breakpoint(mdl) { margin: 0 0 7.2rem 0; width: grid-width(6); }
    @include breakpoint(lg) { margin: 0 0 7.2rem 0; width: grid-width(5); }
    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5.6rem;
      width: 100%;
      opacity: .56;
      @include breakpoint(md) { margin-bottom: 6.4rem; width: 64%; font-size: 1.3vw; }
      @include breakpoint(lg) { font-size: 1vw; }
    }
  }
</style>


<script>
  import { works } from '~/static/works'
  import list from '~/components/list'
  import adventure from '~/components/adventure'
  import rainbow from '~/components/rainbow'
  import subjects from '~/components/subjects'
  export default {
    head: () => ({
      title: 'ohiosveryown'
    }),
    data: () => ({
      works,
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    components: { list, rainbow, subjects, adventure },
    methods: {
      Entrance() {
        if (this.prm.matches) {
        } else {
          gsap.from('.anim--in', {
            opacity: 0,
            stagger: .05,
            delay: .2,
            duration: .3,
            ease: Power2.easeInOut
          })
        }
      },
    },
    mounted() {
      this.Entrance()
    },
    beforeDestroy() {
      if (this.prm.matches) {

      } else {
        this.$refs.index.style.cssText = `
          opacity: 0;
          transition: opacity 200ms ease;
        `
      }
    },
  }
</script>
