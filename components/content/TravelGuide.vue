<template>
  <menu ref="menuRef">
    <header>
      <div class="content--main">
        <video
          ref="videoRef"
          playsinline
          controls
          src="https://ik.imagekit.io/ohiosveryown/ovo--3.7/about/os.mp4"
          @play="onPlay"
        />

        <section ref="sectionRef">
          <p class="title">Your travel guide</p>
          <p class="description thin">
            Experience the website travel guide, brought to life in rich
            high-definition video, narrated by me: Matt.
          </p>
        </section>
      </div>
    </header>

    <footer
      class="collapse"
      ref="footerRef"
    >
      <div class="content--footer">
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
          <span class="title--footer">Video travel guide</span>
          <span class="thin">edition 3.7</span>
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
    </footer>
  </menu>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  menu {
    position: fixed;
    right: 1.2rem;
    bottom: 1.2rem;
    border-radius: 18px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    width: 36rem;
    padding: 0.8rem;
    height: auto;
    color: #fff;
    background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721321971/ovo-3.7/global/guide-bg-1_3x_mddlit.webp")
      no-repeat center center;
    background-size: 108%;
    box-shadow: var(--shadow--md);
    transition: all var(--ease--qubic);
    overflow: hidden;
  }

  header {
    display: grid;
    grid-template-rows: 0fr;
    transition: all var(--ease--qubic);
    overflow: hidden;
  }

  .content--main {
    min-height: 0;
  }

  menu:hover header {
    grid-template-rows: 1fr;
  }

  menu:hover video {
    opacity: 1;
    transition: opacity 500ms ease 200ms;
  }

  menu:hover .thumbnail--cover {
    transform: rotate(-15deg) translateX(-0.25rem);
  }

  menu:hover .thumbnail--interior {
    transform: rotate(15deg) translateX(-0.5rem);
  }

  menu:hover section .title,
  menu:hover section .description {
    opacity: 1;
  }

  video {
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: var(--shadow--md);
    opacity: 0;
    transition: opacity 200ms ease 600ms;
    will-change: opacity;
    overflow: hidden;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 2.4rem 0 1.6rem;
    text-align: center;
  }

  section .title {
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.05;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    opacity: 0;
    transition: opacity 500ms ease 350ms;
    will-change: opacity;
  }

  section .description {
    padding: 0 1.6rem;
    font-size: 2.2rem;
    line-height: 1.32;
    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    opacity: 0;
    transition: opacity 500ms ease 450ms;
    will-change: opacity;
  }

  footer {
    display: grid;
    grid-template-rows: 1fr;
    border-radius: 9px;
    border: 0.5px solid rgba(255, 255, 255, 0.04);
    background: radial-gradient(42% 84% at 50% -16%, #555 0%, #141414 100%);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.76),
      0px -1px 0px 0px #000 inset,
      0px 0.5px 1px 0px rgba(255, 255, 255, 0.56) inset;
    transition: all 1s ease;
  }

  .content--footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem 1.2rem 1.2rem 1.8rem;
  }

  .content--footer article {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .content--footer .icon {
    display: grid;
    place-items: center;
    border-radius: 6px;
    border: 0.6px solid rgba(255, 255, 255, 0.14);
    width: 2.6rem;
    height: 2.6rem;
    background: rgba(255, 255, 255, 0.2);
  }

  .title--footer {
    font-weight: 532;
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

  .collapse {
    grid-template-rows: 0fr;
    // .content--footer,
    // .span-content {
    //   min-height: 0;
    // }
  }

  .mini-player:hover {
    width: 600px;
    height: auto;
  }
</style>

<script setup>
  const menuRef = ref(null)
  const videoRef = ref(null)
  const sectionRef = ref(null)
  const footerRef = ref(null)

  const onPlay = () => {
    console.log("video clicked")
    if (sectionRef.value) {
      sectionRef.value.classList.add("collapse")
    }
    if (footerRef.value) {
      footerRef.value.classList.add("collapse")
    }
    if (menuRef.value) {
      menuRef.value.classList.add("mini-player")
    }
  }

  onMounted(() => {
    if (videoRef.value) {
      videoRef.value.addEventListener("play", onPlay)
    }
  })
</script>
