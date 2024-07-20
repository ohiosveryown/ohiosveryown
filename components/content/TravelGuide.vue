<template>
  <menu
    ref="menuRef"
    :class="{ 'mini-player': state.isPlaying }"
  >
    <header
      ref="headerRef"
      :style="{ gridTemplateRows: state.isPlaying ? '1fr' : '' }"
    >
      <div class="content">
        <video
          ref="videoRef"
          playsinline
          controls
          src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
        ></video>
        <span
          ref="spanRef"
          :class="{ collapse: state.isPlaying }"
        >
          <span class="span-content">
            <span class="padding">👋 Welcome, start your journey here.</span>
          </span>
        </span>
      </div>
    </header>
    <footer
      ref="footerRef"
      :class="{ collapse: state.isPlaying }"
    >
      <div class="footer-content">
        <div class="padding">This is the footer</div>
      </div>
    </footer>
  </menu>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  menu {
    position: fixed;
    bottom: 12px;
    right: 12px;
    margin: 0;
    border-radius: 9px;
    padding: 0.8rem;
    width: 400px;
    color: #fff;
    // background: #fff;
    background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721321971/ovo-3.7/global/guide-bg-1_3x_mddlit.webp")
      no-repeat center center;
    background-size: 108%;
    box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.08),
      0px 22.336px 16px 0px rgba(0, 0, 0, 0.06),
      0px 6.65px 5px 0px rgba(0, 0, 0, 0.05);
    // opacity: 0;
    // transform: translateY(1rem);
    transition: var(--ease--qubic);
    // overflow: hidden;
  }

  .mini-player:hover {
    width: 600px;
  }

  .mini-player video {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  menu:hover header {
    grid-template-rows: 1fr;
  }

  header {
    display: grid;
    grid-template-rows: 0fr;
    transition: var(--ease--qubic);
    overflow: hidden;
  }

  .content {
    min-height: 0;
  }

  video {
    display: flex;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  span {
    display: block;
  }

  span {
    display: grid;
    grid-template-rows: 1fr;
    transition: var(--ease--qubic);
  }

  footer {
    display: grid;
    grid-template-rows: 1fr;
    // color: #fff;
    // background: #000;
    transition: var(--ease--qubic);
  }

  menu:hover .span-content,
  menu:hover video {
    opacity: 1;
    transform: translateY(0);
  }

  menu:hover video {
    transition: transform 700ms cubic-bezier(0.8, 0, 0.16, 1) 150ms,
      opacity 1ms ease;
  }

  menu:hover .span-content {
    transition: transform 700ms cubic-bezier(0.8, 0, 0.16, 1) 300ms,
      opacity 1ms ease;
  }

  .span-content,
  .footer-content {
    min-height: 0;
  }

  .span-content,
  video {
    opacity: 1;
    transform: translateY(3.2rem);
    transition: transform 1ms ease 700ms, opacity 500ms ease;
  }

  // video {
  //   transform: translateY(3.2rem) scaleY(0);
  //   transform-origin: bottom;
  // }

  .padding {
    padding: 32px;
  }

  .collapse {
    grid-template-rows: 0fr;
    .footer-content,
    .span-content {
      min-height: 0;
    }
  }

  .dismiss-player {
    filter: blur(6px);
    transform: translateY(175vh) scaleX(0.45) scaleY(4.5);
    transition: opacity 700ms ease 100ms, filter 500ms ease,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
  }
</style>

<script setup>
  const videoRef = ref(null)
  const state = reactive({
    isPlaying: false,
  })

  const onPlay = () => {
    state.isPlaying = true
    console.log("video clicked")
  }

  onMounted(() => {
    if (videoRef.value) {
      videoRef.value.addEventListener("play", onPlay)
    }
  })
</script>
