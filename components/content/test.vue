<template>
  <span>
    <span><slot /></span>
    <span class="trigger">
      <slot unwrap="p" name="description" />
    </span>
    <span class="img">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </span>
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
  })
</script>
