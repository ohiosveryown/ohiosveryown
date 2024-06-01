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

<style lang="scss" scoped></style>

<script setup lang="ts">
  const posts = await queryContent("/work").sort({ key: 1 }).find()
</script>
