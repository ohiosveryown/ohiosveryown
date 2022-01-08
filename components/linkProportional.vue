<template>
  <li>
    <a
      href="https://twitter.com/cmykw_/status/1479634249124913152"
      target="_blank"
    >
      <article @mouseenter="hover = true" @mouseleave="hover = false">
        <h5 class="caption--sm">Design / Development</h5>
        <h4 class="p project-name">
          proportional.design
          <svg
            width="12"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="m1.525 11.937-1.02-1.02 7.208-7.21c-.37.078-.744.135-1.118.171-1.975.19-4.143-.2-5.58-1.637l1.02-1.02c1.012 1.012 2.671 1.388 4.422 1.22 1.75-.167 3.385-.862 4.253-1.73l1.02 1.02c-.868.868-1.562 2.503-1.73 4.253-.168 1.751.209 3.41 1.22 4.422l-1.02 1.02C8.763 9.99 8.374 7.822 8.563 5.847c.036-.374.093-.748.17-1.118l-7.208 7.209Z"
              fill="#000"
            />
          </svg>
        </h4>
        <p class="caption">
          A twitter thread on how I built the second iteration of my woodworking
          site.
        </p>
      </article>
    </a>

    <figure :class="{ active: hover }" style="background: #272328">
      <img
        src="https://res.cloudinary.com/da32ufmnf/image/upload/v1641656765/ohiosveryown/a7fokwce9f4scj9xpdtz.jpg"
        alt=""
      />
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
