<template>
  <main>

    <header class="intro">
      <h1 class="fs--lg f--c">My name is Matt.</h1>
      <h2 class="fs--md f--g">I’m a product designer living in Atlanta, Ga. Presently I’m researching design systems & machine learning.</h2>
    </header>

    <section>
      <header class="work fs--sm f--f uc">
        <h3>case studies</h3>
        <h3>2016 – 2020</h3>
      </header>
    </section>

    <Item v-for="tweet in tweets" :tweet="tweet" :key="tweet.id" />

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';


</style>


<script>
  import Item from '../components/Item'
  import {tweets} from '../static/tweets'

  export default {

    components: { Item },
    // data: {
    //   tweets
    // }
    data: function() {
      return {
        tweets
      }
    }
  }
</script>