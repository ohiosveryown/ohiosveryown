<template>
  <aside
    class="container"
    @click="handleClick"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <span
      :class="{ 'reveal-fire': revealEmoji.fire }"
      class="fire"
      >🔥</span
    >
    <span
      :class="{ 'reveal-bball': revealEmoji.bball }"
      class="bball"
      >🏀</span
    >
    <span
      :class="{ 'reveal-shoe': revealEmoji.shoe }"
      class="shoe"
      >👟</span
    >
    <span
      :class="{ 'reveal-burger': revealEmoji.burger }"
      class="burger"
      >🍔</span
    >
    <span
      :class="{ 'reveal-art': revealEmoji.art }"
      class="art"
      >🎨</span
    >

    <article>
      <small>In a rush?</small>
      <h4>Use the AI prompt:</h4>
      <h3>Describe Matt using emoji and his photo.</h3>
    </article>
    <figure>
      <span :class="{ 'hovering--span-1': hovering }">🔥</span>
      <span :class="{ 'hovering--span-2': hovering }">🏀</span>
      <span :class="{ 'hovering--span-3': hovering }">👟</span>
      <span :class="{ 'hovering--span-4': hovering }">🎨</span>
      <span :class="{ 'hovering--span-5': hovering }">🍔</span>
      <img
        :class="{ 'hovering--img': hovering }"
        src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/fhd.webp?updatedAt=1718286602997"
        alt="picture of me sitting on a retaining wall."
      />
    </figure>
  </aside>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

  .container {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    position: relative;
    border-radius: var(--border-radius--partial);
    border: 0.5px solid #dcdcdc;
    padding: 2.4rem 1.6rem 1.2rem;
    box-shadow: 0px 60px 105px 0px rgba(0, 0, 0, 0.03),
      0px 13.402px 23.453px 0px rgba(0, 0, 0, 0.02),
      0px 3.99px 6.983px 0px rgba(0, 0, 0, 0.01);
    background: linear-gradient(
      92deg,
      rgba(255, 230, 253, 0.32) 0%,
      rgba(255, 239, 237, 0.32) 98.29%
    );

    @include breakpoint(lg) {
      gap: 0;
      margin-bottom: 3.8rem;
      padding: 3.2rem 2.8rem 2.4rem;
      width: grid-width(6.4);
      box-shadow: none;
    }

    @include breakpoint(xl) {
      width: grid-width(4);
    }
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background: linear-gradient(75deg, #232029 0%, #48314c 98%);
      border: 0.5px solid #2a2a2a;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    transform: translateY(-0.8rem);
  }

  figure {
    position: relative;
    margin-top: -0.4rem;
    width: 9.6rem;
    height: 9.6rem;
    img {
      border-radius: var(--border-radius--partial);
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: rotate(2deg);
      box-shadow: var(--shadow--md);
      overflow: hidden;
      transition: transform 500ms cubic-bezier(0.76, 0, 0.4, 2.4);
    }
    span:nth-of-type(1) {
      position: absolute;
      top: -0.6rem;
      left: -2.4rem;
      font-size: 3rem;
      transform: rotate(-20deg);
      filter: blur(0.75px);
      transition: all 500ms cubic-bezier(0.76, 0, 0.4, 2.4) 50ms;
      @include breakpoint(lg) {
        filter: blur(1px);
      }
    }
    span:nth-of-type(2) {
      position: absolute;
      top: -2rem;
      right: -2rem;
      z-index: var(--z1);
      font-size: 3.6rem;
      filter: drop-shadow(0 0.8rem 0.6rem rgba(0, 0, 0, 0.4));
      transition: all 500ms cubic-bezier(0.76, 0, 0.4, 2.4);
    }
    span:nth-of-type(3) {
      position: absolute;
      top: 3.6rem;
      right: -0.8rem;
      z-index: var(--z1);
      font-size: 3rem;
      transform: rotate(-20deg);
      filter: drop-shadow(0 0.8rem 0.6rem rgba(0, 0, 0, 0.8));
      transition: all 500ms cubic-bezier(0.76, 0, 0.4, 2.4) 65ms;
    }
    span:nth-of-type(4) {
      position: absolute;
      bottom: -2rem;
      right: -1.8rem;
      font-size: 2.6rem;
      filter: blur(0.75px);
      transition: all 500ms cubic-bezier(0.76, 0, 0.4, 2.4);
    }
    span:nth-of-type(5) {
      position: absolute;
      bottom: -1.6rem;
      left: -1.8rem;
      font-size: 2.8rem;
      transform: rotate(-20deg);
      filter: blur(0.75px);
      transition: all 500ms cubic-bezier(0.76, 0, 0.4, 2.4) 65ms;
    }
  }

  h3 {
    @include sans;
    position: relative;
    font-size: clamp(1.6rem, 1.6vw, 2.1rem);
    line-height: 120%;
  }

  h4 {
    @include italic;
    font-size: clamp(1.8rem, 1.7vw, 2.2rem);
    font-weight: 100;
  }

  small {
    @include thin;
    padding: 0 0 0.4rem;
    font-size: clamp(1.7rem, 1.1vw, 1.9rem);
    font-weight: 360;
    line-height: 132%;
  }

  .hovering--img {
    transform: rotate(-3deg) scale(1.14);
  }

  .hovering--span-1 {
    transform: translate(-0.8rem, -1.2rem) rotate(-32deg) scale(1.3) !important;
    opacity: 0;
  }

  .hovering--span-2 {
    transform: translate(0.8rem, -1.2rem) scale(1.3) !important;
    opacity: 0;
  }

  .hovering--span-3 {
    transform: translate(0.8rem, -1.2rem) scale(1.3) !important;
    opacity: 0;
  }

  .hovering--span-4 {
    transform: translate(0.8rem, 1.2rem) scale(1.3) !important;
    opacity: 0;
  }

  .hovering--span-5 {
    transform: translate(-0.8rem, 1.2rem) scale(1.3) !important;
    opacity: 0;
  }

  .fire {
    position: absolute;
    top: 2.2rem;
    right: 5.2rem;
    font-size: 3rem;
    filter: blur(0.75px);
    transform: rotate(-20deg);
    transition: all 1ms ease;
    @include breakpoint(lg) {
      top: 2.2rem;
      right: 8.8rem;
    }
  }

  .bball {
    position: absolute;
    top: 4rem;
    right: 1rem;
    font-size: 2.8rem;
    filter: blur(0.75px);
    transform: rotate(-20deg);
    transition: all 1ms ease;
    @include breakpoint(lg) {
      top: 4rem;
      right: 2.6rem;
    }
  }

  .shoe {
    position: absolute;
    top: 1.8rem;
    right: 2rem;
    font-size: 3rem;
    filter: blur(0.75px);
    transform: rotate(-20deg);
    transition: all 1ms ease;
    @include breakpoint(lg) {
      top: 1.8rem;
      right: 5.2rem;
    }
  }

  .burger {
    position: absolute;
    top: 2.32rem;
    right: 6.4rem;
    font-size: 2.5rem;
    filter: blur(0.75px);
    transform: rotate(-20deg);
    transition: all 1ms ease;
    @include breakpoint(lg) {
      top: 2.32rem;
      right: 7.2rem;
    }
  }

  .art {
    position: absolute;
    top: 4rem;
    right: 4rem;
    font-size: 2.4rem;
    filter: blur(0.75px);
    transform: rotate(-20deg);
    transition: all 1ms ease;
    @include breakpoint(lg) {
      top: 4rem;
      right: 5.6rem;
    }
  }

  .reveal-fire {
    transform: translateY(-8rem) !important;
    opacity: 0;
    transition: transform 600ms ease, opacity 550ms ease;
  }

  .reveal-bball {
    transform: translateY(-8rem) !important;
    opacity: 0;
    transition: transform 600ms ease 50ms, opacity 550ms ease 50ms;
  }

  .reveal-shoe {
    transform: translateY(-8rem) !important;
    opacity: 0;
    transition: transform 600ms ease, opacity 550ms ease;
  }

  .reveal-burger {
    transform: translateY(-8rem) !important;
    opacity: 0;
    transition: transform 600ms ease 150ms, opacity 550ms ease 150ms;
  }

  .reveal-art {
    transform: translateY(-7rem) !important;
    opacity: 0;
    transition: transform 600ms ease 200ms, opacity 550ms ease 200ms;
  }
</style>

<script setup>
  const hovering = ref(false)

  const revealEmoji = reactive({
    fire: false,
    bball: false,
    shoe: false,
    burger: false,
    art: false,
  })

  const handleClick = () => {
    Object.keys(revealEmoji).forEach((key) => {
      revealEmoji[key] = true
      setTimeout(() => (revealEmoji[key] = false), key === "fire" ? 601 : 701)
    })
  }
</script>
