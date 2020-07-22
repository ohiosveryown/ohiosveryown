<template>
  <nav class="width">
    <nuxt-link to = '/'>
      <span class="mt-0 op-4 fs--sm f--f uc">ovo / 3.5</span>
    </nuxt-link>
    <header @click = 'isOpen = !isOpen'>
      <span class="label mt-0 fs--sm f--f uc">Navigation</span>
      <svg :class = "[ isOpen ? 'arrow-opened' : 'arrow-closed' ]" class="ml-0" width="12" height="12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.444 0h1.112v7.848c.159-.243.331-.478.515-.702C8.043 5.97 9.435 5 11 5v1.111c-1.102 0-2.21.698-3.071 1.743-.862 1.044-1.373 2.311-1.373 3.257H5.444c0-.946-.511-2.213-1.373-3.257C3.21 6.809 2.101 6.11 1 6.11V5c1.565 0 2.957.969 3.929 2.146.184.224.356.459.515.702V0z" fill="#000"/></svg>
    </header>

      <div
        class="menu"
        :class = "[ isOpen ? 'menu-opened' : 'menu-closed' ]"
        @mouseleave = 'isOpen = false'
      >
        <section :class = "[ isOpen ? 'menu-items-opened' : 'menu-items-closed' ]">
          <ul @click = 'isOpen = !isOpen'>

            <HomeAboutItem
              name = 'Home'
              excerpt = 'ovo is the web presence for me, Matthew Pence'
              link = 'test'
              background = '#FFD6FC'
              img = './img/navigation/home.jpg'
            />

            <HomeAboutItem
              name = 'About'
              excerpt = 'I say hello here and share some social links'
              link = 'test'
              background = '#82FFD2'
              img = './img/navigation/matt.jpg'
              class = "cover"
            />

            <NavigationItem v-for="work in works" :work="work" :key="work.id"/>
          </ul>
        </section>

        <!-- sm / touch only -->
        <footer :class = "[ isOpen ? 'footer-opened' : 'footer-closed' ]">
          <ButtonAdventureSm label = 'Adventure Time' />
          <h6 class="f--c">Let the algorithms decide your fate — j/k, clicking this button will take you to a random case study</h6>
        </footer>
      </div>
  </nav>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  nav {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: fixed;
    z-index: var(--zmax);
    top: 3.2rem; right: 0; left: 0;
    margin: 0 auto;
    a { display: inline-flex; }
  }

  header { display: flex; cursor: pointer; }

  @media (pointer: fine) { .label:hover { text-decoration: underline; }}

  .menu {
    position: absolute;
    top: 4.4rem; left: -.8rem; right: 0;
    margin: 0 auto;
    width: 94vw;
    max-height: 44rem;
    max-height: 72vh;
    overflow-y: scroll;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0px 6px 64px rgba(0,0,0,.2);
    transition: var(--ease);
    opacity: 0;
    transform: translateY(-1rem);


    @include breakpoint(md) {
      top: 3.2rem; right: -1.6rem; left: auto;
      width: 48rem;
      height: 80vh; max-height: 44rem;
      box-shadow: 0px 4px 64px rgba(0,0,0,.12);
    }

    @include breakpoint(mdl) { right: -2.8rem; }
  }

  li:last-of-type { padding-bottom: 4rem; }

  .menu-opened {
    pointer-events: inherit;
    opacity: 1;
    transform: translateY(0);
    transform-origin: top;
  }

  .menu-closed {
    pointer-events: none;
    opacity: 0;
    transform: translateY(-1rem) scaleY(.6);
    transform-origin: top;
  }

  .menu-items-opened { opacity: 1; transition: opacity 400ms ease 50ms }
  .menu-items-closed { opacity: 0; transition: opacity 100ms ease 50ms }

  svg { margin-top: .3rem; transition: transform 300ms ease; }
  .arrow-opened { transform: scaleY(-1); }
  .arrow-closed { transform: scaleY(1); }

  footer {
    position: sticky;
    bottom: 0;
    padding: 2.4rem 1.8rem 1.8rem;
    backdrop-filter: blur(18px);
    background: rgba(255,255,255,.3);
    h6 { font-size: 1.2rem; }
    @include breakpoint(md) { display: none; }
  }

  .footer-opened { opacity: 1; transition: opacity 500ms ease 360ms; }
  .footer-closed { opacity: 0; transition: opacity 100ms ease; }

</style>


<script>
  import works from '../static/works'
  import NavigationItem from './NavigationItem'
  import HomeAboutItem from './HomeAboutItem'
  import ButtonAdventureSm from './ButtonAdventureSm'
  export default {
    components: { NavigationItem, HomeAboutItem, ButtonAdventureSm },
    data() {
      return {
        works,
        isOpen: false,
      }
    },

    methods: {
      noScroll() {
        document.documentElement.style.overflow = 'hidden'
      }
    },
  }
</script>