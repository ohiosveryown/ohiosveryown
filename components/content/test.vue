<template>
  <span>
    <span><slot /></span>
    <span class="trigger">
      <ContentSlot :use="$slots.description" unwrap="p" />
    </span>
    <span class="img">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </span>
    <img :src="src" />
  </span>
</template>

<style scoped>
  .debug {
    border: 2px solid pink;
  }

  .trigger:hover ~ .img {
    opacity: 1;
  }

  .img {
    pointer-events: none;
    opacity: 0.4;
    transition: opacity 300ms ease;
  }
</style>

<script setup>
  defineProps({
    title: {
      type: String,
      default: "Default title",
    },
    description: {
      type: String,
      default: "Default description",
    },
    src: {
      type: String,
    },
  })
</script>
