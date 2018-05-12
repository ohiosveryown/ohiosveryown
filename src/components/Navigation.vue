<!-- layout -->
<template>
  <nav class="mt-5 f-basismono">

    <div class="nav__left">
      <router-link class="mr-4 uc op-3" to="/">ovo</router-link>
    </div>

    <div class="nav__right">
      <ul>
        <li class="mt-0 mr-6 uc"><router-link to="/">work</router-link></li>
        <li class="mt-0 uc"><router-link to="/info">info</router-link></li>
      </ul>
    </div>

  </nav>
</template>


<!-- style -->
<style lang="scss" scoped>
  @import '../assets/style/mq';
  @import '../assets/style/type';

  nav {
    display: flex;
    position: absolute;
    top: 3.2rem; right: 0; left: 0;
    z-index: var(--z4);
    margin: auto;
    max-width: var(--max_width);
    width: 88vw;
    font-size: 1.4rem;
    @include breakpoint(md) { top: 5.2rem; }
  }

  .nav__left { flex-grow: 1; }
  .nav__left > a {
    transition: var(--ease);
    // &:hover { font-size: 2.4rem; }
  }

  .nav__right > ul > li > a {
    will-change: -webkit-text-fill-color, text-fill-color;

    @include breakpoint(mdl) {
      &:hover {
        transition: var(--ease);
        background: linear-gradient(90deg, #fc03fa 0%, #1902ea 70%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
      }
    }
  }

</style>


<!-- logic -->
<script>
  export default { name: 'Navigation' }
</script>
