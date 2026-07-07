<template>
  <div class="container-index">
    <div class="container-index__block container-index__part">
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
    </div>

    <section class="actions container-index__part">
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
    </section>

    <div class="container-index__block container-index__part">
      <LinkColumns />
    </div>

    <div class="container-index__block container-index__part">
      <LastPlayed />
    </div>
  </div>
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

  .container-index__part {
    animation: index-enter 0.55s var(--ease-qubic) backwards;

    &:nth-child(1) {
      animation-delay: 0.04s;
    }

    &:nth-child(2) {
      animation-delay: 0.12s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }

    &:nth-child(4) {
      animation-delay: 0.28s;
    }
  }

  @keyframes index-enter {
    from {
      opacity: 0;
      filter: blur(1.2rem);
    }
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
