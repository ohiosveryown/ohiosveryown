<template>
  <ul>
    <li
      v-for="{ _path: slug, name } in posts"
      :key="slug"
    >
      <NuxtLink :to="slug">{{ name }}</NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  /* Your component styles here */
  .box {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
</style>

<script setup lang="ts">
  const posts = await queryContent("/work").sort({ key: 1 }).find();
</script>
