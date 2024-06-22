<template>
  <div
    ref="containerRef"
    :class="{ 'at-bottom': isAtBottom }"
    class="container"
  >
    <button
      @click="addDissolveClass"
      class="sans"
    >
      Dismiss guide ↴
    </button>

    <header
      v-show="showImg"
      class="thin"
    >
      Your personal guide
    </header>

    <figure
      v-show="showImg"
      class="img"
    >
      <img
        src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/guide@2x.webp?updatedAt=1719082771446"
        alt="ohiosveryown site guide book illustration"
      />
    </figure>

    <figure
      ref="reel"
      @click="hideImg"
      @mouseenter="showControls"
      @mouseleave="hideControls"
      class="video"
    >
      <video
        ref="videoRef"
        playsinline="true"
        src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/walkthru--rm.mp4"
      ></video>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    display: none;
    @include breakpoint(lg) {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: fixed;
      z-index: var(--z1);
      bottom: 1.8rem;
      right: 1.8rem;
      transition: all 300ms ease;

      opacity: 1;
    }
  }

  button {
    position: fixed;
    bottom: 38.8rem;
    right: 0;
    width: 64rem;
    padding: 4rem 2.6rem 4rem 0;
    text-align: right;
    font-size: 1.3rem;
    opacity: 0;
    transform: translateY(2rem);
    transition: all var(--ease);
    pointer-events: none;
    &:focus {
      outline: none;
    }
  }

  header,
  figure.img {
    transition: opacity var(--ease);
  }

  figure.img {
    display: block;
    width: 7.6rem;
    height: auto;
    border-radius: var(--border-radius--partial);
    box-shadow: var(--shadow--xs);
    transform: rotate(-8deg) translateY(-0.6rem);
    overflow: hidden;
    transition: all 300ms ease;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  figure.video {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: var(--border-radius--partial);
    width: 7.6rem;
    height: 11.8rem;
    overflow: hidden;
    box-shadow: var(--shadow--sm);
    transform: rotate(8deg);
    transition: all 400ms ease;
    will-change: transform, width, height;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // object-position: center bottom;
      // transform: translateY(-6%);
    }
  }

  .container:hover {
    right: 1.2rem;
    bottom: 1.2rem;

    button {
      color: var(--color--primary);
      opacity: 1;
      pointer-events: inherit;
      transform: translateY(0);
      transition: opacity 300ms ease 600ms, transform 300ms ease 600ms;
    }

    header,
    figure.img {
      opacity: 0;
    }

    figure.video {
      width: 64rem;
      height: 40rem;
      transform: rotate(0deg);
      transition: all 700ms cubic-bezier(0.8, 0, 0.16, 1);
      overflow: hidden;
    }

    .resize-video {
      width: 64rem !important;
      height: 40rem !important;
    }
  }

  .resize-video {
    width: 21rem !important;
    height: 13.6rem !important;
  }

  .at-bottom {
    opacity: 1;
  }

  .dissolve {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(400%) scaleX(0.75) scaleY(1.5);
    transform-origin: top left;
    transition: opacity 700ms ease 100ms, filter 500ms ease,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
    pointer-events: none;
  }

  video {
    transform: translateZ(0);
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>

<script setup>
  const route = useRoute()
  const containerRef = ref(null)
  const isAtBottom = ref(false)
  let showControlsTimeout = null
  const showImg = ref(true)
  const reel = ref(null)
  const videoRef = ref(null)

  const addDissolveClass = () => {
    containerRef.value.classList.add("dissolve")
    if (videoRef.value) {
      videoRef.value.pause()
    }
  }

  const hideImg = () => {
    showImg.value = false
    if (reel.value) {
      reel.value.style.transform = "rotate(0deg)"
      reel.value.classList.add("resize-video")
    }
  }

  const checkScroll = () => {
    if (route.path === "/" || route.path === "/about") {
      const scrollPosition = window.scrollY + window.innerHeight
      const bottomPosition = document.documentElement.scrollHeight
      if (scrollPosition >= bottomPosition) {
        isAtBottom.value = true
      }
    }
  }

  const addScrollListener = () => {
    window.addEventListener("scroll", checkScroll)
  }

  const removeScrollListener = () => {
    window.removeEventListener("scroll", checkScroll)
  }

  const showControls = (event) => {
    clearTimeout(showControlsTimeout)
    showControlsTimeout = setTimeout(() => {
      const video = event.target.querySelector("video")
      if (video) {
        video.controls = true
      }
    }, 400)
  }

  // Method to hide video controls
  const hideControls = (event) => {
    clearTimeout(showControlsTimeout)
    const video = event.target.querySelector("video")
    if (video) {
      video.controls = false
    }
  }

  onMounted(() => {
    addScrollListener()
  })

  onUnmounted(() => {
    removeScrollListener()
  })
</script>
