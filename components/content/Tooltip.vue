<template>
  <span
    ref="container"
    class="container"
  >
    <figure>
      <!-- <img
        v-if="img"
        class="tooltip--thumbnail"
        :class="{ tooltipShowImg: showing }"
        :src="img"
        :alt="alt"
      /> -->

      <NuxtImg
        v-if="img"
        loading="lazy"
        class="tooltip--thumbnail"
        :class="{ tooltipShowImg: showing }"
        :src="img"
        :alt="alt"
      />

      <figcaption
        @mouseenter="showing = true"
        @mouseleave="showing = false"
        class="tooltip--trigger"
      >
        {{ trigger }}
      </figcaption>
    </figure>

    <small
      ref="label"
      :class="{ tooltipShowLabel: showing }"
      class="tooltip--label"
      >{{ tooltipLabel }}</small
    >
  </span>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  // styles are found in util.scss
</style>

<script setup>
  const props = defineProps({
    img: String,
    alt: String,
    trigger: String,
    tooltipLabel: String,
  })

  const label = ref("")
  const showing = ref(false)
  const tracking = ref(false)

  const moveLabel = (e) => {
    if (tracking.value) {
      const container = document.querySelector(".container")
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      label.value.style.transform = `translate(${x + 16}px, ${y + 112}px)`
    }
  }

  onMounted(() => {
    const container = document.querySelector(".container")
    container.addEventListener("pointermove", moveLabel)
    container.addEventListener("pointerenter", () => {
      tracking.value = true
    })
    container.addEventListener("pointerleave", () => {
      tracking.value = false
    })
  })

  onBeforeUnmount(() => {
    const container = document.querySelector(".container")
    container.removeEventListener("pointermove", moveLabel)
    container.removeEventListener("pointerenter", () => {
      tracking.value = true
    })
    container.removeEventListener("pointerleave", () => {
      label.tracking.value = false
    })
  })
</script>
