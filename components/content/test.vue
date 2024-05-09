<template>
  <span>
    <ContentSlot :use="$slots.title" unwrap="p" />
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
    description: {
      type: String,
      default: "Default description",
    },
  })
</script>
