<template>
  <ul>
    <li
      v-for="post in posts"
      :key="post._path"
    >
      <NuxtLink
        v-if="!post.url"
        :to="post._path"
      >
        <figure
          :class="{ showBg: showing }"
          :style="{ background: post.background }"
        >
          <video
            v-show="!isReducedMotion"
            :poster="post.poster"
            autoplay="autoplay"
            playsinline=""
            loop="loop"
            muted="muted"
          >
            <source :src="post.video" />
          </video>
          <img
            :src="post.poster"
            :alt="post.name"
            v-show="isReducedMotion"
          />
        </figure>

        <article>
          <h6 class="thin">{{ post.kicker }}</h6>
          <h4 class="name">{{ post.name }}</h4>
          <p class="sans caption">{{ post.caption }}</p>
        </article>
      </NuxtLink>

      <a
        v-else
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <figure
          :class="{ showBg: showing }"
          :style="{ background: post.background }"
        >
          <video
            v-show="!isReducedMotion"
            :poster="post.poster"
            autoplay="autoplay"
            playsinline=""
            loop="loop"
            muted="muted"
          >
            <source :src="post.video" />
          </video>
          <img
            :src="post.poster"
            alt="Static Image"
            v-show="isReducedMotion"
          />
        </figure>

        <article>
          <h6 class="thin">{{ post.kicker }}</h6>
          <h4 class="name">
            {{ post.name }}
            <svg
              class="op-5"
              width="10"
              height="10"
              fill="none"
            >
              <path
                fill="var(--color--primary)"
                fill-rule="evenodd"
                d="M.909 10 0 9.093 6.421 2.67c-.33.07-.662.12-.996.152-1.76.17-3.69-.178-4.97-1.458l.908-.909c.902.902 2.38 1.237 3.94 1.087C6.86 1.392 8.317.773 9.09 0L10 .909c-.773.773-1.392 2.23-1.541 3.789-.15 1.56.186 3.037 1.087 3.939l-.909.909c-1.28-1.28-1.627-3.211-1.458-4.97.032-.334.082-.667.151-.996L.91 10Z"
                clip-rule="evenodd"
              />
            </svg>
          </h4>
          <p class="sans caption">{{ post.caption }}</p>
        </article>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  ul {
    padding-bottom: 8rem;
    @include breakpoint(lg) {
      padding: 2rem 0 12.4rem;
    }
  }

  li {
    margin-top: 6.4rem;
    cursor: pointer;
    @include breakpoint(lg) {
      margin-top: 7.2rem;
      width: grid-width(4.25);
    }
    @include breakpoint(xl) {
      width: grid-width(3.5);
    }
  }

  .name {
    position: relative;
    margin: 1.2rem 0;
    border-radius: var(--border-radius--partial);
    width: max-content;
    font-size: clamp(2.4rem, 2.1vw, 2.8rem);
    font-weight: 464;
    @include breakpoint(lg) {
      margin: 1.2rem 0 1rem;
    }
  }

  .name:after {
    @include breakpoint(lg) {
      content: "☼";
      position: absolute;
      top: 0rem;
      left: -3.2rem;
      font-size: 2.2rem;
      color: var(--color--secondary);
      opacity: 0;
    }
  }

  .caption {
    font-size: clamp(1.7rem, 1.26vw, 2.1rem);
    font-weight: 390;
    letter-spacing: -0.15px;
    line-height: 148%;
  }

  figure {
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 42vw;
    height: 100vh;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
    transition: opacity 400ms ease 200ms;
    @include breakpoint(md) {
      display: flex;
    }
  }

  video {
    display: none;
  }

  video,
  img {
    display: inherit;
    border-radius: 12px;
    max-width: 84%;
    max-height: 84%;
    height: auto;
    box-shadow: var(--shadow--md);
  }

  @media (pointer: fine) {
    video {
      display: inherit;
    }

    li:hover {
      figure {
        opacity: 1;
        transition: opacity var(--ease);
      }

      .name {
        background: rgba(0, 0, 0, 0.05);
      }

      .name:after {
        opacity: 1;
      }
    }

    a:focus {
      outline: none;
      .name {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
</style>

<script setup>
  const posts = await queryContent("/work").sort({ key: 1 }).find()
  const showing = ref(false)
  const isReducedMotion = ref(false)

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      isReducedMotion.value = true
    }
  })
</script>
