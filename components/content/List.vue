<template>
  <ul>
    <ContentList>
      <ListItem v-for="post in posts" :key="post._path" :post="post" />
    </ContentList>
  </ul>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  ul {
    padding-bottom: 6.4rem;
    @include breakpoint(lg) {
      padding: 2rem 0 11.2rem;
    }
  }
</style>

<script setup>
  // const posts = ""
  const show = ref(false)
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent("/work").sort({ key: 1 }).find()
  )
</script>
