<template>

  <li>
    <nuxt-link :to = "'/' + work.link">
      <article @mouseenter = 'hover = true' @mouseleave = 'hover = false'>
        <h5 class="op-5 mb-1 fs--sm f--f uc">{{ work.discipline }}</h5>
        <h4 class="mb-1 fs--md f--g">{{ work.name }}</h4>
        <p class="f--f">{{ work.excerpt }}</p>
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
          media = "all and (min-width: 1000px)"
        />
      </video>
    </figure>
  </li>

</template>


<style lang='scss' scoped>
  @import '../style/grid.scss';

  article {
    display: flex;
    flex-direction: column;
    margin-bottom: 5.6rem;
  }

  h4 {
    position: relative;
    &:hover { text-decoration: underline; }
  }

  h4:before {
    content: "\219D";
    position: absolute;
    top: -.4rem; left: -4.8rem;
    opacity: 0;
    font-size: 4rem;
    line-height: 1;
    transform: translateX(-1rem);
    transition: var(--ease);
    will-change:transform
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 46vw; height: 100vh;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
  }

  video, img {
    max-width: 80%;
    max-height: 80%; height: auto;
    box-shadow: 0px 4px 64px rgba(0,0,0,.2);
  }

  @media (pointer: fine) {
    article:hover h4:before {
      opacity: 1;
      transform: translateX(0);
    }

    .active { opacity: 1; }
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
