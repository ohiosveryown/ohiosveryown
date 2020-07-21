<template>

  <li>
    <nuxt-link :to = "'/' + work.link">
      <article>
        <h4 class="f--c">{{ work.name }}</h4>
        <p class="f--c">{{ work.excerptSmall }}</p>
      </article>
    </nuxt-link>

    <figure :style = "{ background: work.background }">
      <img :src="work.img" alt="">
    </figure>
  </li>

</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 2.8rem .8rem;
    padding: 2.8rem 2rem;
  }

  article {
    margin-right: 2.8rem;
  }

  h4 {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    text-decoration: underline;
    @include breakpoint(md) { font-size: 1.8rem; }
  }

  p {
    font-size: 1.3rem;
    line-height: 1.4;
    @include breakpoint(md) { font-size: 1.5rem; }
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    min-width: 25%; width: 25%; height: 8rem;
  }

  img {
    width: 80%; height: 60%;
    object-fit: cover;
  }

</style>


<script>
  export default {
    props: {
      work: Object
    },

    data: () => ({
      // hover: false,
    }),
  }
</script>