<template>
  <li>
    <span class="kicker thin">{{ post.kicker }}</span>
    <nuxtLink :to="post._path">
      <header class="name sans">{{ post.name }}</header>
      <p class="caption sans">{{ post.caption }}</p>
    </nuxtLink>

    <figure :class="{ showBg: show }" :style="{ background: post.background }">
      <video
        v-show="!isReducedMotion"
        :poster="post.poster"
        autoplay="autoplay"
        playsinline=""
        loop="loop"
        muted="muted"
      >
        <source :src="post.video" />
      </video>
      <img :src="post.poster" alt="Static Image" v-show="isReducedMotion" />
    </figure>
  </li>
</template>

<style lang="scss" scoped>
  @import "/assets/style/list.scss";
</style>

<script setup>
  defineProps({
    post: Object,
  })

  const show = ref(false)
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent().sort({ key: 1 }).find()
  )

  const isReducedMotion = ref(false)
  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      isReducedMotion.value = true
    }
  })
</script>
