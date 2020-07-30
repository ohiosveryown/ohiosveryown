<template>
  <div>
    <Navigation/>
    <nuxt/>
  </div>
</template>


<style lang="scss" scoped>
  // .page-leave-active { transition: opacity var(--animbase) ease; }
</style>


<script>
  import Navigation from '../components/Navigation'

  export default {
    components: { Navigation }
  }
</script>
