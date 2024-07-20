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
          <p class="thin caption">
            Experience the website travel guide, brought to life in rich
            high-definition video, narrated by me: Matt.
          </p>
        </article>
      </div>
    </section>

    <footer ref="footerRef">
      <div class="collapsable">
        <div class="footer-content">
          <div class="thumbnails">
            <img
              class="thumbnail--cover"
              src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721314748/ovo-3.7/global/guide--cover_2x_cakm6t.webp"
              alt=""
            /><img
              class="thumbnail--interior"
              src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721312846/ovo-3.7/global/guide--writing_2x_hu5ei6.webp"
              alt=""
            />
          </div>
          <article>
            <span class="footer-title">Video travel guide</span>
            <span class="thin footer-caption">edition 3.7</span>
          </article>

          <figure class="icon">
            <svg
              width="14"
              height="14"
              fill="none"
            >
              <path
                fill="#fff"
                fill-rule="evenodd"
                d="M10.42 1.06a6.493 6.493 0 0 1 3.406-.14.23.23 0 0 1 .174.22v10.148c0 .066-.03.128-.081.17a.22.22 0 0 1-.184.04 6.479 6.479 0 0 0-5.861 1.669.216.216 0 0 1-.239.053.216.216 0 0 1-.137-.201V3.063c0-.057.02-.113.058-.155a6.496 6.496 0 0 1 2.865-1.848ZM0 1.14A.23.23 0 0 1 .174.92a6.49 6.49 0 0 1 6.27 1.994.235.235 0 0 1 .058.155v9.956a.216.216 0 0 1-.137.201.216.216 0 0 1-.239-.052 6.476 6.476 0 0 0-5.861-1.67.22.22 0 0 1-.184-.04.218.218 0 0 1-.081-.17V1.14Z"
                clip-rule="evenodd"
              />
            </svg>
          </figure>
        </div>
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
    grid-template-rows: 0fr;
    transition: all var(--ease--qubic);
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
    transition: transform 200ms ease 600ms, opacity 320ms ease 300ms;
    will-change: opacity, transform;
    overflow: hidden;
  }

  .collapsable {
    min-height: 0;
  }

  // interior styles
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
    gap: 1.4rem;
    border-radius: 13px;
    padding: 1.2rem 1.2rem 1.2rem 1.8rem;
    background: radial-gradient(42% 84% at 50% -16%, #555 0%, #141414 100%);
    box-shadow: 0px -2px 2px 0.5px #000 inset,
      0px 0px 1.5px 1px rgba(255, 255, 255, 0.4) inset;
    transition: all 300ms ease;
  }

  .footer-content article {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .footer-title {
    font-weight: 532;
  }

  .footer-caption {
    letter-spacing: 0.25px;
  }

  .thumbnails {
    display: flex;
  }

  .thumbnails img {
    border-radius: 5px;
    width: auto;
    height: 4.8rem;
    box-shadow: var(--shadow--xs);
    transform-origin: bottom;
    transition: transform 500ms ease;
  }

  .thumbnail--cover {
    z-index: var(--z1);
    transform: rotate(-10deg);
  }

  .thumbnail--interior {
    margin-left: -3.2rem;
    transform: rotate(10deg) translateX(-1rem) translateY(0.1rem);
  }

  .footer-content .icon {
    display: grid;
    place-items: center;
    border-radius: 6px;
    border: 0.6px solid rgba(255, 255, 255, 0.14);
    width: 2.6rem;
    height: 2.6rem;
    background: rgba(255, 255, 255, 0.2);
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

  menu:hover .thumbnail--cover {
    transform: rotate(-15deg) translateX(-0.25rem);
  }

  menu:hover .thumbnail--interior {
    transform: rotate(15deg) translateX(-0.5rem);
  }

  // onPlay styles
  .mini-player:hover {
    width: 62rem;
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
