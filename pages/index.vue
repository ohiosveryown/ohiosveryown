<template>
  <main class="index width">

    <header class="intro">
      <h1 class="anim--in mb-1 f--cl">
        <span class="matt-trigger">My name is Matt.</span>
        <picture ref='matt' class="matt">
          <source media="(min-width: 1000px)" srcset="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478789/index/matt_qc0qt7.jpg">
          <img src="">
        </picture>
      </h1>
      <ButtonAdventure label = 'Adventure Time'/>
      <h2 class="anim--in f--c">I’m a product designer in Atlanta, Ga. Presently I’m researching
        <span class="system-trigger">design systems</span>

        <picture ref='system' class="system">
          <source media="(min-width: 1000px)" srcset="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478789/index/learning_kacyhm.gif">
          <img src="">
        </picture>
        <span class="hide-sm learning-trigger">& machine learning</span>
        <picture ref='learning' class="learning">
          <source media="(min-width: 1000px)" srcset="https://res.cloudinary.com/da32ufmnf/image/upload/v1596478789/index/learning_kacyhm.gif">
          <img src="">
        </picture>
      </h2>
    </header>

    <section>
      <header class="heavy anim--in work fs--sm f--f uc">
        <h3>case studies</h3>
        <h3 class="op-5">2016 – 2020</h3>
      </header>

      <ul class="anim--in">
        <WorkItem v-for="work in works" :work="work" :key="work.id" />
      </ul>
    </section>

    <Rainbow/>

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  .intro {
    margin: 10.4rem 0 8rem;
    @include breakpoint(md) { margin: 16rem 0 12rem; width: grid-width(10); }
    @include breakpoint(mdl) { width: grid-width(6); }
    h1 { display: inline-flex; font-size: 3.2rem; }
    h2 { font-size: 2.1rem; }
  }

  section {
    @include breakpoint(md) { margin-left: grid-width(1); width: grid-width(8); }
    @include breakpoint(mdl) { margin: 0 0 7.2rem 0; width: grid-width(4.5); }
    @include breakpoint(xl) { margin: 0 0 7.2rem 0; width: grid-width(3.5); }

    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5.6rem;
      @include breakpoint(md) { margin-bottom: 6.4rem; }
    }
  }

  li:first-of-type, li:nth-of-type(2) { display: none; }

  picture {
    width: 200px; height: 176px;
    position: fixed;
    z-index: var(--zmin);
    top: 0; left: 0;
    object-fit: cover;
    transition: 1200ms cubic-bezier(0.075, 0.82, 0.165, 1) all;
    opacity: 0;
    will-change: transform;
  }

  picture:before {
    @include breakpoint(mdl) {
      content: '';
      position: absolute;
      top: 0; right: 0; left: 0; bottom: 0;
      z-index: 1;
      background: rgba(255, 214, 252, 1);
      mix-blend-mode: hard-light;
    }
  }

  img { width: 100%; height: 100%; object-fit: cover; }

  // non-touch styles
  @media(pointer: fine) {
    .matt-trigger:hover ~ picture { opacity: 1; }
    .system-trigger:hover ~ picture { opacity: 1; }
    .learning-trigger:hover ~ picture { opacity: 1; }
    span:hover { text-decoration: underline; }
  }

  .hide-sm {
    display: none;
    @include breakpoint(md) { display: inline-flex; }
  }

</style>


<script>
  import ButtonAdventure from '../components/ButtonAdventure'
  import Rainbow from '../components/Rainbow'
  import WorkItem from '../components/WorkItem'
  import { works } from '../static/works'
  export default {
    components: { ButtonAdventure, Rainbow, WorkItem },

    head: () => ({
      title: 'ovo – home'
    }),

    data() {
      return {
        works
      }
    },

    methods: {
      Entrance() {
        gsap.from('.anim--in', {
          opacity: 0,
          stagger: .075,
          delay: .2,
          duration: .3,
          ease: Power2.easeInOut
        })
      },
    },

    mounted() {
      // entrance
      this.Entrance()

      const matt = document.querySelector('.matt')
      const system = document.querySelector('.system')
      const learning = document.querySelector('.learning')

      document.addEventListener('mousemove', (e) => {
        matt.setAttribute(
          'style',
          `transform: translate(${e.pageX - 100}px, ${e.pageY - 88}px) scale(.88);`
        ),
        system.setAttribute(
          'style',
          `transform: translate(${e.pageX - 100}px, ${e.pageY - 88}px) scale(.88);`
        ),
        learning.setAttribute(
          'style',
          `transform: translate(${e.pageX - 100}px, ${e.pageY - 88}px) scale(.88);`
        )
      })
    },

    beforeDestroy() {
      // this.Exit()
      const index = document.querySelector('.index')
      index.style.cssText = `
        opacity: 0;
        transition: opacity 300ms ease;
      `
    }
  }
</script>
