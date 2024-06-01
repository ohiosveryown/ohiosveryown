<template>
  <dialog ref="dialog">
    <header class="sans">Press tab to cycle pages</header>
    <menu>
      <li
        v-for="post in posts"
        :key="post._path"
      >
        <NuxtLink
          v-if="!post.url"
          :to="post._path"
        >
          <figure class="poster">
            <img
              :src="post.poster"
              alt="Static Image"
            />
          </figure>
          <p>{{ post.name }}</p>
        </NuxtLink>
      </li>
    </menu>
  </dialog>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  dialog {
    position: fixed;
    inset: 0;
    z-index: var(--zmax);
    border-radius: 29px;
    border: none;
    padding: 0.9rem;
    background: rgba(0, 0, 0, 0.04);
    color: var(--color--primary);
    backdrop-filter: blur(16px);
    box-shadow: 0 92px 88px 0 rgba(0, 0, 0, 0.05),
      0 20px 20px 0 rgba(0, 0, 0, 0.03), 0 6px 6px 0 rgba(0, 0, 0, 0.02);
    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  header {
    position: absolute;
    bottom: -3.2rem;
    left: 0;
    right: 0;
    border-radius: var(--border-radius--partial);
    width: max-content;
    margin: 0 auto;
    padding: 0.2rem 0.8rem;
    // margin-bottom: 0.6rem;
    text-align: center;
    color: var(--color--primary);
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    // opacity: 0.8;
  }

  menu {
    display: flex;
    flex-direction: row;
  }

  a:focus {
    display: flex;
    outline: none;
    background: var(--color--quaternary);
    p {
      opacity: 1;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    border-radius: 21px;
    padding: 0.9rem 0.9rem 0.4rem;
  }

  figure {
    display: flex;
    position: relative;
    border-radius: 11px;
    width: 8rem;
    height: 8rem;
    overflow: hidden;
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  p {
    opacity: 0;
    color: var(--color--primary);
    text-align: center;
  }
</style>

<script setup>
  const dialog = ref(null)
  const route = useRoute()
  const posts = await queryContent("").sort({ key: 1 }).find()

  const clickHandler = (event) => {
    if (
      dialog.value &&
      !dialog.value.contains(event.target) &&
      dialog.value.open
    ) {
      dialog.value.close()
    }
  }

  const keydownHandler = (event) => {
    if (event.altKey && event.metaKey) {
      dialog.value.open ? dialog.value.close() : dialog.value.show()
    }

    if (event.key === "Escape" && dialog.value.open) {
      dialog.value.close()
    }

    if (event.key === "Tab" && dialog.value.open) {
      const focusableElements = dialog.value.querySelectorAll(
        '[href], [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  onMounted(() => {
    document.addEventListener("click", clickHandler)
    window.addEventListener("keydown", keydownHandler)
  })

  onUnmounted(() => {
    document.removeEventListener("click", clickHandler)
    window.removeEventListener("keydown", keydownHandler)
  })

  watch(
    () => route.fullPath,
    () => {
      dialog.value.open ? dialog.value.close() : null
    }
  )
</script>
