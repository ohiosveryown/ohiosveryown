<template>
  <div class="wrapper">
    <img v-if="img" :class="{ active: show }" :src="img" />
    <div class="trigger" @mouseenter="show = true" @mouseleave="show = false">
      {{ trigger }}
    </div>
    <div ref="label" :class="{ active: show }" class="label">{{ label }}</div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin-left: 8px;
  }

  .trigger {
    width: max-content;
  }

  .trigger:hover ~ .label {
    opacity: 1;
  }

  .label {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 1.4rem;
    transition: opacity 1ms ease;
    will-change: transform, opacity;
  }

  img {
    --unit: 92px;
    position: absolute;
    z-index: -999;
    /* top: calc(var(--unit) * -1);
    left: 50%; */
    margin: 0 auto;
    max-width: var(--unit);
    height: auto;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
  }

  .active {
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
      trigger: String,
      label: String,
      img: String,
    },

    methods: {
      mouseenter() {},

      movelabel(e) {
        const label = this.$refs.label
        label.setAttribute(
          "style",
          `transform: translate(${e.pageX - 22}px, ${e.pageY - 28}px);`
        )
      },
    },
    mounted() {
      document.addEventListener("pointermove", this.movelabel)
    },
    beforeDestroy() {
      document.removeEventListener("pointermove", this.movelabel)
    },
  }
</script>
