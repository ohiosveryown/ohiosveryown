<template>
  <div>
    <Navigation/>
    <nuxt/>
  </div>
</template>


<style lang="scss" scoped>
  .page-leave-active { transition: opacity calc(var(--animbase) * 2) ease; }
</style>


<script>
  import Navigation from '../components/Navigation'

  export default {
    components: { Navigation }
  }
  // smooth scroll
  // document.querySelector('body').style = 'height: 100vh;'
  // if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  // } else {
  //   const scrollbar = Scrollbar.init(document.querySelector('body'), {
  //     damping: 0.05,
  //     renderByPixels: true,
  //     continuousScrolling: true,
  //   })
  // }
</script>
