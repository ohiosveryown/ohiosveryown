<template>
  <dialog role="dialog">
    <form method="dialog">
      <button tabindex="0">Button One</button>
      <button tabindex="0">Button Two</button>
      <button tabindex="0">Button Three</button>
    </form>
  </dialog>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  dialog {
    /* display: grid;
    place-items: center; */
    /* position: fixed;
    inset: 0; */
    z-index: var(--zmax);
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0);
  }

  :modal {
    background-color: beige;
    border: 2px solid burlywood;
    border-radius: 5px;

    html:has(&[open]) {
      overflow: hidden;
      scrollbar-gutter: stable;
    }
  }

  button:focus {
    border: 2px solid red;
  }

  .opened {
    opacity: 1;
  }

  .closed {
    opacity: 0;
  }
</style>

<script setup lang="ts">
  onMounted(() => {
    const dialog = document.querySelector("dialog")

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        dialog
        console.log("hide")
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.altKey && e.metaKey) {
        dialog.showModal()
        console.log("showww")
      }
    })
  })
</script>
