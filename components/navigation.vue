<template>
  <nav class="width">
    <nuxt-link class="caption--sm" to = '/'>
      ovo / 3.6
    </nuxt-link>

    <section>
      <header
        @click = 'navOpen = !navOpen'
        class="caption--sm pointer">
        Navigation
        <arrow class="arrow" :class = "[ navOpen ? 'arrow-opened' : 'arrow-closed' ]"/>
      </header>

      <ul class="menu">
        <li
          v-for="work in navWorks"
          :key="work.id">
          <div class="copy">
            <div class="name mb-0 caption">{{ work.name }}</div>
            <div class="caption--sm">{{ work.excerpt }}</div>
          </div>
          <figure :style= "{ background: work.background }">
            <img
              :src="work.img"
              :alt="work.img">
          </figure>
        </li>
      </ul>
    </section>
  </nav>
</template>


<style lang='scss' scoped>
  @import '~static/style/grid.scss';

  nav {
    position: sticky;
    top: 2.4rem;
    z-index: var(--zmax);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 2.4rem auto 5.6rem;
    @include breakpoint(md) { margin: 2.4rem auto 8rem; }
  }

  ul {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 3.2rem; right: 0rem;
    height: 70vh;
    overflow: scroll;
    padding: 0 2rem 2rem;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 20px 64px rgba(0,0,0,.28);
    @include breakpoint(mdl) {
      box-shadow: 0 4px 64px rgba(0,0,0,.2);
      right: -1.2vw;
      width: 44vw; height: 72vh;
      padding: 0 2.8rem 2.8rem;
    }
    @include breakpoint(xl) {
      top: 5.6rem;
      width: 36vw; height: 64vh;
    }
  }

  li {
    margin: 2rem 0;
    @include breakpoint(md) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2rem 0;
     }
  }

  li:first-of-type { margin-top: 2.8rem; }
  li:last-of-type { margin-bottom: .8rem; }
  li:hover { img { transform: scale(1.1); }}

  @media (pointer: coarse) {
    li:hover { img { transform: scale(1); }}
  }

  .copy {
    margin-bottom: 1.6rem;
    @include breakpoint(md) {
      margin-bottom: 0;
      width: 72%;
    }
  }

  .name {
    margin-bottom: 1.2rem;
    width: max-content;
    transition: background 200ms ease;
    will-change: background;
    @include breakpoint(md) { margin-bottom: 0; }
  }

  @media(pointer: fine) {
    li:hover .name { background: rgba(0,0,0,.05); }
  }

  @media(pointer: coarse) {
    .name { border-bottom: 1px solid var(--gravity); }
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;
    padding: 2rem;
    @include breakpoint(md) {
      border-radius: 0;
      padding: .8rem;
      width: 10rem; height: auto;
    }
    @include breakpoint(xl) { height: 70%; }
  }

  img {
    border-radius: 8px;
    box-shadow: 0px 4px 20px rgba(0,0,0,.16);
    transition: transform 200ms ease;
    @include breakpoint(md) { object-fit: cover; border-radius: 0; }
  }

  .caption {
    font: normal 4.8vw/1.4 'tomato-grotesk', var(--system-ui);
    @include breakpoint(md) { font-size: 2vw; }
    @include breakpoint(lg) { font-size: 1.5vw; }
  }

  .caption--sm {
    font: normal 4.2vw/1.24 'tomato-grotesk', var(--system-ui);
    @include breakpoint(md) { font-size: 2vw; }
    @include breakpoint(mdl) { font-size: 1.6vw; }
    @include breakpoint(lg) { font-size: 1.2vw; }
    @include breakpoint(xl) { font-size: 1vw; }
  }
  .arrow { transition: transform 300ms ease; }
  .arrow-opened { transform: scaleY(-1) translateY(-.1rem); }
  .arrow-closed { transform: scaleY(1) translateY(.1rem); }
</style>


<script>
  import { works } from '~/static/works'
  import arrow from '~/components/arrow'
  export default {
    data: () => ({
      prm: window.matchMedia('(prefers-reduced-motion: reduce)'),
      navOpen: true,
      works,
    }),
    components: { arrow },
    created() {
      this.navWorks = Array.from(this.works)
      // this.navWorks.splice(0,2)
    },
  }
</script>
