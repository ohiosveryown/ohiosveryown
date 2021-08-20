<template>
  <li>
    <nuxt-link :to = "'/' + work.link">
      <article
        @mouseenter = 'hover = true'
        @mouseleave = 'hover = false'
        >
        <h5 class="caption--sm">{{ work.contribution }}</h5>
        <h4 class="p">{{ work.name }}</h4>
        <p class="caption">{{ work.excerpt }}</p>
      </article>
    </nuxt-link>

    <figure
      :class = "{ active : hover }"
      :style = "{ background: work.background }"
    >
      <video
        :poster = "work.img"
        autoplay = "autoplay"
        playsinline = ""
        loop = "loop"
        muted
      >
        <source
          :src = "work.video"
          media = "all and (min-width: 1100px)"
        />
      </video>
    </figure>
  </li>
</template>


<style lang="scss" scoped>
  @import '~static/style/grid.scss';
  li {
    margin-bottom: 6.2rem;
    @include breakpoint(xl) { margin-bottom: 9.6rem; }
  }

  article {
    display: flex;
    flex-direction: column;
  }

  @media(pointer: fine) {
    article:hover h4 { background: rgba(0,0,0,.05); }
  }

  h5 {
    margin-bottom: .6rem;
  }

  h4 {
    position: relative;
    margin-bottom: .4rem;
    width: max-content;
    transition: background 200ms ease;
  }

  h4:before {
    content: "\219D";
    position: absolute;
    top: -.3rem; left: -2vw;
    opacity: 0;
    font-size: 4rem;
    line-height: 1;
    transform: translateX(-.8rem);
    transition: transform 200ms ease, opacity 300ms ease;
    will-change: transform, opacity;
    @include breakpoint(lg) { top: .3rem; }
    @include breakpoint(xl) { top: 1.4rem; }
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 42vw; height: 100vh;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
  }

  video, img {
    border-radius: 12px;
    /* border: 2px solid rgba(0,0,0,1); */
    max-width: 84%;
    max-height: 84%; height: auto;
    box-shadow: 0 4px 64px rgba(0,0,0,.32);
  }

  .active { opacity: 1; }

  @media (pointer: fine) {
    article:hover h4:before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (pointer: coarse) {
    figure { display: none; }
  }
</style>


<script>
  export default {
    props: {
      work: Object
    },
    data: () => ({
      hover: false,
    }),
  }
</script>
