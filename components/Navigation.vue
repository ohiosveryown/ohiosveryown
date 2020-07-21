<template>
  <nav class="width">
    <span class="mt-0 op-4 fs--sm f--f uc">ovo / 3.5</span>
    <header @click = 'isOpen = !isOpen'>
      <span class="mt-0 fs--sm f--f uc">Navigation</span>
      <svg :class = "[ isOpen ? 'arrow-opened' : 'arrow-closed' ]" class="mt-00 ml-0" width="12" height="12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.444 0h1.112v7.848c.159-.243.331-.478.515-.702C8.043 5.97 9.435 5 11 5v1.111c-1.102 0-2.21.698-3.071 1.743-.862 1.044-1.373 2.311-1.373 3.257H5.444c0-.946-.511-2.213-1.373-3.257C3.21 6.809 2.101 6.11 1 6.11V5c1.565 0 2.957.969 3.929 2.146.184.224.356.459.515.702V0z" fill="#000"/></svg>
    </header>

      <div
        class="menu"
        :class = "[ isOpen ? 'menu-opened' : 'menu-closed' ]"
      >
        <ul>
          <NavigationItem v-for="work in works" :work="work" :key="work.id" />
        </ul>
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
  }

  header { display: flex; cursor: pointer; }

  .menu {
    position: absolute;
    top: 4rem; left: -.8rem; right: 0;
    margin: 0 auto;
    width: 94vw;
    max-height: 53.6rem;
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
      height: 80vh; max-height: 40.8rem;
      box-shadow: 0px 4px 64px rgba(0,0,0,.12);
    }

    @include breakpoint(mdl) {
      right: -2.8rem;
    }
  }

  .menu-opened {
    opacity: 1;
    transform: translateY(0);
  }

  .menu-closed {
    opacity: 0;
    transform: translateY(-1rem);
  }

  svg { transition: transform 300ms ease; }
  .arrow-opened { transform: rotate(-180deg); }
  .arrow-closed { transform: rotate(0deg); }

</style>


<script>
  import works from '../static/works'
  import NavigationItem from './NavigationItem'
  export default {
    components: { NavigationItem },
    data() {
      return {
        works,
        isOpen: false,
      }
    },

    methods: {

    },
  }
</script>