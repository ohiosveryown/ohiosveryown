<template>
  <div>
    <Navigation/>
    <RainbowSm/>
    <nuxt class="work"/>
  </div>
</template>


<style lang="scss">
  @import '../style/grid.scss';

  .work {
    padding: 11.8rem 0 8rem;

    .process {
      display: flex;
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
      padding: 4rem 4rem 0;
      overflow: hidden;
      @include breakpoint(md)  { margin: 6.4rem auto 0; padding: 8rem 8rem 0; }
      @include breakpoint(mdl) { padding: 12rem 16rem 0; }
      img { box-shadow: 0px 4px 64px rgba(12,0,0,.08); }
    }

    article {
      margin: auto;
      @include breakpoint(md)  { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(7); }
    }

    .img--not-wide {
      margin: auto;
      @include breakpoint(md)  { width: grid-width(9); }
      @include breakpoint(mdl) { width: grid-width(10); }
    }

    .img--shadow {
      padding: 3.2rem 2.8rem;
      box-shadow: 0px 4px 64px rgba(0,0,0,.12);
    }

    p {
      margin-bottom: 1rem;
      font-family: 'Founders', var(--system-ui);
      font-size: 2.2rem;
    }

    p + p { text-indent: 3ch; }
  }
</style>


<script>
  import Navigation from '../components/Navigation'
  import RainbowSm from '../components/RainbowSm'

  export default {
    components: { Navigation, RainbowSm },

    // methods: {
    //   Entrance() {
    //     gsap.from('.anim--in', {
    //       opacity: 0,
    //       stagger: .1,
    //       delay: .2,
    //       duration: .6,
    //       ease: Power2.easeInOut
    //     })
    //   },
    // },

    // mounted() {
    //   // entrance
    //   this.Entrance()

    //   // fade in on scroll / observer
    //   const figure = document.querySelectorAll('.figure')
    //   const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //       if (entry.intersectionRatio > 0) {
    //         entry.target.classList.add('in-view')
    //       } else {
    //         entry.target.classList.remove('in-view')
    //       }
    //     })
    //   }, { rootMargin: '0px 0px -100px' })
    //   figure.forEach(e => { observer.observe(e) })
    // },

    // beforeDestroy() {
    //   // this.Exit()
    //   const index = document.querySelector('main')
    //   index.style.cssText = `
    //     opacity: 0;
    //     transition: opacity 200ms ease;
    //   `
    // }
  }
</script>