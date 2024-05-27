<template>
  <dialog role="dialog">
    <form method="dialog">
      <!-- <button tabindex="0">Button One</button>
      <button tabindex="0">Button Two</button>
      <button tabindex="0">Button Three</button> -->

      <ul>
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
      </ul>
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
    border: 0.5px solid rgba(0, 0, 0, 0.06);
    border-radius: 29px;
    padding: 0.8rem 1.2rem;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 92px 88px 0 rgba(0, 0, 0, 0.05),
      0 20px 20px 0 rgba(0, 0, 0, 0.03), 0 6px 6px 0 rgba(0, 0, 0, 0.02);

    html:has(&[open]) {
      overflow: hidden;
      scrollbar-gutter: stable;
    }
  }

  ul {
    display: flex;
    gap: 0.8rem;
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

  button:focus {
    border: 2px solid red;
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
      if (e.keyCode == 27) {
        dialog.close()
        console.log("hide")
      }
    })
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.metaKey) {
        dialog.showModal()
        console.log("showww")
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
