<template>
  <div
    ref="containerRef"
    class="container"
    @mouseover="ContainerMouseEnter"
    @mouseout="ContainerMouseLeave"
  >
    <header class="">
      <div class="header-label--default">
        <span class="thin">Your personal guide</span>
      </div>
      <div class="header-label--hover">
        <button
          class="thin"
          @click="addDissolveClass"
        >
          Dismiss
        </button>
      </div>
    </header>
    <div class="assets">
      <img
        src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/guide@2x.webp?updatedAt=1719082771446"
        alt="guidebook illustration"
        class="guidebook"
      />
      <video
        ref="videoRef"
        src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
        preload="auto"
        :controls="showControls"
        :class="{ 'clicked-class': videoClicked }"
        @mouseover="videoMouseEnter"
        @mouseout="videoMouseLeave"
        @click="toggleVideoClick"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";
  .container {
    position: fixed;
    bottom: 1.4rem;
    right: 1.4rem;
  }

  .container:hover img {
    opacity: 0;
    transition: opacity var(--ease) 200ms;
  }

  .container:hover video {
    width: 64rem;
    height: 40rem;
    transform: rotate(0deg);
    transition: all 700ms cubic-bezier(0.8, 0, 0.16, 1) 100ms;
  }

  .container:hover .header-label--default {
    opacity: 0;
    transition: opacity var(--ease) 200ms;
  }

  .container:hover .header-label--hover {
    opacity: 1;
    transition: opacity var(--ease) 400ms;
  }

  .header-label--default {
    transform: translateY(0.8rem);
    text-align: center;
    transition: opacity var(--ease) 400ms;
  }

  .header-label--hover {
    transform: translateX(-1.2rem);
    text-align: right;
    opacity: 0;
    transition: opacity var(--ease) 100ms;
  }

  .assets {
    display: flex;
  }

  img,
  video {
    border-radius: var(--border-radius--partial);
    width: 7.6rem;
    height: 12rem;
    object-fit: cover;
    overflow: hidden;
  }

  video {
    transform: rotate(8deg);
    transition: all 400ms ease;
    box-shadow: var(--shadow--sm);
    will-change: transform, width, height;
    &:focus {
      outline: none;
    }
  }

  img {
    margin-left: 1.2rem;
    margin-right: -3.8rem;
    transform: rotate(-8deg) translateY(-0.8rem);
    box-shadow: var(--shadow--xs);
    transition: opacity var(--ease) 200ms;
  }

  button {
    padding-bottom: 0.8rem;
    font-size: 1.5rem;
    color: var(--color--primary);
  }

  .thin {
    padding-left: 0.5rem;
  }

  .clicked-class {
    width: 21rem;
    height: 13.6rem;
    transform: rotate(0deg);
  }

  .dissolve {
    right: 1.2rem;
    bottom: 1.2rem;
    opacity: 0;
    filter: blur(6px);
    transform: translateX(-12rem) translateY(600vh) scaleX(0.35) scaleY(2.25) !important;
    transform-origin: top right;
    transition: opacity 700ms ease 100ms, filter 500ms ease,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
    pointer-events: none;
    figure.video {
      width: 64rem !important;
      height: 40rem !important;
      transform: rotate(0deg) !important;
    }
  }
</style>

<script setup>
  // Reactive states related to hover functionality
  const isHovered = ref(false)
  let containerHoverTimeoutId = null

  // Reactive state and timeout ID for video controls visibility
  const showControls = ref(false)
  let hoverTimeoutId = null

  // Functions related to container hover events
  const ContainerMouseEnter = () => {
    clearTimeout(containerHoverTimeoutId)
    containerHoverTimeoutId = setTimeout(() => {
      isHovered.value = true
    }, 300)
  }

  const ContainerMouseLeave = () => {
    clearTimeout(containerHoverTimeoutId)
    containerHoverTimeoutId = setTimeout(() => {
      isHovered.value = false
    }, 100)
  }

  // Video controls visibility functions
  const videoMouseEnter = () => {
    hoverTimeoutId = setTimeout(() => {
      showControls.value = true
    }, 400)
  }

  const videoMouseLeave = () => {
    showControls.value = false
    clearTimeout(hoverTimeoutId)
  }

  const videoClicked = ref(false)

  const toggleVideoClick = () => {
    videoClicked.value = !videoClicked.value
  }

  const containerRef = ref(null)
  const videoRef = ref(null)
  const addDissolveClass = () => {
    containerRef.value.classList.add("dissolve")
    if (videoRef.value) {
      videoRef.value.pause()
    }
  }
</script>
