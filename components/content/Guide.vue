<template>
  <div
    ref="containerRef"
    class="container"
    :class="{ 'at-bottom': isAtBottom }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <header
      ref="headerRef"
      class="thin"
      :class="{ destroy: buttonDestroy }"
    >
      <span>Your personal guide:</span>
    </header>

    <button
      class="thin"
      :class="{ destroy: buttonDestroy }"
      @click="toggleButton"
    >
      Dismiss
    </button>

    <video
      src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/guide/dnd-walkthrough.mp4"
      ref="videoRef"
      :controls="showControls"
      :class="{ 'dismiss-player': buttonDestroy }"
      @play="handleVideoPlay"
    />

    <img
      ref="coverRef"
      :class="{ destroy: buttonDestroy }"
      src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/guide@2x.webp?updatedAt=1719082771446"
      alt="ohiosveryown site guide book illustration"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    display: none;
    @include breakpoint(lg) {
      display: block;
      position: fixed;
      width: 7.6rem;
      height: 14rem;
      bottom: 1.4rem;
      right: 1.4rem;
      padding-top: 2.4rem;
      transform: rotate(8deg);
      opacity: 0;
      transition: all 700ms cubic-bezier(0.8, 0, 0.16, 1);
    }
  }

  header {
    position: absolute;
    top: -0.8rem;
    left: -5.2rem;
    right: 0;
    margin: 0 auto;
    width: max-content;
    transform: rotate(-8deg);
    transition: opacity 300ms ease 600ms;
  }

  video {
    border-radius: var(--border-radius--partial);
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    box-shadow: var(--shadow--md);
  }

  img {
    position: absolute;
    z-index: var(--z0);
    top: 2.6rem;
    left: -2.2rem;
    border-radius: var(--border-radius--partial);
    transform: rotate(-20deg) scale(0.96);
    transition: opacity 300ms ease 600ms;
    box-shadow: var(--shadow--md);
  }

  button {
    position: absolute;
    top: 0.2rem;
    right: 1.2rem;
    font-size: 1.5rem;
    text-align: right;
    color: var(--color--primary);
    opacity: 0;
    transform: translateY(2rem);
    transition: all 300ms ease 200ms;
  }

  .container:hover {
    width: 64rem;
    height: 40rem;
    transform: rotate(0);
    @include breakpoint(xl) {
      width: 108rem;
      height: 67.5rem;
    }
  }

  .container:hover img {
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .container:hover button {
    opacity: 1;
    transform: translateY(0);
    transition: all 500ms ease 300ms;
  }

  .container:hover header {
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .mini-player {
    width: 20rem;
    height: 16rem;
    transform: rotate(0);
    @include breakpoint(xl) {
      width: 64rem;
      height: 40rem;
    }
  }

  .dismiss-player {
    filter: blur(6px);
    transform: translateY(150vh) scaleX(0.56) scaleY(4);
    transition: opacity 700ms ease 100ms, filter 500ms ease,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
  }

  .destroy {
    display: none !important;
  }

  .at-bottom {
    opacity: 1;
    // transition: opacity 300ms ease;
  }
</style>

<script setup>
  const containerRef = ref(null)
  const videoRef = ref(null)
  const headerRef = ref(null)
  const coverRef = ref(null)
  const buttonDestroy = ref(false)
  const isVideoPlaying = ref(false)
  const showControls = ref(false)

  // reveal guide when user scrolls to the bottom of the page
  const route = useRoute()
  const isAtBottom = ref(false)
  const checkScroll = () => {
    if (route.path === "/" || route.path === "/about") {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY
      const remaining = docHeight - windowHeight
      if (scrollPosition >= remaining) {
        isAtBottom.value = true
        console.log("bottoms up")
      }
    }
  }

  const addScrollListener = () => {
    window.addEventListener("scroll", checkScroll)
  }

  const removeScrollListener = () => {
    window.removeEventListener("scroll", checkScroll)
  }

  onMounted(() => {
    addScrollListener()
  })

  onUnmounted(() => {
    removeScrollListener()
  })

  const toggleButton = () => {
    buttonDestroy.value = !buttonDestroy.value
    setTimeout(() => {
      if (videoRef.value) {
        videoRef.value.remove()
      }
    }, 300)
  }

  const handleMouseEnter = () => {
    setTimeout(() => {
      showControls.value = true
    }, 500)
    console.log("hovering = true")
  }

  const handleMouseLeave = () => {
    showControls.value = false
    console.log("hovering = false")
  }

  const handleVideoPlay = () => {
    isVideoPlaying.value = true
    containerRef.value.classList.add("mini-player")
    coverRef.value.style.display = "none"
    headerRef.value.style.display = "none"
    console.log("playing = true")
  }
</script>
