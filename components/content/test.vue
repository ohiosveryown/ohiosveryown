<template>
  <span>
    <ContentSlot :use="$slots.default" unwrap="p" />
  </span>
</template>

<style scoped>
  span {
    background: pink;
  }
</style>
