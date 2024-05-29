<template>
  <dialog role="dialog">
    <form method="dialog">
      <menu>
        <span class="hint sans op-4">Press tab to cycle through pages</span>
        <ContentList>
          <li v-for="post in posts" :key="post._path">
            <NuxtLink :to="post._path">
              <figure class="poster">
                <img :src="post.poster" :alt="post.name" />
              </figure>
              <span class="name sans op-6">{{ post.name }}</span>
            </NuxtLink>
          </li>
        </ContentList>
      </menu>
    </form>
  </dialog>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  dialog::backdrop {
    background: transparent;
  }

  :modal {
    position: fixed;
    inset: 0;
    z-index: var(--zmax);
    border: 0.5px solid rgba(0, 0, 0, 0.08);
    border-radius: 29px;
    padding: 0.8rem 1.2rem;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(20px);
    box-shadow: 0 92px 88px 0 rgba(0, 0, 0, 0.05),
      0 20px 20px 0 rgba(0, 0, 0, 0.03), 0 6px 6px 0 rgba(0, 0, 0, 0.02);

    html:has(&[open]) {
      overflow: hidden;
      scrollbar-gutter: stable;
    }
  }

  .label-hint {
    position: absolute;
    z-index: var(--zmax);
    top: -4rem;
    left: 0;
    color: red;
    opacity: 1;
  }

  menu {
    display: flex;
    gap: 0.8rem;
    postion: relative;
  }

  menu .hint {
    position: absolute;
    right: 0;
    left: 0;
    text-align: center;
    font-size: 1.3rem;
    padding-bottom: 0.8rem;
  }

  li {
    padding-top: 2.4rem;
  }

  li,
  a {
    border-radius: 21px;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1rem 0rem;
  }

  a:focus,
  a:active {
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.08);

    span {
      opacity: 1;
    }
  }

  figure {
    border-radius: 13px;
    width: 8rem;
    height: 8rem;
    overflow: hidden;
  }

  img {
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  span {
    font-size: 1.4rem;
    font-weight: 480;
    padding-bottom: 0.4rem;
  }
</style>

<script setup>
  const route = useRoute()
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent().sort({ key: 1 }).find()
  )
  onMounted(() => {
    const dialog = document.querySelector("dialog")
    document.addEventListener("keydown", (e) => {
      if (e.escKey) {
        dialog.close()
      }
    })
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.metaKey) {
        if (dialog.open) {
          dialog.close()
        } else {
          dialog.showModal()
        }
      }
    })
  })
  onBeforeUnmount(() => {
    const dialog = document.querySelector("dialog")
    dialog.close()
  })
  watch(
    () => route.fullPath,
    () => {
      const dialog = document.querySelector("dialog")
      dialog.close()
    }
  )
</script>
