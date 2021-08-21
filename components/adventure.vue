<template>
  <div class="adventure">
    <article
      class="caption"
      :class = "{ active : hover }">
      Let the algorithms decide your fate — clicking here will take you to a random case study
    </article>
    <nuxt-link :to=" '/' + work.link">
      <button
        @mouseenter = 'Mouseenter(), hover = true'
        @mouseleave = 'Mouseleave(), hover = false'
        class="fs--sm f--f uc"
      >
        <span class="">adventure time</span>
      </button>
    </nuxt-link>
  </div>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';

  .adventure {
    display: none;
    position: relative;
    @include breakpoint(mdl) { display: inline-flex; transform: translate(-2rem,2rem); }
  }

  article {
    position: absolute;
    line-height: 1.2;
    transform: rotate(3deg) translateY(.2rem);
    opacity: 0;
    transition: all 400ms ease;
    @include breakpoint(mdl) { top: -7rem; left: 12rem; width: 34ch; font-size: 1.3rem; }
    @include breakpoint(lg) { top: -8rem; left: 14rem; width: 38ch; font-size: 1.6rem; }
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
    padding: 1.6rem 1.8rem;
    border-radius: 3px;
    background: var(--gravity);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    transform: rotate(-6deg) translateY(-1.2rem);
    will-change: transform, box-shadow;
    transition: all 300ms ease;
    transform-origin: center;

    span {
      line-height: 1.3;
      background: linear-gradient(90deg, #FF3EF2 0%, #00C6FF 50%, #00FF14 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  button:hover {
    transform: scale(1.15) translateY(-1.2rem) rotate(-9deg);
    box-shadow: 0 8px 32px rgba(0,0,0,.32);
  }
</style>


<script>
  import { works } from '../static/works'
  export default {
    data() {
      return {
        works,
        work: null,
        hover: false,
      }
    },

    methods: {
      // on page load / mount
      Enter() {
        gsap.from('button', {
          opacity: 0,
          scale: .8,
          rotate: '-10deg',
          duration: 1.8,
          delay: 2,
          ease: 'elastic.out(1,.3)',
        })
      },

      Mouseenter() {
        // const tl = gsap.timeline()
        // tl.to('button', {
        //   scale: 1.15,
        //   boxShadow: '0 8px 32px rgba(0,0,0,0.32)',
        //   rotate: '-6deg',
        //   ease: 'elastic.out(1,.3)',
        //   duration: 1.2,
        // })
      },

      Mouseleave() {
        // const tl = gsap.timeline()
        // tl.to('button', {
        //   scale: .8,
        //   rotate: '-10deg',
        //   boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        //   ease: 'back.out(6)',
        //   duration: .6,
        // })
      }
    },

    mounted() {
      // this.Enter()
    },

    created() {
      this.works.splice(0,2)
      this.work = this.works[~~(Math.random() * this.works.length)]
    },
  }
</script>
