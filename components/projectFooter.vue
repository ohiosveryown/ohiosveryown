<template>
  <footer>
    <nuxt-link :to = "link">
      <div
      @mouseenter= 'Mouseenter(), hover = true'
      @mouseleave= 'Mouseleave(), hover = false'>
        <h6 class="brow">Continue:</h6>
        <h4 class="title">{{ name }}</h4>
        <h5 class="caption">{{ excerpt }}</h5>
      </div>
    </nuxt-link>
    <figure>
      <img
        ref="img"
        class="elevation-02"
        :class = "{ whileHovering : hover }"
        :src="src" />
    </figure>
  </footer>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';

  .whileHovering {
    opacity: 1;
    transition: opacity 600ms ease;
  }

  footer {
    display: flex;
    margin: 12rem 0 6rem;
    width: 100%;
    @include breakpoint(md) {
      margin: 8rem 0 12rem;
    }
  }

  img {
    display: none;
    margin-left: 6vw;
    border-radius: 16px;
    width: 30vw; height: auto;
    transform: scale(.85);
    opacity: 0;
    transition: opacity 150ms ease;
  }

  @media (pointer: fine) { img { display: inherit; }}

  h6 {
    margin-bottom: 1.6rem;
    width: max-content;
    @include breakpoint(md) { margin-bottom: 2.4rem; }
  }

  h4 {
    margin-bottom: .8rem;
    width: max-content;
    @include breakpoint(md) { margin-bottom: 1.6rem; }
  }

  h5 {
    max-width: 34ch;
    width: max-content;
    @include breakpoint(md) { max-width: 40ch; }
  }

</style>


<script>
  export default {
    data: () => ({
      hover: false,
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    methods: {
      Mouseenter() {
        if (this.prm.matches) {} else {
          gsap.to(this.$refs.img, {
            scale: 1,
            ease: 'elastic.out(1.25,.3)',
            duration: 1.2,
            delay: .08,
          })
        }
      },
      Mouseleave() {
        if (this.prm.matches) {} else {
          gsap.to(this.$refs.img, {
            scale: .85,
            ease: 'elastic.out(1,.3)',
            duration: 1.2,
          })
        }
      }
    },
    props: {
      name:    { type: String },
      excerpt: { type: String },
      src:     { type: String },
      link:    { type: String }
    }
  }
</script>
