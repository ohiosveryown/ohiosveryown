<template>
  <li :class="project.classs">
    <nuxt-link :to="'/' + project.link">
      <article @mouseenter="hover = true" @mouseleave="hover = false">
        <h5 class="caption--sm">{{ project.contribution }}</h5>
        <h4 class="p project-name">{{ project.name }}</h4>
        <p class="caption">{{ project.excerpt }}</p>
      </article>
    </nuxt-link>

    <figure
      :class="{ active: hover }"
      :style="{ background: project.background }"
    >
      <video
        ref="video"
        :poster="project.img"
        autoplay="autoplay"
        playsinline=""
        loop="loop"
        muted
      >
        <source :src="project.video" media="all and (min-width: 700px)" />
      </video>
    </figure>
  </li>
</template>

<style lang="scss" scoped>
  @import "~static/style/grid.scss";
  li {
    margin-bottom: 6.2rem;
    @include breakpoint(xl) {
      margin-bottom: 9.6rem;
    }
  }

  article {
    display: flex;
    flex-direction: column;
  }

  h5 {
    margin-bottom: 0.6rem;
  }

  h4 {
    position: relative;
    margin-bottom: 0.4rem;
    width: max-content;
    transition: background 200ms ease;
  }

  h4:before {
    display: none;
    content: "\219D";
    position: absolute;
    top: -0.3rem;
    left: -2.8vw;
    opacity: 0;
    font-size: 4rem;
    line-height: 1;
    transform: translateX(-0.8rem);
    transition: transform 200ms ease, opacity 300ms ease;
    will-change: transform, opacity;
    /* @include breakpoint(mdl) { display: inherit; } */
    @include breakpoint(lg) {
      display: inherit;
      top: 0.3rem;
    }
    @include breakpoint(xl) {
      top: 1.4rem;
    }
  }

  @media (pointer: fine) {
    article:hover h4 {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  figure {
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 42vw;
    height: 100vh;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
    @include breakpoint(md) {
      display: flex;
    }
  }

  video {
    display: none;
  }

  @media (pointer: fine) {
    video {
      display: inherit;
    }
  }

  video,
  img {
    display: inherit;
    border-radius: 12px;
    max-width: 84%;
    max-height: 84%;
    height: auto;
    box-shadow: 0 4px 64px rgba(0, 0, 0, 0.32);
  }

  .active {
    opacity: 1;
  }

  @media (pointer: fine) {
    article:hover h4:before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (pointer: coarse) {
    figure {
      display: none;
    }
  }
</style>

<script>
  export default {
    props: {
      project: Object,
    },
    data: () => ({
      hover: false,
      mq: matchMedia("(max-width: 700px)"),
      prm: window.matchMedia("(prefers-reduced-motion: reduce)"),
    }),
    methods: {
      smallVideo: function () {
        if (this.mq.matches) {
          this.$refs.video.src =
            "https://res.cloudinary.com/da32ufmnf/video/upload/v1629475132/ovo-3.6/sm_xenrhs.mp4"
        } else {
        }
      },
      reducedMotion: function () {
        if (this.prm.matches) {
          this.$refs.video.src = ""
        } else {
        }
      },
    },
    mounted() {
      this.smallVideo()
      this.reducedMotion()
    },
  }
</script>
