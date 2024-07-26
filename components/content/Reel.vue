<template>
  <figure
    :style="{
      background: backgroundImageValue,
      backgroundSize: 'cover',
      backgroundPositionX: 'center',
      backgroundPositionY: 'bottom',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <video
      controls
      playsinline=""
      loop="loop"
      :src="videoSrc"
    ></video>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  figure {
    display: grid;
    place-items: center;
    flex: 1;
    position: relative;
    margin: 4rem 0 7.2rem;
    border-radius: var(--border-radius--partial);
    padding: 1.8rem;
    @include breakpoint(lg) {
      margin: 8.8rem 0 11.2rem;
      padding: 8rem;
    }
  }

  figcaption {
    position: absolute;
    bottom: -3.2rem;
    left: 0;
    right: 0;
    text-align: center;
    margin: 0 auto;
    @include breakpoint(lg) {
      bottom: -3.4rem;
      font-size: 1.8rem;
      text-align: left;
    }
  }

  video {
    border-radius: var(--border-radius--partial);
    box-shadow: var(--shadow--md);
  }

  .crop {
    padding: 1.8rem 1.8rem 0;
    @include breakpoint(lg) {
      padding: 10rem 10rem 0;
    }
    @include breakpoint(xl) {
      padding: 16rem 16rem 0rem;
    }
    video {
      border-radius: 9px 9px 0 0;
      box-shadow: var(--shadow--md-inverse);
    }
  }
</style>

<script setup>
  const props = defineProps({
    videoSrc: String,
    caption: String,
    backgroundUrl: String,
  })

  const backgroundImageValue = computed(() =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props.backgroundUrl)
      ? props.backgroundUrl
      : `url(${props.backgroundUrl})`
  )
</script>
