<template>
  <div class="adventure">
    <article
      class="caption"
      :class = "{ active : hover }">
      Let the algorithms decide your fate — clicking here will take you to a random project page
    </article>
    <nuxt-link :to=" '/' + adventureproject.link">
      <button
        ref="button"
        class="uc button--adv"
        @mouseenter= 'Mouseenter(), hover = true'
        @mouseleave= 'Mouseleave(), hover = false'
      >
        <span class="adventure-label">adventure time</span>
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
    transition: opacity 400ms ease, transform 400ms ease;
    @include breakpoint(mdl) { top: -7.4rem; left: 12rem; width: 34ch; font-size: 1.4rem; }
  }

  .active {
    opacity: 1;
    transform: rotate(3deg) translateY(-.2rem);
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
    font-size: 1.3rem;
    background: #3B3838;
    box-shadow: 0 8px 32px rgba(0,0,0,0.32);
    transform: rotate(-6deg) translateY(-1.2rem);
    will-change: transform, opacity;
    transform-origin: center;

    span {
      line-height: 1.3;
      background: linear-gradient(90deg, #FF3EF2 0%, #00C6FF 50%, #00FF14 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>


<script>
  import { projects } from '../static/projects'
  export default {
    data: () => ({
      projects,
      adventureproject: null,
      adventureprojects: null,
      hover: false,
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }),
    methods: {
      Enter() {
        if (this.prm.matches) {} else {
          // gsap.from(this.$refs.button, {
          //   opacity: 0,
          //   scale: .8,
          //   rotate: '-10deg',
          //   duration: 1.2,
          //   delay: 1,
          //   ease: 'elastic.out(1.25,.3)',
          // })
        }
      },
      Mouseenter() {
        if (this.prm.matches) {} else {
          gsap.to(this.$refs.button, {
            scale: 1.15,
            rotate: '-10deg',
            ease: 'elastic.out(1.25,.3)',
            duration: 1.2,
            delay: .08,
          })
        }
      },
      Mouseleave() {
        if (this.prm.matches) {} else {
          gsap.to(this.$refs.button, {
            scale: 1,
            rotate: '-6deg',
            ease: 'elastic.out(1,.3)',
            duration: 1.2,
            delay: .15,
          })
        }
      }
    },
    mounted() {
      this.Enter()
    },
    created() {
      this.adventureprojects = Array.from(this.projects)
      this.adventureprojects.splice(0,2)
      this.adventureproject = this.adventureprojects[~~(Math.random() * this.adventureprojects.length)]
    },
  }
</script>
