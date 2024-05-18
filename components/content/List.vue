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
  a {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
  }

  ul {
    padding-bottom: 4rem;
  }

  li {
    margin-top: 6.4rem;
    pointer: initial;
  }

  li:hover {
    .name {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .kicker {
    font-size: 1.8rem;
    color: var(--night);
  }

  .name {
    margin: 0.6rem 0 0.4rem;
    border-radius: 5px;
    width: max-content;
    font-size: 3rem;
    font-weight: 400;
  }

  .caption {
    font-size: 2rem;
    font-weight: 350;
  }
</style>

<script setup>
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent()
      // .sort({ date: -1 })
      .skip(2)
      .sort({ key: 1 })
      .find()
  )
  const show = ref(false)
</script>
