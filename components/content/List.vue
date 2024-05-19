<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <span class="kicker thin">{{ post.kicker }}</span>
      <nuxtLink
        :to="post._path"
        @mouseenter="show = true"
        @mouseleave="show = false"
      >
        <h3 class="name sans">{{ post.name }}</h3>
        <p class="caption sans">{{ post.caption }}</p>
      </nuxtLink>

      <figure
        :class="{ showBg: show }"
        :style="{ background: post.background }"
      >
        <video autoplay="autoplay" playsinline="" loop="loop" muted>
          <source :src="post.video" media="all and (min-width: 700px)" />
        </video>
      </figure>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

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

  .showBg {
    opacity: 1;
  }

  /* comment */

  a {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
  }

  ul {
    padding: 0rem 0 6.4rem;
    @include breakpoint(lg) {
      padding-top: 2rem;
    }
  }

  li {
    margin-top: 5.2rem;
    cursor: pointer;
    @include breakpoint(lg) {
      margin-top: 7.2rem;
    }
  }

  a:focus {
    outline: none;
    .name {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  h3,
  p {
    position: relative;
    cursor: pointer;
  }

  h3:after {
    @include breakpoint(lg) {
      content: "☼";
      position: absolute;
      left: -3.2rem;
      margin-left: 0.4rem;
      font-size: 2.2rem;
      margin: 0.4rem 0 0 0.4rem;
      opacity: 0;
    }
  }

  li:hover {
    .name {
      background: rgba(0, 0, 0, 0.05);
    }
    h3:after {
      opacity: 1;
    }
  }

  .kicker {
    font-size: 1.8rem;
    font-size: 1.46vw;
    font-size: clamp(1.7rem, 1.46vw, 2rem);
    color: var(--night);
  }

  .name {
    margin: 0.6rem 0 0.4rem;
    border-radius: 5px;
    width: max-content;
    font-size: clamp(2.4rem, 2.1vw, 2.9rem);
    font-weight: 450;
    @include breakpoint(lg) {
      margin: 1rem 0 0.6rem;
      font-weight: 410;
    }
  }

  .caption {
    font-size: 2rem;
    font-size: 1.25vw;
    font-size: clamp(1.9rem, 1.35vw, 2.3rem);
    font-weight: 372;
  }
</style>

<script setup>
  const show = ref(false)
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent("/work").sort({ key: 1 }).find()
  )
</script>
