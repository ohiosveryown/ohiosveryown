<!-- layout -->
<template>
  <div id="ovo">
    <Navigation/>
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
  </div>
</template>


<!-- style -->
<style lang="scss">
  @import './assets/style/mq';

  .fade-enter-active, .fade-leave-active { transition: var(--ease); }
  .fade-enter, .fade-leave-active { opacity: 0; }

</style>


<!-- logic -->
<script>
  import Navigation from '@/components/Navigation.vue'

  export default {
    components: { Navigation },
  }
</script>
