<template>
  <dialog :open="open">
    <form method="dialog">
      <slot />
    </form>
  </dialog>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  dialog {
    /* display: grid;
    place-items: center; */
    position: fixed;
    inset: 0;
    z-index: var(--zmax);
  }

  :modal {
    background-color: beige;
    border: 2px solid burlywood;
    border-radius: 5px;
    width: 100vw;
    height: 100vh;

    html:has(&[open]) {
      overflow: hidden;
      scrollbar-gutter: stable;
    }
  }

  .opened {
    opacity: 1;
  }

  .closed {
    opacity: 0;
  }
</style>

<script setup lang="ts">
  const dialog = ref<HTMLDialogElement>()
  const open = ref("open")

  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.altKey && e.metaKey) {
        menuOpen.value = !menuOpen.value
      }
    })
  })
</script>
