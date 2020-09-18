<template>
  <div class="adventure">
    <article
      class="fs--sm f--f"
      :class = "{ active : hover }"
    >
      Let the algorithms decide your fate — j/k, clicking on this button will take you to a random case study
    </article>
    <!-- <nuxt-link to = '/test'> -->
    <nuxt-link :to=" '/' + link">
      <button
        @mouseenter = 'Mouseenter(), hover = true'
        @mouseleave = 'Mouseleave(), hover = false'
        class="fs--sm f--f uc"
      >
        <span>{{ label }}</span>
      </button>
    </nuxt-link>
  </div>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .adventure {
    display: none;
    position: relative;
    will-change: opacity, transform;
    @include breakpoint(md) { display: inline-flex; }
  }

  // don't display on touch devices
  @media (pointer: coarse) { .adventure { display: none; }}

  article {
    position: absolute;
    top: -8rem; left: 11.2rem;
    width: 32rem;
    line-height: 1.2;
    transform: rotate(3deg) translateY(.2rem);
    opacity: 0;
    transition: all 400ms ease;
    @include breakpoint(mdl) { left: 14rem; width: 40rem; }
  }

  .active {
    opacity: 1;
    transform: rotate(3deg) translateY(0);
    transition: opacity 400ms ease 100ms, transform 800ms ease;
  }

  article:before {
    display: inline-block;
    content: '';
    position: absolute;
    left: -6rem;
    width: 4rem; height: 6rem;
    background: url('https://res.cloudinary.com/da32ufmnf/image/upload/v1596478789/index/arrow_yr2uo1.svg') no-repeat;
    background-size: cover;
  }

  button {
    display: inline-flex;
    margin-left: 1.6rem;
    padding: 2rem 1.8rem;
    border-radius: 3px;
    background: var(--gravity);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    transform: rotate(-3deg) translateY(-1.2rem);
    will-change: transform, box-shadow;

    span {
      line-height: 1.3;
      background: linear-gradient(90deg, #FF3EF2 0%, #00C6FF 50%, #00FF14 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>


<script>
  import { links } from '../static/works'
  export default {
    props: [ 'label' ],

    data() {
      return {
        links,
        hover: false,
      }
    },

    methods: {
      // on page load / mount
      Enter() {
        gsap.from('.adventure', {
          opacity: 0,
          scale: .8,
          rotate: '-10deg',
          duration: 1.8,
          delay: 2,
          ease: 'elastic.out(1,.3)',
        })
      },

      Mouseenter() {
        const tl = gsap.timeline()
        tl.to('button', {
          scale: 1.15,
          boxShadow: '0 8px 32px rgba(0,0,0,0.32)',
          rotate: '-6deg',
          ease: 'elastic.out(1,.3)',
          duration: 1.2,
        })
      },

      Mouseleave() {
        const tl = gsap.timeline()
        tl.to('button', {
          scale: 1,
          rotate: '-3deg',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          ease: 'back.out(6)',
          duration: .6,
        })
      }
    },

    mounted() {
      this.Enter()
    },

    created() {
      this.link = this.links[~~(Math.random() * this.links.length)]
    },
  }
</script>
