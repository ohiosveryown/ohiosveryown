<template>
  <main class="width debug">
    <h1>Hello</h1>

    <ul class="mt-7">
      <li class="mb-3" v-for="work in works" :key="work.id">
        <h5>{{ work.contribution }}</h5>
        <h4>{{ work.name }}</h4>
        <p>{{ work.excerpt }}</p>
      </li>
    </ul>
  </main>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  li:nth-child(-n+2) { display: none; }

  h1 {
    color: red;
    @include breakpoint(md) { color: blue; }
  }
</style>


<script>
  import { works } from '~/static/works'
  export default {
    head: () => ({
      title: 'ohiosveryown'
    }),
    data: () => ({
      works
    }),
  }
</script>
