<template>
  <header>
    <slot />
    <slot name="description" />
  </header>
</template>

<style scoped>
  header {
    display: flex;
    /* flex-direction: column; */
    margin: 20px 0;
  }
</style>
