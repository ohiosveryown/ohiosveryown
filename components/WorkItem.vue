<template>

  <li>
    <router-link :to = "'/' + work.link">
      <article @mouseenter = 'hover = true' @mouseleave = 'hover = false'>
        <h5 class="mb-00 fs--sm f--f uc">{{ work.discipline }}</h5>
        <h4 class="mb-2 fs--md f--g">{{ work.name }}</h4>
        <p class="f--f">{{ work.excerpt }}</p>
      </article>
      <figure class="debug">
        <img :class = "{ active:hover }" :src="work.img" alt="Image">
      </figure>
    </router-link>
  </li>

</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  article {
    display: flex;
    flex-direction: column;

    @include breakpoint(md) { margin-bottom: 5.6rem; }
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 50vw; height: 100vh;
    object-fit: cover;
    transition: opacity 400ms ease;
  }

  img {
    width: 80%; height: auto;
    opacity: 0.05;
  }

  .active {
    opacity: 1;
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