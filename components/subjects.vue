<template>
  <figure
    class="link"
    @mouseenter= 'Mouseenter(), hover = true'
    @mouseleave= 'Mouseleave(), hover = false'>
    <figcaption>{{ subject.label }}.</figcaption>
    <img
      ref= "target"
      :class = "{ hoverClass : hover }"
      :src = "subject.img"
      :alt="subject.label">
  </figure>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  .link { position: relative; }

  figure { display: inline-block; }

  img {
    --width: 14vw;
    position: absolute;
    top: 6.4rem; left: 50%;
    margin: auto;
    min-width: var(--width);
    width: var(--width); height: auto;
    object-fit: cover;
    transform: translate(-50%,-2.4rem) scale(.2, .8);
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
      easeValue: 'elastic.out(1,.35)',
      subjects: [
        {
          label: "machine learning",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1629727400/ovo-3.6/subjects/machine-learning_q26myx.png",
        },
        {
          label: "design systems",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1629727398/ovo-3.6/subjects/design-systems_hunt47.png",
        },
        {
          label: "Vue 3",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1629727540/ovo-3.6/subjects/vue_qdcweu.png",
        },
        {
          label: "chairmaking",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1634147723/ovo-3.6/subjects/chair_wz3r5u.jpg",
        },
        {
          label: "type design",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1634230091/ovo-3.6/subjects/type-design_xo0u6b.png",
        },
        {
          label: "GLSL",
          img: "https://res.cloudinary.com/da32ufmnf/image/upload/v1636162784/ovo-3.6/subjects/shade_dqrjis.png",
        },
      ],
      subject: ''
    }),
    methods: {
      randomSubject : function() {
        this.subject = this.subjects[~~(Math.random() * this.subjects.length)]
      },

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
    created() {
      this.randomSubject()
    }
  }
</script>
