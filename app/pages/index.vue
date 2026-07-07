<template>
  <motion.div
    class="container-index"
    :initial="false"
    :animate="reduceMotion ? undefined : 'visible'"
    :variants="list"
  >
    <motion.div
      :variants="item"
      class="container-index__block"
    >
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
    </motion.div>

    <motion.section
      :variants="item"
      class="actions"
    >
      <ContactButton />

      <a
        class="button-github has-tooltip"
        href="https://github.com/ohiosveryown"
        target="_blank"
        rel="noopener"
        aria-label="ohiosveryown on GitHub"
        data-tooltip="github.com/ohiosveryown"
      >
        GitHub
      </a>
    </motion.section>

    <motion.div
      :variants="item"
      class="container-index__block"
    >
      <LinkColumns />
    </motion.div>

    <motion.div
      :variants="item"
      class="container-index__block"
    >
      <LastPlayed />
    </motion.div>
  </motion.div>
</template>

<style scoped lang="scss">
  .container-index {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 58.6rem;
  }

  .container-index__block {
    width: 100%;
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
    padding: 3.2rem 0 2rem;
  }

  .button-github {
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

  .button-github:hover {
    background: #f7f7f7;
  }
</style>

<script setup lang="ts">
  import { motion } from 'motion-v'

  const reduceMotion = import.meta.client
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const list = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
        duration: 0.55,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, filter: 'blur(1.2rem)' },
    visible: { opacity: 1, filter: 'blur(0)' },
  }
</script>
