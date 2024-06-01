<template>
  <figure :style="{ background: backgroundImageValue }">
    <img
      :src="imgSrc"
      alt=""
    />
    <figcaption></figcaption>
  </figure>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  figure {
    display: grid;
    place-items: center;
    position: relative;
    border-radius: var(--border-radius--partial);
    padding: 2.8rem;
    background-position: center;
    background-size: cover;
    @include breakpoint(lg) {
      padding: 28rem;
    }
  }

  img {
    border-radius: var(--border-radius--partial);
    box-shadow: var(--shadow--md);
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: -1;
  }
</style>

<script setup>
  const props = defineProps({
    imgSrc: String,
    backgroundUrl: String,
  })

  const backgroundImageValue = computed(() => {
    // Check if backgroundUrl is a hex color
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props.backgroundUrl)) {
      return props.backgroundUrl
    } else {
      return `url(${props.backgroundUrl})`
    }
  })
</script>
