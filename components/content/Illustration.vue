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
    <img
      :src="imgSrc"
      :alt="altText"
    />
    <figcaption>
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  figure {
    display: grid;
    place-items: center;
    position: relative;
    margin: 4.8rem 0 7.2rem;
    border-radius: var(--border-radius--partial);
    padding: 2.8rem;
    @include breakpoint(lg) {
      margin: 8.8rem 0 11.2rem;
      padding: 30rem;
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

  .crop {
    padding: 2.8rem 2.8rem 0;
    @include breakpoint(lg) {
      padding: 10rem 10rem 0;
    }
    img {
      border-radius: 9px 9px 0 0;
      mask-image: linear-gradient(
        180deg,
        #000 100%,
        rgba(217, 217, 217, 0) 100%
      );
    }
  }

  img {
    border-radius: var(--border-radius--partial);
    box-shadow: var(--shadow--md);
  }
</style>

<script setup>
  const props = defineProps({
    imgSrc: String,
    altText: String,
    caption: String,
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
