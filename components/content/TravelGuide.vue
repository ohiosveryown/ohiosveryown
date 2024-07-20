<template>
  <menu ref="menuRef">
    <header ref="headerRef">
      <div class="collapsable">
        <video
          class="collapsable"
          ref="videoRef"
          playsinline
          controls
          src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
          @play="onPlay"
        />
      </div>
    </header>

    <section ref="sectionRef">
      <div class="collapsable">
        <article>
          <p class="title">Your travel guide</p>
          <p class="caption thin">
            Experience the website travel guide, brought to life in rich
            high-definition video, narrated by me: Matt.
          </p>
        </article>
      </div>
    </section>

    <footer ref="footerRef">
      <div class="collapsable">
        <div class="footer-content">Footer</div>
      </div>
    </footer>
  </menu>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  // default
  menu {
    position: fixed;
    bottom: 12px;
    right: 12px;
    margin: 0;
    border-radius: 21px;
    padding: 0.8rem;
    width: 40rem;
    text-align: center;
    color: #fff;
    background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721321971/ovo-3.7/global/guide-bg-1_3x_mddlit.webp")
      no-repeat center center;
    background-size: cover;
    box-shadow: 0 100px 80px 0 rgba(0, 0, 0, 0.08),
      0 22px 16px 0 rgba(0, 0, 0, 0.06), 0 8px 5px 0 rgba(0, 0, 0, 0.05);
    transition: all var(--ease--qubic);
  }

  header,
  section {
    display: grid;
    // grid-template-rows: 0fr;
    grid-template-rows: 0fr;
    transition: all var(--ease--qubic);
    // overflow: hidden;
  }

  section {
    overflow: hidden;
  }

  footer {
    position: relative;
    z-index: var(--z1);
    display: grid;
    grid-template-rows: 1fr;
    transition: all var(--ease--qubic);
    overflow: hidden;
  }

  video {
    border-radius: 13px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: var(--shadow--sm);
    opacity: 0;
    transform: translateY(6.4rem) scale(1);
    transform-origin: top;
    transition: transform 200ms ease 600ms, opacity 400ms ease 300ms;
    will-change: opacity, transform;
    overflow: hidden;
  }

  .collapsable {
    min-height: 0;
  }

  // styles
  section article {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-align: center;
    padding: 2.4rem 0.8rem 1.6rem;
  }

  section .title {
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.05;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
    transform: translateY(7.2rem);
    transition: all 500ms ease 350ms;
    will-change: opacity, transform;
  }

  section .caption {
    padding: 0 1.6rem;
    font-size: 2.2rem;
    line-height: 1.32;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.8);
    transform: translateY(6.4rem);
    transition: all 500ms ease 450ms;
    will-change: opacity, transform;
  }

  .footer-content {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border-radius: 13px;
    // border: 1px solid rgba(0, 0, 0, 1);
    padding: 1.2rem 1.2rem 1.2rem 1.8rem;
    background: radial-gradient(42% 84% at 50% -16%, #555 0%, #141414 100%);
    transition: all 300ms ease;
  }

  // hover styles
  menu:hover {
    header,
    section {
      grid-template-rows: 1fr;
    }
  }

  menu:hover video {
    opacity: 1;
    transform: translateY(0) scale(1);
    transform-origin: top;
    transition: transform 500ms ease 260ms, opacity 300ms ease 200ms;
  }

  menu:hover .title {
    transform: translateY(0);
    transition: transform 500ms ease 360ms;
  }

  menu:hover .caption {
    transform: translateY(0);
    transition: transform 500ms ease 400ms;
  }

  // onPlay styles
  .mini-player:hover {
    width: 60rem;
  }

  .mini-player video {
    transform: scale(1);
    opacity: 1;
  }

  .expanded {
    grid-template-rows: 1fr !important;
  }

  .collapsed {
    grid-template-rows: 0fr;
  }

  *:hover .collapsed {
    grid-template-rows: 0fr !important;
  }
</style>

<script setup>
  const menuRef = ref(null)
  const headerRef = ref(null)
  const videoRef = ref(null)
  const sectionRef = ref(null)
  const footerRef = ref(null)

  const state = reactive({
    isPlaying: false,
  })

  const onPlay = () => {
    state.isPlaying = true
    menuRef.value.classList.add("mini-player")
    headerRef.value.classList.add("expanded")
    sectionRef.value.classList.add("collapsed")
    footerRef.value.classList.add("collapsed")
    videoRef.value.classList.add("mini-player")
    console.log("video clicked")
  }

  onMounted(() => {
    if (videoRef.value) {
      videoRef.value.addEventListener("play", onPlay)
    }
  })
</script>
