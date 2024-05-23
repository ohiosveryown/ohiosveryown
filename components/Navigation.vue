<template>
  <nav class="">
    <button role="button" class="theme-trigger">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
      >
        <path
          fill="#000"
          fill-rule="evenodd"
          d="M19.968 10.802c-.264.02-.532.031-.801.031-5.523 0-10-4.477-10-10 0-.27.01-.537.031-.801C4.05.44 0 4.747 0 10c0 5.523 4.477 10 10 10 5.253 0 9.56-4.05 9.968-9.198Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div class="navigation">
      <button role="button" class="sans" @click="menuOpen = !menuOpen">
        <span v-if="menuOpen">Close Menu</span>
        <span v-else>Menu</span>
        <svg
          width="12"
          height="12"
          fill="none"
          :class="[menuOpen ? 'arrow-default' : 'arrow-flipped']"
        >
          <path
            fill="#000"
            fill-rule="evenodd"
            d="M5.444 0h1.112v7.848c.159-.243.331-.478.515-.702C8.043 5.97 9.435 5 11 5v1.111c-1.102 0-2.21.698-3.071 1.743-.862 1.044-1.373 2.311-1.373 3.257H5.444c0-.946-.511-2.213-1.373-3.257C3.21 6.809 2.101 6.11 1 6.11V5c1.565 0 2.957.969 3.929 2.146.184.224.356.459.515.702V0Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <menu class="menu" :class="[menuOpen ? 'opened' : 'closed']">hello</menu>
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

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 100px;
    padding: 1.2rem;
    backdrop-filter: blur(6px);
    font-size: 1.6rem;
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
  }

  svg.arrow-flipped {
    transform: scaleY(-1);
    transform: rotate(0);
  }

  .navigation {
    position: relative;
  }

  .menu {
    --unit: 0.8rem;
    position: fixed;
    top: 0;
    right: var(--unit);
    bottom: 0;
    z-index: var(--z0);
    margin: auto;
    border-radius: 11px;
    border: 0.5px solid rgba(76, 78, 81, 0.16);
    width: 98vw;
    height: calc(100vh - calc(var(--unit) * 2));
    opacity: 1;
    transition: all 300ms ease;
    background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/menu__bg@3x.webp?updatedAt=1716327160174")
      no-repeat center center;
    background-size: cover;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
      0 24px 158px 0px rgba(0, 0, 0, 0.12), 0 6px 34px 0px rgba(0, 0, 0, 0.07),
      0 2px 10px 0px rgba(0, 0, 0, 0.05);

    @include breakpoint(lg) {
      width: 44vw;
    }
  }

  .open {
    opacity: 1;
  }

  .closed {
    opacity: 0;
    pointer-events: none;
  }
</style>

<script setup>
  let menuOpen = ref(false)
</script>
