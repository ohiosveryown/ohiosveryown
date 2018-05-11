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

  .router-link-active { text-decoration: line-through;}

</style>


<!-- logic -->
<script>
  import Navigation from '@/components/Navigation.vue'

  export default {
    components: { Navigation },
  }
</script>
