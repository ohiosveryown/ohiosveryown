<template>
  <article class="container">
    <h3>Just a little introduction</h3>
    <p>
      Hi again. Just a reminder in case you didn’t read the first page (who
      reads anymore, anyway?) – my name is
      <span class="tooltip--trigger disable--sm"
        >Matt
        <img
          class="tooltip--thumbnail"
          src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/me@3x.webp"
          alt="Illustration of me"
        />
      </span>
      and I'm presently a staff designer at GitHub 🐙.
    </p>

    <p>
      I spend half my time drawing and explaining boxes; the other half I'm
      trying to confuse myself with code. I also make furniture at
      <a
        href="https://proportional.design"
        target="_blank"
      >
        <span class="tooltip--trigger"
          >proportional.design
          <img
            class="tooltip--thumbnail"
            src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722356453/ovo-3.7/skills/davis-2_2x_b1z03n.png"
            alt="Walnut bench with green upholstery"
          /> </span
      ></a>
      🪑.
    </p>

    <p>
      I designed and built this site to share some of the things I've worked on.
      Enjoy the adventure, and the
      <span class="tooltip--trigger disable--sm"
        >easter eggs
        <img
          class="tooltip--thumbnail"
          src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722356186/ovo-3.7/global/simpsons_f2qj9v.webp"
          alt="Simpsons easter egg"
        />
      </span>
      🥚.
    </p>
    <hr />

    <footer>
      <a
        class="cv plausible-event-name=CV"
        target="_blank"
        href="/pence-cv.pdf"
      >
        <button class="sans">Curriculum vitae</button>
      </a>
      <a
        class="sans link plausible-event-name=GitHub"
        href="https://github.com/ohiosveryown"
        target="_blank"
        >GitHub</a
      >
      <a
        class="sans link plausible-event-name=Twitter"
        href="https://x.com/cmykw_"
        target="_blank"
        >Twitter</a
      >
    </footer>
  </article>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

  hr {
    margin: 4rem 0;
    border: none;
    height: 1px;
    background: var(--color--secondary);
    opacity: 0.24;
  }

  footer {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-weight: 500;
    color: var(--color--primay);
    @include breakpoint(md) {
      gap: 3.2rem;
    }
  }

  footer span {
    opacity: 0.4;
  }

  footer .link {
    opacity: 0.88;
    transition: opacity 300ms ease;
  }

  footer .link:hover {
    opacity: 0.64;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    position: relative;
    border-radius: var(--border-radius--full);
    padding: 1.6rem 2rem;
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 1;
    color: var(--color--primay);
    background: var(--color--tertiary);
    cursor: inherit;
    overflow: hidden;
    transition: opacity 200ms ease;
  }

  button:hover {
    opacity: 0.64;
  }

  .container {
    padding-bottom: 6.4rem;
    @include breakpoint(lg) {
      width: grid-width(6);
      padding-bottom: 9.2rem;
    }

    @include breakpoint(xl) {
      width: grid-width(4.4);
    }
  }

  h3 {
    @include thin;
    padding: 4rem 0 2rem;
    font-size: clamp(1.7rem, 1.1vw, 1.9rem);
    font-weight: 360;
    line-height: 132%;
  }

  p {
    @include sans;
    margin-bottom: 2rem;
    font-size: clamp(1.7rem, 1.32vw, 2.6rem);
    font-weight: 392;
    line-height: 148%;
  }

  p + p {
    margin-bottom: 2.2rem;
  }

  img {
    min-width: 8.8rem;
  }

  span {
    display: inline-block;
    width: max-content;
  }

  span:hover {
    opacity: 1;
    img {
      opacity: 1;
      object-fit: cover;
      transform: translate(-50%, -136%) scale(1);
      transition: all var(--ease);
    }
  }

  .disable--sm {
    opacity: 1;
    &:after {
      opacity: 0;
    }
    @include breakpoint(lg) {
      opacity: 0.64;
      &:after {
        opacity: 1;
      }
    }
  }
</style>

<script setup>
  const showing = ref(false)
</script>
