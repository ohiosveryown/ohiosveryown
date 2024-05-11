<template>
  <div class="container">
    <figure>
      <img v-if="img" :class="{ showImg: show }" :src="img" :alt="alt" />
      <figcaption
        @mouseenter="show = true"
        @mouseleave="show = false"
        class="trigger"
      >
        {{ trigger }}
      </figcaption>
    </figure>

    <span ref="label" :class="{ showLabel: show }" class="label">{{
      label
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    display: initial;
  }

  figure {
    position: relative;
  }

  img {
    --unit: 92px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -128%);
    /* z-index: var(--zmin); */
    margin: 0 auto;
    border-radius: 15px;
    width: var(--unit);
    height: auto;
    opacity: 0;
    box-shadow: var(--elevation-x1);
    pointer-events: none;
    will-change: transform, opacity;
  }

  .trigger {
    position: relative;
    opacity: 0.56;
    /* text-decoration: underline; */
  }

  .trigger:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.56);
    transition: background 300ms ease;
  }

  .trigger:hover:after {
    background: rgba(0, 0, 0, 0);
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100px;
    padding: 3px 10px 4px;
    background: var(--night);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.32);
    color: var(--cloud);
    text-align: center;
    font-family: var(--system-ui);
    font-size: 1.3rem;
    font-weight: 550;
    letter-spacing: -0.15px;
    opacity: 0;
    transition: opacity 1ms ease;
    will-change: transform, opacity;
  }

  .showImg {
    opacity: 1;
    transform: translate(-50%, -132%);
    transition: all 400ms ease;
  }

  .showLabel {
    opacity: 1;
    transition: opacity 400ms ease;
  }
</style>

<script>
  export default {
    data: () => ({
      show: false,
    }),

    props: {
      img: String,
      alt: String,
      trigger: String,
      label: String,
    },

    methods: {
      moveLabel(e) {
        const label = this.$refs.label
        label.setAttribute(
          "style",
          `transform: translate(${e.pageX - 56}px, ${e.pageY + 12}px);`
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
