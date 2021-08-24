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
          {{ work.name }}
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
    top: 3.2rem;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 4px 64px rgba(0,0,0,.2);
  }

  .caption--sm { font-family: 'tomato-grotesk', var(--system-ui); }
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
      this.navWorks.splice(0,2)
    },
  }
</script>
