<template>
  <div class="container">
    <figure
      :class="{ grid: imgSrcSecondary }"
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
    <!-- optional secondary image -->
    <figure
      v-if="imgSrcSecondary"
      :class="{ grid: imgSrcSecondary }"
      :style="{
        background: backgroundImageValue,
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <img
        :src="imgSrcSecondary"
        :alt="altTextSecondary"
      />
      <figcaption>
        {{ captionSecondary }}
      </figcaption>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    display: flex;
    flex-direction: column;
    gap: grid-width(0.32);
    @include breakpoint(lg) {
      flex-direction: row;
    }

    figure:nth-of-type(2) {
      margin-top: 0;
      @include breakpoint(lg) {
        margin-top: 8.8rem;
      }
    }
  }

  figure {
    display: grid;
    place-items: center;
    flex: 1;
    position: relative;
    margin: 4rem 0 7.2rem;
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

  img {
    pointer-events: none;
    border-radius: var(--border-radius--partial);
    box-shadow: var(--shadow--md);
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

  .grid {
    @include breakpoint(lg) {
      padding: 4rem;
    }
    @include breakpoint(xl) {
      padding: 8rem;
    }
  }
</style>

<script setup>
  const props = defineProps({
    imgSrc: String,
    altText: String,
    caption: String,
    // secondary image
    imgSrcSecondary: String,
    altTextSecondary: String,
    captionSecondary: String,
    // fig bg
    backgroundUrl: String,
  })

  const backgroundImageValue = computed(() =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props.backgroundUrl)
      ? props.backgroundUrl
      : `url(${props.backgroundUrl})`
  )
</script>
