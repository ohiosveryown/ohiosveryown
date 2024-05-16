<template>
  <div>
    <ul>
      <li
        @mouseenter="show = true"
        @mouseleave="show = false"
        v-for="post in posts"
        :key="post.id"
      >
        <nuxtLink :to="post._path">
          {{ post.title }}
        </nuxtLink>
      </li>
    </ul>

    <div :class="{ showBg: show }" class="bg"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  li {
    margin-bottom: 1.2rem;
    width: max-content;
  }

  .bg {
    position: fixed;
    top: 0;
    right: 0;
    width: 50vw;
    height: 100vh;
    background: pink;
    opacity: 0.2;
  }

  .showBg {
    opacity: 1;
  }
</style>

<script setup lang="ts">
  const { data: posts } = await useAsyncData(
    "posts",
    () =>
      queryContent()
        // .sort({ date: -1 })
        .skip(1)
        .sort({ qty: 1 })
        .find()
    // .sort("createdAt", "asc")
  )

  const show = ref(false)
</script>
