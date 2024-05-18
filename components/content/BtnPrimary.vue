<template>
  <button role="button" @mouseenter="show = true" @mouseleave="show = false">
    <span class="sheen" />
    <span class="bg" />
    {{ label }}
  </button>

  <span ref="label" :class="{ showLabel: show }" class="label">
    Let algorithms shape your destiny
  </span>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  button {
    position: relative;
    border-radius: 200px;
    background: linear-gradient(180deg, rgba(211, 211, 211, 0.8) 0%, #fff 100%);
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.12) inset,
      0 1px 1px 0 rgba(0, 0, 0, 0.05) inset, 0 20px 18px 0px rgba(0, 0, 0, 0.05),
      0 6px 5px 0px rgba(0, 0, 0, 0.03);

    padding: 1.2rem 1.6rem 1.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
    text-shadow: 0 1.3px 0 rgba(185, 224, 253, 0.4);
    overflow: hidden;
    transition: scale 300ms ease;
  }

  button:hover {
    background: none;

    .bg {
      opacity: 1;
      transform: scale(2);
      transition: opacity 300ms ease, transform 18s ease;
    }
  }

  button:active {
    transform: scale(0.98);
  }

  button:focus {
    outline: 1px solid rgba(0, 0, 0, 0.4);
  }

  .sheen {
    position: absolute;
    z-index: var(--z1);
    top: 0.5px;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 100px;
    width: 88%;
    height: 62%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.9) 0.42%,
      rgba(255, 255, 255, 0)
    );
    pointer-events: none;
  }

  .bg {
    position: absolute;
    z-index: var(--z0);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/button-bg@3x.webp?updatedAt=1715451138367")
      no-repeat center center;
    background-size: cover;
    opacity: 0;
    transition: transform 1ms ease;
    pointer-events: none;
  }
</style>

<script>
  export default {
    data: () => ({
      show: false,
    }),
    props: {
      label: String,
    },
    methods: {
      moveLabel(e) {
        const label = this.$refs.label
        label.setAttribute(
          "style",
          `transform: translate(${e.pageX - 92}px, ${e.pageY + 12}px);`
        )
      },
    },
    mounted() {
      document.addEventListener("pointermove", this.moveLabel)
    },
    beforeDestroy() {
      document.removeEventListener("pointermove", this.moveLabel)
    },
  }
</script>
