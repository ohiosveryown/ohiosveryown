<template>

  <li>
    <nuxt-link :to = "'/' + work.link">
      <article>
        <h4 class="mb-0 f--cl">{{ work.name }}</h4>
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
    padding: 2rem 2rem 1.2rem;
    &:hover { img { transform: scale(1.1); }}
    @include breakpoint(md) { padding: 2.4rem 2rem 1.2rem; }
  }

  article { margin: -1.2rem 2.8rem 0 0; }

  h4 {
    font-size: 1.7rem;
    line-height: 1.4;
    @include breakpoint(md) { font-size: 2rem; }
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
    overflow: hidden;
  }

  img {
    width: 80%; height: 60%;
    object-fit: cover;
    object-position: top;
    box-shadow: 0px 4px 20px rgba(0,0,0,.16);
    transition: transform 200ms ease;
  }

  .active { transform: scale(1.1); }

</style>


<script>
  export default {
    props: {
      work: Object
    },
  }
</script>
