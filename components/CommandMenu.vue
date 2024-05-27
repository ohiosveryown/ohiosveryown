<template>
  <nav ref="menu" :class="[menuOpen ? 'opened' : 'closed']">
    <ul>
      <li tabindex="0">Page 1</li>
      <li tabindex="0">Page 2</li>
      <li tabindex="0">Page 3</li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  nav {
    display: grid;
    place-items: center;
    position: fixed;
    z-index: var(--zmax);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 0.5px solid rgba(0, 0, 0, 0.06);
    border-radius: 29px;
    padding: 0.8rem 1.2rem;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 92px 88px 0 rgba(0, 0, 0, 0.05),
      0 20px 20px 0 rgba(0, 0, 0, 0.03), 0 6px 6px 0 rgba(0, 0, 0, 0.02);

    width: 58.8rem;
    height: 15.6rem;
  }

  ul {
    display: flex;
    justify-content: space-around;
    gap: 0.8rem;
    width: 100%;
  }

  li:focus,
  li:active {
    border: 2px solid red;
  }

  .open {
    opacity: 1;
  }

  .closed {
    opacity: 0;
  }
</style>

<script setup lang="ts">
  const menuOpen = ref(false)
  const route = useRoute()

  const { data: posts } = await useAsyncData("posts", () =>
    queryContent().sort({ key: 1 }).find()
  )

  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        menuOpen.value = false
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.altKey && e.metaKey) {
        menuOpen.value = !menuOpen.value
      }
    })
  })

  onBeforeUnmount(() => {
    menuOpen = ref(false)
  })

  watch(
    () => route.fullPath,
    () => {
      menuOpen.value = false
    }
  )
</script>
