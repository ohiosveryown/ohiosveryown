<template>
  <span :class="[title]">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </span>
</template>

<style scoped>
  span {
    background: pink;
  }
</style>

<script setup>
  defineProps({
    title: {
      type: String,
      default: "Default title",
    },
  })
</script>
