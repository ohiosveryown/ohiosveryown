<template>
  <header class="">
    <h1 class="">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </h1>
    <h2 class="">
      <ContentSlot :use="$slots.subhead" unwrap="p" />
    </h2>
  </header>
</template>

<style lang="scss" scoped>
  header {
    /* display: flex; */
    /* align-items: baseline; */
    /* flex-direction: column; */
    margin: 20px 0;
    font-size: 52px;
    letter-spacing: -0.75px;
  }

  h2 {
    display: flex;
  }
</style>
