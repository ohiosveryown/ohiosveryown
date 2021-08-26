<template>
  <div>
    <navigation/>
    <nuxt/>
    <!-- <rainbow/> -->
  </div>
</template>


<script>
  import navigation from '~/components/navigation'
  import rainbow from '~/components/rainbow'
  export default {
    components: { navigation, rainbow },
  }
</script>
