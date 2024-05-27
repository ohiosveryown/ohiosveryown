<template>
  <dialog role="dialog">
    <form method="dialog">
      <!-- <button tabindex="0">Button One</button>
      <button tabindex="0">Button Two</button>
      <button tabindex="0">Button Three</button> -->

      <ul>
        <ContentList>
          <li v-for="post in posts" :key="post._path" :post="post">
            <NuxtLink :to="post._path">
              <!-- <figure class="poster">
                <img :src="post.poster" alt="Static Image" />
              </figure> -->
              <header class="name sans">{{ post.name }}</header>
            </NuxtLink>
          </li>
        </ContentList>
      </ul>
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

  button:focus {
    border: 2px solid red;
  }
</style>

<script setup lang="ts">
  const { data: posts } = await useAsyncData("posts", () =>
    queryContent().sort({ key: 1 }).find()
  )

  onMounted(() => {
    const dialog = document.querySelector("dialog")

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        dialog
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
</script>
