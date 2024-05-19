<template>
  <ul>
    <li
      @mouseenter="show = true"
      @mouseleave="show = false"
      v-for="post in posts"
      :key="post.id"
    >
      <span class="kicker thin">{{ post.kicker }}</span>
      <nuxtLink :to="post._path">
        <h3 class="name sans">{{ post.name }}</h3>
        <p class="caption sans">{{ post.caption }}</p>
      </nuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

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
    cursor: pointer;
  }

  li:hover {
    .name {
      background: rgba(0, 0, 0, 0.05);
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
    font-weight: 350;
  }
</style>

<script setup>
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent("/work")
      // .sort({ date: -1 })
      // .skip(2)
      .sort({ key: 1 })
      .find()
  )
  const show = ref(false)
</script>
