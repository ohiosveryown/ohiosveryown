<template>
  <span class="container">
    <figure>
      <img
        v-if="img"
        class="thumbnail"
        :class="{ showImg: show }"
        :src="img"
        :alt="alt"
      />
      <figcaption
        tabindex="0"
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
  </span>
</template>

<style lang="scss" scoped>
  .container {
    display: initial;
  }

  figure {
    position: relative;
  }

  .trigger {
    position: relative;
    opacity: 0.56;
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
          `transform: translate(${e.clientX - 62}px, ${e.clientY + 12}px);`
        )
      },
    },
    mounted() {
      document.addEventListener("pointermove", this.moveLabel)
    },
    beforeUnmount() {
      console.log("deeeestroy")
      document.removeEventListener("pointermove", this.moveLabel)
    },
  }
</script>
