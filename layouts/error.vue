<template>
  <main ref="index" class="width">
    <header class="anim--in">
      <h1 class="mb-1 title">Looks like you’ve lost your way 🧭</h1>
      <h2 class="brow">Head on <nuxt-link to="/" class="link">back home</nuxt-link>, traveler.</h2>
    </header>
  </main>
</template>

<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  br { display: none; @include breakpoint(md) { display: inherit; }}

  main {
    position: relative;
    z-index: var(--z4);
  }

  h1 {
    display: inline-flex;
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 5.6rem;
    @include breakpoint(md) { margin-bottom: 8.8rem; }
  }
</style>

<script>
  import adventure from '~/components/adventure'
  export default {
    props: ['error'],
    components: { adventure },
//     mounted() {
//       const article = document.querySelector('article')
//       article.style.display = 'none'
//
//       const label = document.querySelector('.adventure-label')
//       label.innerText = 'Adventure'
//     }
  }
</script>
