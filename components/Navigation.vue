<template>
  <nav>
    <NuxtLink class="home" to="/">
      <svg width="20" height="20" fill="none" data-v-0458f5a2="">
        <path
          d="M.5 9.015a2.5 2.5 0 0 1 1.03-2.021l7.765-5.648a2.5 2.5 0 0 1 3.001.045l7.234 5.6a2.5 2.5 0 0 1 .97 1.978v8.773a2.5 2.5 0 0 1-2.5 2.5H3a2.5 2.5 0 0 1-2.5-2.5V9.015Z"
          data-v-0458f5a2=""></path>
      </svg>
    </NuxtLink>

    <span>Menu ☺</span>
  </nav>
</template>

<style lang="scss" scoped>
@import "/assets/style/grid.scss";

nav {
  --unit: 4rem;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: calc(var(--unit) / 2);
  z-index: var(--zmax);
  margin: var(--unit) auto 0;
  max-width: var(--max-width);
  width: calc(90vw + 2rem);
}

.home {
  display: grid;
  place-items: center;
  border-radius: var(--border-radius--full);
  padding: 1rem 1.2rem .8rem;
  padding: 1.2rem;
  backdrop-filter: var(--blur--full);
}

path {
  fill: var(--primary-color);
}

a,
svg,
path {
  cursor: pointer;
}
</style>

<script setup>
</script>
