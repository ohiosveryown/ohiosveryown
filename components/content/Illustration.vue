<template>
  <div class="container">
    <figure
      :class="{ 'second-image-present': secondImgSrc }"
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

    <figure
      v-if="secondImgSrc"
      :class="{ 'second-image-present': secondImgSrc }"
      :style="{
        background: backgroundImageValue,
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <img :src="secondImgSrc" />
      <figcaption>
        {{ captionTwo }}
      </figcaption>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    display: flex;
    gap: grid-width(0.32);
  }

  .second-image-present {
    @include breakpoint(lg) {
      padding: 4rem;
    }
    @include breakpoint(xl) {
      padding: 8rem;
    }
  }

  figure {
    display: grid;
    place-items: center;
    flex: 1;
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
    @include breakpoint(xl) {
    }
  }

  .crop figure {
    padding: 2.8rem 2.8rem 0;
    @include breakpoint(lg) {
      padding: 10rem 10rem 0;
    }
    @include breakpoint(xl) {
      padding: 16rem 16rem 0rem;
    }
    img {
      border-radius: 9px 9px 0 0;
      box-shadow: var(--shadow--md-inverse);
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
    secondImgSrc: String,
    altText: String,
    caption: String,
    captionTwo: String,
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
