<template>

  <li>
    <nuxt-link :to = "'/' + link">
      <article>
        <h4 class="f--f">{{ name }}</h4>
        <p class="f--c">{{ excerpt }}</p>
      </article>
    </nuxt-link>

    <figure :style = "{ background: background }">
      <img :src="img" alt="">
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

  article {
    margin-right: 2.8rem;

  }

  h4 {
    margin-bottom: .2rem;
    font-size: 1.7rem;
    text-decoration: underline;
    @include breakpoint(md) { font-size: 2.1rem; }
  }

  // hover styles for non-touch
  @media (pointer: fine) { h4 { &:hover { text-decoration: none; }}}

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
    box-shadow: 0px 4px 20px rgba(0,0,0,.1);
    transition: transform 200ms ease;
  }

  .active {
    transform: scale(1.1);
  }

  .cover {
    figure { overflow: hidden; }
    img { width: 100%; height: 100%; object-position: top; }
  }

</style>


<script>
  export default {
    props: [ 'name', 'excerpt', 'img', 'background', 'link' ],
  }
</script>