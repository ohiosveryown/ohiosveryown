<template>

  <li @mouseenter = 'hover = true' @mouseleave = 'hover = false'>
    <router-link :to = "'/' + work.link">
      <article class="debug">
        {{ work.discipline }}
        {{ work.name }}
        {{ work.excerpt }}
      </article>
      <img :class = "{ active:hover }" :src="work.img" alt="Image">
    </router-link>
  </li>

</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  img {
    width: 10rem;
    opacity: 0.05;
    transition: opacity 400ms ease;
  }

  .active {
    opacity: 1;
    transition: opacity 400ms ease 100ms;
  }

</style>


<script>
  export default {
    props: {
      work: Object
    },

    data: () => ({
      hover: false
    }),
  }
</script>