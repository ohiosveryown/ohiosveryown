<template>
  <menu>
    <section>
      <div class="section-content">
        <video
          ref="videoRef"
          playsinline
          controls
          src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
          @play="onPlay"
        />
        <p>
          Experience the website travel guide, brought to life in rich
          high-definition video, narrated by me: Matt.
        </p>
      </div>
    </section>
    <footer>
      <div class="footer-content">Footer</div>
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
    background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721321971/ovo-3.7/global/guide-bg-1_3x_mddlit.webp")
      no-repeat center center;
    background-size: 108%;
    box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.08),
      0px 22.336px 16px 0px rgba(0, 0, 0, 0.06),
      0px 6.65px 5px 0px rgba(0, 0, 0, 0.05);
  }

  menu:hover section {
    grid-template-rows: 1fr;
  }

  menu:hover .footer-content {
    opacity: 1;
    border: 0.5px solid rgba(255, 255, 255, 0.04);
    background: radial-gradient(42% 84% at 50% -16%, #555 0%, #141414 100%);
    transition: all 300ms ease;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.76),
      0px -1px 0px 0px #000 inset,
      0px 0.5px 1px 0px rgba(255, 255, 255, 0.56) inset;
  }

  section {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: var(--ease--qubic);
  }

  footer {
    display: grid;
    grid-template-rows: 1fr;
  }

  .section-content,
  .footer-content {
    min-height: 0;
  }

  .footer-content {
    display: flex;
    border-radius: 9px;
    transition: all 300ms ease 700ms;
    opacity: 0;
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
