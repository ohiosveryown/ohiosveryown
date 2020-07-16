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

    <ul>
      <Item v-for="work in works" :work="work" :key="work.id" />
    </ul>

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';


</style>


<script>
  import Item from '../components/Item'
  import works from '../static/works'

  export default {

    components: { Item },
    // data: {
    //   works
    // }
    data: function() {
      return {
        works
      }
    }
  }
</script>