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
            src="https://res.cloudinary.com/da32ufmnf/image/upload/v1629742674/ovo-3.6/subjects/thumbnail-prop_lqkcba.jpg"
            alt="Photo of a nightstand"
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
          src="https://res.cloudinary.com/da32ufmnf/image/upload/v1629742815/ovo-3.6/subjects/thumb-easter_wjpekr.gif"
          alt="Simpsons easter egg"
        />
      </span>
      🥚.
    </p>
  </article>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  @import "/assets/style/type.scss";

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
