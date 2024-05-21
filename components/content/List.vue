<template>
  <ul>
    <ListItemLink
      externalLink="https://twitter.com/cmykw_/status/1479634249124913152"
      kicker="Design engineering"
      name="proportional.design"
      caption="A twitter thread on how I built the second iteration of my woodworking
      site."
      poster="https://res.cloudinary.com/da32ufmnf/image/upload/v1641656765/ohiosveryown/a7fokwce9f4scj9xpdtz.jpg"
      video="https://res.cloudinary.com/da32ufmnf/video/upload/v1642203208/ovo-3.6/00_etahea.mp4"
      background="#272328"
    />
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
  const show = ref(false)
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent("/work").sort({ key: 1 }).find()
  )
</script>
