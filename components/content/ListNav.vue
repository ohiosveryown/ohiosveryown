<template>
  <menu ref="menu">
    <div class="overlay-top" />
    <ul>
      <li
        v-for="post in posts"
        :key="post._path"
      >
        <NuxtLink
          :class="{
            'menu-openedd': props.menuOpen,
            'menu-closedd': !props.menuOpen,
          }"
          v-if="!post.url"
          :to="post._path"
        >
          <figure class="poster">
            <img
              :src="post.poster"
              :alt="post.name"
            />
          </figure>
          <article>
            <h5>{{ post.name }}</h5>
            <h6>{{ post.caption }}</h6>
          </article>
        </NuxtLink>
        <a
          :class="{
            'menu-openedd': props.menuOpen,
            'menu-closedd': !props.menuOpen,
          }"
          v-else
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <figure class="poster">
            <img
              :src="post.poster"
              :alt="post.name"
            />
          </figure>
          <article>
            <h5>
              {{ post.name }}
              <svg
                class="op-7"
                width="10"
                height="10"
                fill="none"
              >
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M.909 10 0 9.093 6.421 2.67c-.33.07-.662.12-.996.152-1.76.17-3.69-.178-4.97-1.458l.908-.909c.902.902 2.38 1.237 3.94 1.087C6.86 1.392 8.317.773 9.09 0L10 .909c-.773.773-1.392 2.23-1.541 3.789-.15 1.56.186 3.037 1.087 3.939l-.909.909c-1.28-1.28-1.627-3.211-1.458-4.97.032-.334.082-.667.151-.996L.91 10Z"
                  clip-rule="evenodd"
                />
              </svg>
            </h5>
            <h6>{{ post.caption }}</h6>
          </article>
        </a>
      </li>
      <li class="colophon">
        Background art & images inspired by nature, generated with AI.
      </li>
    </ul>
    <div class="overlay-btm" />
  </menu>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

  .menu-openedd {
    opacity: 1;
    filter: blur(0);
    transition: opacity 250ms ease, filter 250ms ease 150ms;
  }

  .menu-closedd {
    opacity: 0;
    filter: blur(6px);
    transition: all 0;
  }

  menu {
    --unit: 0.8rem;
    position: fixed;
    z-index: var(--z0);
    top: 0;
    right: 50%;
    left: 50%;
    height: 99dvh;
    width: 98vw;
    transform: translateX(-50%);
    border-radius: var(--border-radius--partial);
    background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/menu--bg/menu--bg-light-sm.webp?updatedAt=1717209992015")
      center bottom / cover no-repeat;
    overflow: hidden;
    box-shadow: var(--shadow--sm);
    transition: opacity var(--ease);
    will-change: opacity;

    @media (prefers-color-scheme: dark) {
      background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/menu--bg/menu--bg-dark-sm.webp?updatedAt=1717210044746")
        center bottom / cover no-repeat;
    }

    @include breakpoint(lg) {
      top: 0;
      bottom: 0;
      right: var(--unit);
      left: auto;
      margin: auto;
      max-width: 100rem;
      width: 44vw;
      height: calc(100vh - calc(var(--unit) * 2));
      transform: translateX(0);
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 11.2rem 1.6rem 0;
    height: 100%;
    overflow: scroll;
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
      margin-bottom: 5.6rem;
    }
    @include breakpoint(xl) {
      margin-bottom: 7.2rem;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    cursor: inherit;
    @include breakpoint(lg) {
      align-items: center;
      flex-direction: row;
    }
    @include breakpoint(xl) {
      gap: 3.2rem;
    }
  }

  figure {
    --unit: 7.2rem;
    display: none;
    border-radius: var(--border-radius--partial);
    width: 100%;
    box-shadow: var(--shadow--md);
    overflow: hidden;
    pointer-events: none;
    @include breakpoint(lg) {
      display: flex;
      min-width: var(--unit);
      min-height: var(--unit);
      max-width: var(--unit);
      max-height: var(--unit);
    }
    @include breakpoint(xl) {
      min-width: calc(var(--unit) + 1.6rem);
      min-height: calc(var(--unit) + 1.6rem);
      max-width: calc(var(--unit) + 1.6em);
      max-height: calc(var(--unit) + 1.6rem);
    }
  }

  img {
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  h5,
  h6 {
    color: #fff;
  }

  // project name
  h5 {
    position: relative;
    margin-bottom: 1.2rem;
    border-radius: 3px;
    width: max-content;
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
    @include breakpoint(md) {
      text-decoration: none;
      margin: 1rem 0 0.4rem;
    }
    @include breakpoint(xl) {
      text-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    }
  }

  h5:after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -0.1rem;
    width: 100%;
    height: 1px;
    background: var(--color--primary);
    opacity: 0.5;
    @include breakpoint(lg) {
      content: "☼";
      position: absolute;
      top: -0.5rem;
      right: -2.8rem;
      margin: 0.4rem 0 0 0.4rem;
      width: initial;
      height: initial;
      background: none;
      font-size: 2.2rem;
      opacity: 0;
    }
  }

  // caption / description
  h6 {
    font-weight: 380;
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
    @include breakpoint(xl) {
      text-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
    }
  }

  li:nth-last-child(2) {
    flex: 1;
  }

  .colophon {
    position: relative;
    z-index: var(--zmax);
    @include thin;
    margin: 6.4rem 0 4rem;
    color: #fff;
    text-align: center;
  }

  .overlay-top {
    position: fixed;
    top: 0;
    z-index: var(--zmax);
    width: 100%;
    height: 24%;
    pointer-events: none;
    background: linear-gradient(
      rgba(36, 36, 29, 0.72) 0%,
      rgba(156, 158, 142, 0) 100%
    );
    @include breakpoint(lg) {
      height: 20%;
    }
    @include breakpoint(xl) {
      background: linear-gradient(
        rgba(36, 36, 29, 0.5) 0%,
        rgba(156, 158, 142, 0) 100%
      );
    }
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

  @media (pointer: fine) {
    a:hover {
      h5 {
        background: rgba(0, 0, 0, 0.09);
      }

      h5:after {
        opacity: 1;
      }
    }
  }
</style>

<script setup>
  const posts = await queryContent("").sort({ key: 1 }).find()
  const menu = ref(null)
  const props = defineProps({
    menuOpen: Boolean,
  })

  const keydownHandler = (event) => {
    if (event.key === "Tab" && menu.value.open) {
      const focusableElements = menu.value.querySelectorAll(
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
    window.addEventListener("keydown", keydownHandler)
  })

  onUnmounted(() => {
    window.removeEventListener("keydown", keydownHandler)
  })
</script>
