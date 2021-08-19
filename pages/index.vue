<template>
  <main class="width">

    <h1 class="mt-5 mb-5">Hello World v3.5</h1>

    <ul>
      <li class="mb-3" v-for="work in works" :key="work.id">
        <h5>{{ work.contribution }}</h5>
        <h4>{{ work.name }}</h4>
        <p>{{ work.excerpt }}</p>
      </li>
    </ul>

  </main>
</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';
  li:nth-child(-n+2) { display: none; }
</style>


<script>
  import { works } from '../static/works'
  export default {
    head: () => ({
      title: 'ohiosveryown'
    }),
    data: () => ({
      works
    }),
  }
</script>
