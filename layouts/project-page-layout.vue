<template>
  <div>
    <navigation/>
    <nuxt/>
    <rainbow class="rainbow--sm"/>
  </div>
</template>


<style lang="scss">
  .rainbow--sm > aside { top: -70vh !important; }
</style>


<script>
  import { projects } from '~/static/projects'
  import navigation from '~/components/navigation'
  import rainbow from '~/components/rainbow'
  export default {
    components: { navigation, rainbow },
  }
</script>
