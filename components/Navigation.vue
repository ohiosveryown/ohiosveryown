<template>
  <nav>
    <NuxtLink to="/" class="home-link">
      <svg width="20" height="20" fill="none">
        <path
          fill="#000"
          d="M.5 9.015a2.5 2.5 0 0 1 1.03-2.021l7.765-5.648a2.5 2.5 0 0 1 3.001.045l7.234 5.6a2.5 2.5 0 0 1 .97 1.978v8.773a2.5 2.5 0 0 1-2.5 2.5H3a2.5 2.5 0 0 1-2.5-2.5V9.015Z"
        />
      </svg>
    </NuxtLink>

    <div @mouseleave="menuOpen = false" class="navigation">
      <button
        role="button"
        class="menu-trigger sans"
        @click="menuOpen = !menuOpen"
      >
        <span v-if="menuOpen" class="cloud">Close Menu ☻</span>
        <span v-else class="gravity">Menu ☺</span>
        <!-- <svg
          width="12"
          height="12"
          fill="none"
          class="arrow"
          :class="[menuOpen ? 'arrow-default' : 'arrow-flipped']"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M5.444 0h1.112v7.848c.159-.243.331-.478.515-.702C8.043 5.97 9.435 5 11 5v1.111c-1.102 0-2.21.698-3.071 1.743-.862 1.044-1.373 2.311-1.373 3.257H5.444c0-.946-.511-2.213-1.373-3.257C3.21 6.809 2.101 6.11 1 6.11V5c1.565 0 2.957.969 3.929 2.146.184.224.356.459.515.702V0Z"
            clip-rule="evenodd"
          />
        </svg> -->
      </button>

      <menu ref="menu" class="menu" :class="[menuOpen ? 'opened' : 'closed']">
        <div class="overlay-top" />
        <main>
          <ContentList>
            <ul>
              <li v-for="post in posts" :key="post._path" :post="post">
                <NuxtLink :to="post._path">
                  <figure class="poster">
                    <img :src="post.poster" alt="Static Image" />
                  </figure>
                  <article>
                    <header class="name sans">{{ post.name }}</header>
                    <p class="caption sans">{{ post.caption }}</p>
                  </article>
                </NuxtLink>
              </li>
            </ul>
          </ContentList>
        </main>
        <div class="overlay-btm" />
      </menu>
    </div>
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

  button,
  .home-link {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 100px;
    padding: 1.2rem;
    backdrop-filter: blur(6px);
    font-size: 1.6rem;
    svg,
    path,
    span {
      cursor: pointer;
    }
  }

  svg {
    cursor: pointer;
    transition: 260ms ease transform;
  }

  svg.arrow-default {
    transform: scaleY(1);
    transform: rotate(-180deg);
    path {
      fill: var(--cloud);
    }
  }

  svg.arrow-flipped {
    transform: scaleY(-1);
    transform: rotate(0);
    path {
      fill: var(--gravity);
    }
  }

  .navigation {
    position: relative;
  }

  .menu {
    --unit: 0.8rem;
    position: fixed;
    top: var(--unit);
    right: 50%;
    left: 50%;
    z-index: var(--z0);
    transform: translateX(-50%);
    margin: 0 auto;
    border-radius: 11px;
    border: 0.5px solid rgba(76, 78, 81, 0.16);
    width: 98vw;
    height: calc(100vh - 1px);
    color: var(--cloud);
    opacity: 1;
    overflow: hidden;
    transition: opacity 200ms ease, filter 260ms ease;
    background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/menu__bg5@3x.webp?updatedAt=1716564664543")
      no-repeat center center;
    background-size: cover;
    will-change: opacity;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
      0 24px 158px 0px rgba(0, 0, 0, 0.12), 0 6px 34px 0px rgba(0, 0, 0, 0.07),
      0 2px 10px 0px rgba(0, 0, 0, 0.05);

    @include breakpoint(lg) {
      top: 0;
      right: var(--unit);
      bottom: 0;
      left: auto;
      margin: auto;
      max-width: 100rem;
      width: 44vw;
      height: calc(100vh - calc(var(--unit) * 2));
      transform: translateX(0);
    }
  }

  .overlay-top {
    position: fixed;
    top: 0;
    z-index: var(--zmax);
    width: 100%;
    height: 20%;
    background: linear-gradient(
      rgba(36, 36, 29, 0.5) 0%,
      rgba(156, 158, 142, 0) 100%
    );
    pointer-events: none;
  }

  .overlay-btm {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 18%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.96) 100%
    );
    pointer-events: none;
  }

  .opened {
    opacity: 1;
  }

  .closed {
    opacity: 0;
    pointer-events: none;
  }

  main {
    padding: 11.2rem 1.6rem 8rem;
    height: 100%;
    overflow-y: scroll;
    @include breakpoint(lg) {
      padding-left: 3.2rem;
      padding-right: 7.2rem;
    }
    @include breakpoint(xl) {
      padding-left: 7.2rem;
      padding-right: 7.2rem;
    }
  }

  li {
    margin-bottom: 4rem;
    @include breakpoint(lg) {
      margin-bottom: 4.8rem;
    }
    @include breakpoint(xl) {
      margin-bottom: 5.6rem;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @include breakpoint(lg) {
      align-items: center;
      flex-direction: row;
    }
    @include breakpoint(xl) {
      gap: 3.2rem;
    }
  }

  @media (pointer: fine) {
    a:hover {
      .name {
        background: rgba(0, 0, 0, 0.09);
      }

      .name:after {
        opacity: 1;
      }
    }
  }

  .name {
    position: relative;
    margin-bottom: 0.4rem;
    border-radius: 3px;
    width: max-content;
    font-size: clamp(2rem, 1.6vw, 2.9rem);
    font-weight: 480;
    letter-spacing: -0.15px;
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
    text-decoration: underline;
    @include breakpoint(md) {
      text-decoration: none;
      margin: 1rem 0 0.2rem;
    }
    @include breakpoint(xl) {
      text-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    }
  }

  .name:after {
    @include breakpoint(lg) {
      content: "☼";
      position: absolute;
      top: -0.25rem;
      right: -2.8rem;
      font-size: 2.2rem;
      margin: 0.4rem 0 0 0.4rem;
      opacity: 0;
    }

    @include breakpoint(xl) {
      top: 0.1rem;
    }
  }

  .caption {
    font-size: clamp(1.7rem, 1.1vw, 2.3rem);
    font-weight: 380;
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
    @include breakpoint(xl) {
      text-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    }
  }

  .menu-trigger {
    margin-top: 0.6rem;
    @include breakpoint(lg) {
      margin-top: 0rem;
    }
  }

  .poster {
    --unit: 7.2rem;
    display: none;
    border-radius: 7px;
    width: 100%;
    /* box-shadow: var(--elevation-x0); */
    overflow: hidden;
    @include breakpoint(lg) {
      display: flex;
      min-width: var(--unit);
      min-height: var(--unit);
      max-width: var(--unit);
      max-height: var(--unit);
    }

    @include breakpoint(xl) {
      min-width: calc(var(--unit) + 2.4rem);
      min-height: calc(var(--unit) + 2.4rem);
      max-width: calc(var(--unit) + 2.4em);
      max-height: calc(var(--unit) + 2.4rem);
    }

    img {
      min-width: 100%;
      min-height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      object-position: left top;
    }
  }

  /* li,
  a,
  header,
  p {
    cursor: pointer;
  } */
</style>

<script setup lang="ts">
  let menuOpen = ref(false)
  const menu = ref(null)
  const route = useRoute()

  useHead({
    htmlAttrs: {
      class: computed(() => {
        if (menuOpen.value) return "locked"
        return ""
      }),
    },
  })

  const { data: posts } = await useAsyncData("posts", () =>
    queryContent().sort({ key: 1 }).find()
  )

  onMounted(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        menuOpen.value = false
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
