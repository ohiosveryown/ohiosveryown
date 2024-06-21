<template>
  <div
    :class="{ 'at-bottom': isAtBottom }"
    class="container"
  >
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
        src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/guide@2x.webp?updatedAt=1718985979093"
        alt=""
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
      bottom: 2rem;
      right: 2rem;

      opacity: 1;
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
    }
  }

  .container:hover {
    header,
    figure.img {
      opacity: 0;
    }

    figure.video {
      vertical-align: top;
      width: 64rem;
      height: 36rem;
      transform: rotate(0deg);
      transition: all 700ms cubic-bezier(0.8, 0, 0.16, 1);
      overflow: hidden;
    }

    .resize-video {
      width: 64rem !important;
      height: 36rem !important;
    }
  }

  .resize-video {
    width: 21rem !important;
    height: 11.8rem !important;
  }

  .at-bottom {
    opacity: 1;
  }

  video {
    transform: translateZ(0);
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>

<script setup>
  const route = useRoute()
  const isAtBottom = ref(false)
  let showControlsTimeout = null
  const showImg = ref(true)
  const reel = ref("")

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
