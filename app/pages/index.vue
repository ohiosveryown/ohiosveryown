<template>
  <div class="container-index">
    <SiteHeader>
      <span class="row">
        I'm
        <span
          class="has-tooltip"
          data-tooltip="Hey there 👋"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
          >Matt</span
        >, a principal designer at
        <span
          class="has-tooltip"
          data-tooltip="$XYZ"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
          >Square</span
        >
        <IconSquare class="icon-square" />
        ,
      </span>
      <span class="row">
        living in always peachy,
        <span
          class="has-tooltip"
          data-tooltip="The city in a forest"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp?updatedAt=1716129844773"
          >Atlanta, Ga</span
        >
        🍑.
      </span>
    </SiteHeader>

    <section class="buttons">
      <a href="#">
        <button
          class="button-adventure has-tooltip"
          data-tooltip="Let the models shape your destiny"
        >
          <span class="sheen" />
          <span class="button-bg" />
          Adventure time
        </button>
      </a>

      <ContactButton />
    </section>

    <LogoPile />

    <WorkList />
  </div>
</template>

<style scoped lang="scss">
  .container-index {
    padding-bottom: 5.6rem;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @include breakpoint(md) {
      margin-top: 4rem;
    }
  }

  .button-adventure {
    position: relative;
    overflow: hidden;
    padding: 1.2rem 1.6rem 1.3rem;
    border-radius: 100px;
    background: linear-gradient(180deg, hsla(0, 0%, 83%, 0.8), #fff);
    box-shadow:
      0 -1px 1px 0 rgba(0, 0, 0, 0.12) inset,
      0 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
      0 20px 18px 0px rgba(0, 0, 0, 0.05),
      0 6px 5px 0px rgba(0, 0, 0, 0.03);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
    cursor: var(--cursor);
  }

  .sheen {
    position: absolute;
    z-index: var(--z2);
    top: 0.5px;
    right: 0;
    left: 0;
    margin: auto;
    width: 88%;
    height: 62%;
    border-radius: 100px;
    background: linear-gradient(
      hsla(0, 0%, 100%, 0.9) 0.42%,
      hsla(0, 0%, 100%, 0)
    );
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  .button-bg {
    position: absolute;
    z-index: var(--z1);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: url(https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721581090/ovo-3.7/global/prim-button-bg_2x_invutl.webp)
      no-repeat 50%;
    background-size: cover;
    filter: brightness(1.1);
    mix-blend-mode: multiply;
    pointer-events: none;
    transition:
      opacity 200ms ease,
      transform 1ms ease 200ms;
  }

  .button-adventure:hover {
    background: transparent;
  }

  .button-adventure:hover .button-bg {
    opacity: 1;
    transform: scale(2.8);
    transition:
      transform 8s ease-out,
      opacity 200ms ease;
  }
</style>

<script setup lang="ts"></script>
