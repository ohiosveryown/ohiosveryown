<template>
  <figure
    @mouseenter= 'Mouseenter(), hover = true'
    @mouseleave= 'Mouseleave(), hover = false'>
    <figcaption>{{ label }}</figcaption>
    <img
      ref= "target"
      :class = "{ hoverClass : hover }"
      :src = "img"
      :alt="label">
  </figure>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  .link { position: relative; }

  figure { display: inline-block; mix-blend-mode: multiply; }

  img {
    --width: 12vw;
    position: absolute;
    top: 6.4rem; left: 50%;
    margin: auto;
    min-width: var(--width);
    width: var(--width); height: auto;
    object-fit: cover;
    transform: translate(-50%,-2.4rem) scale(.2, .8);
    transform-origin: top;
    transition: opacity 300ms ease;
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
  }

  .hoverClass { opacity: 1; }

  @media (pointer: coarse) {
    img { display: none; }
    .link { border-bottom: none; opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    img { transform: translate(-50%,-1.2rem) scale(1); }
  }
</style>


<script>
  export default {
    data: () => ({
      hover: false,
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
      easeValue: 'elastic.out(1,.35)'
    }),

    props: {
      label: { type: String },
      img: { type: String }
    },

    methods: {
      Mouseenter() {
        if (this.prm.matches) {
        } else {
          gsap.to(this.$refs.target, {
            y: '-1.2rem',
            scale: 1,
            ease: this.easeValue,
            duration: 1,
            delay: .08,
          })
        }
      },

      Mouseleave() {
        if (this.prm.matches) {
        } else {
          gsap.to(this.$refs.target, {
            y: '-2.4rem',
            scaleY: .8,
            scaleX: .2,
            ease: this.easeValue,
            duration: .5,
            delay: .15,
          })
        }
      }
    },
    created() {}
  }
</script>
