<template>
  <div class="container-index">
    <SiteHeader>
      Matt is a principal designer at
      <a
        class="square has-tooltip"
        href="https://squareup.com"
        target="_blank"
        rel="noopener"
        data-tooltip="$XYZ"
        data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/loop.gif"
        >Square</a
      >
      living in always peachy, Atlanta, Ga 🍑.
    </SiteHeader>

    <section class="actions">
      <ContactButton />

      <a
        class="button-linkedin"
        href="https://linkedin.com/in/mpence20"
        target="_blank"
        rel="noopener"
      >
        LinkedIn <span class="button-linkedin__muted">(hail corporate)</span>
      </a>
    </section>

    <LinkColumns />

    <LastPlayed
      :title="lastPlayed?.title"
      :artist="lastPlayed?.artist"
      :cover="lastPlayed?.cover"
      :url="lastPlayed?.url"
    />
  </div>
</template>

<style scoped lang="scss">
  .container-index {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 58.6rem;
    padding-bottom: 5.6rem;
  }

  .square {
    text-decoration: underline;
    text-decoration-style: wavy;
    text-decoration-color: #a6a6a6;
    text-decoration-thickness: 0.1rem;
    text-underline-offset: 0.4rem;
    transition: text-decoration-color var(--ease);
  }

  .square:hover {
    text-decoration-color: #7d7d7d;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding-block: 2rem;
  }

  .button-linkedin {
    display: inline-flex;
    align-items: center;
    height: 3.8rem;
    padding: 0 1.7rem;
    border-radius: 200px;
    color: #3d3f44;
    font-size: 1.3rem;
    font-family: var(--system-font);
    font-weight: 500;
    letter-spacing: -0.02rem;
    white-space: nowrap;
    cursor: var(--cursor);
    transition: background var(--ease);
  }

  .button-linkedin:hover {
    background: #f7f7f7;
  }

  .button-linkedin__muted {
    color: rgba(69, 72, 77, 0.5);
  }
</style>

<script setup lang="ts">
  import type { LastPlayed } from '~~/server/api/last-played.get'

  const { data: lastPlayed, refresh } = await useFetch<LastPlayed | null>(
    '/api/last-played',
  )

  onMounted(() => {
    refresh()
  })
</script>
