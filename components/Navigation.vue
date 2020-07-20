<template>
  <nav class="width">
    <span class="mt-0 op-4 fs--sm f--f uc">ovo / 3.5</span>
    <div class="menu-wrapper">
      <header
        @click = 'isOpen = !isOpen'
      >
        <span class="mt-0 fs--sm f--f uc">Navigation</span>
        <svg :class = "[ isOpen ? 'arrow-opened' : 'arrow-closed' ]" class="mt-00 ml-0" width="12" height="12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.657 6l-4.849 4.849-.808.808L.343 6l.808-.808 4.311 4.31V.933h1.024v8.623l4.363-4.363.808.808z" fill="#000"/></svg>
      </header>

      <div
        class="menu"
        :class = "[ isOpen ? 'menu-opened' : 'menu-closed' ]"
      >
        menuuu
      </div>
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

  .menu-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .menu {
    position: absolute;
    top: 3.2rem; right: -3.2rem;
    padding: 1.6rem;
    width: 42.8rem;
    border-radius: 4px;
    background: #FFFFFF;
    box-shadow: 0px 4px 64px rgba(0,0,0,.12);
    transition: var(--ease);
    opacity: 0;
    transform: translateY(-1rem);
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
  export default {
    data: () => ({
      isOpen: false
    }),
  }
</script>