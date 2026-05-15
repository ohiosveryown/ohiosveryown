<template>
  <div>
    <h1>Hello World!</h1>
    this is body text...
  </div>
</template>

<style scoped lang="scss">
  h1 {
    @include breakpoint(md) {
      color: red;
    }
  }
</style>
