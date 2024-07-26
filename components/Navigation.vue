<template>
  <nav @mouseleave="menuOpen = false">
    <NuxtLink
      class="home"
      to="/"
    >
      <svg
        width="20"
        height="20"
        fill="var(--color--primary)"
      >
        <path
          d="M.5 9.015a2.5 2.5 0 0 1 1.03-2.021l7.765-5.648a2.5 2.5 0 0 1 3.001.045l7.234 5.6a2.5 2.5 0 0 1 .97 1.978v8.773a2.5 2.5 0 0 1-2.5 2.5H3a2.5 2.5 0 0 1-2.5-2.5V9.015Z"
        ></path>
      </svg>
    </NuxtLink>

    <button
      @click="menuOpen = !menuOpen"
      :class="[menuOpen ? '' : 'show-hint']"
      class="sans"
    >
      <span
        v-if="menuOpen"
        :style="{ color: '#fff' }"
        >Close Menu ☻</span
      >
      <span v-else>Menu ☺</span>
    </button>

    <ListNav
      :menu-open="menuOpen"
      class="mu"
      :class="[menuOpen ? 'menu-opened' : 'menu-closed']"
    />
  </nav>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

  nav {
    --unit: 4rem;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: var(--unit);
    z-index: var(--zmax);
    margin: var(--unit) auto 0;
    max-width: var(--max-width);
    width: calc(90vw + 2rem);
  }

  .home,
  button {
    display: grid;
    place-items: center;
    border-radius: var(--border-radius--full);
    padding: 1rem 1.2rem 0.8rem;
    padding: 1.2rem;
    backdrop-filter: var(--blur--full);
  }

  svg {
    margin-top: -0.5rem;
    @include breakpoint(lg) {
      margin-top: -0.2rem;
    }
  }

  a,
  svg,
  path {
    cursor: inherit;
  }

  button {
    position: relative;
    font-size: 1.6rem;
    font-weight: 440;
    color: var(--color--primary);
  }

  button.show-hint::before {
    @include thin;
    content: "Hint: press ⌥⌘ for cmd menu";
    position: absolute;
    z-index: var(--zmin);
    left: -20rem;
    opacity: 0;
    transform: translateY(-0.13rem);
  }

  .menu-opened {
    opacity: 1;
  }

  .menu-closed {
    opacity: 0;
    pointer-events: none;
  }

  @media (pointer: fine) {
    .home:hover svg {
      transform: rotate(-4deg);
      transition: var(--ease) all;
    }

    button:hover {
      &:before {
        opacity: 1;
        transform: translateY(-0.15rem);
        transition: opacity var(--ease);
      }
    }
  }
</style>

<script setup>
  const route = useRoute()
  const menuOpen = ref(false)
  const showHint = ref(false)
  const toggleHint = () => {
    showHint.value = !showHint.value
  }

  useHead({
    htmlAttrs: {
      class: computed(() => (menuOpen.value ? "scroll-locked" : "")),
    },
  })

  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      menuOpen.value = e.key === "Escape" ? false : menuOpen.value
    })
  })

  onBeforeUnmount(() => {
    menuOpen.value = false
  })

  watch(
    () => route.fullPath,
    () => {
      menuOpen.value = false
    }
  )
</script>
