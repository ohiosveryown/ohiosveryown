<!-- layout -->
<template>
  <div id="ovo">
    <Navigation/>
    <router-view/>
  </div>
</template>


<!-- style -->
<style lang="scss">
  @import './assets/style/mq';

</style>


<!-- logic -->
<script>
  import Navigation from '@/components/Navigation.vue'

  export default {
    components: { Navigation },
  }
</script>
