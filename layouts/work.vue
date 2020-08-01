<template>
  <div>
    <Navigation/>
    <RainbowSm/>
    <nuxt class="work anim--in"/>
  </div>
</template>


<style lang="scss">
  @import '../style/grid.scss';

  .work {
    .wrapper--timeline {
      // border: 3px solid pink;
      display: flex;
      position: absolute;
      left: 0; right: 0;
      overflow: hidden;
      width: 100vw; height: calc(100vh - 83px);
      &.is-draggable { cursor: move; cursor: grab; }
      &.is-dragging { cursor: grabbing; }

      @include breakpoint(mdl) { height: 100vh; }
    }

    ul {
      display: flex;
      width: 100%;
    }

    li {
      // border: 3px solid green;
      position: relative;
      flex: 0 0 auto;
      margin: auto;
      width: 100%; height: 100%;
      overflow-y: scroll;
      opacity: 0;
      transition: all 500ms ease 300ms;
    }

    li.is-selected {
      opacity: 1;
      z-index: 1;
    }

    article { margin-top: 14rem; }
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
          delay: .2,
          duration: .6,
          ease: Power2.easeInOut
        })
      },
    },

    mounted() {
      // entrance
      this.Entrance()

      // embla
      const emblaNode = document.querySelector('.wrapper--timeline')
      const embla = EmblaCarousel(emblaNode, {
        align: 'start',
        // loop: true,
        speed: 10,
        startIndex: 0,
        selectedClass: 'is-selected',
        draggableClass: 'is-draggable',
        draggingClass: 'is-dragging',
      })
    },

    beforeDestroy() {
      // this.Exit()
      const index = document.querySelector('main')
      index.style.cssText = `
        opacity: 0;
        transition: opacity 200ms ease;
      `
    }
  }
</script>
