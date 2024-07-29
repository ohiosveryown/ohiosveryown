<template>
  <div
    class="container"
    ref="container"
  >
    <NuxtLink :to="`${randomPost}`">
      <button
        class="button"
        @mouseenter="showing = true"
        @mouseleave="showing = false"
      >
        <span class="sheen" />
        <span class="bg" />
        {{ buttonLabel }}
      </button>

      <small
        ref="label"
        :class="{ tooltipShowLabel: showing }"
        class="label tooltip--label"
      >
        Let algorithms shape your destiny
      </small>

      <NuxtImg
        class="folder"
        src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721428780/ovo-3.7/index/folder_3x_sbimem.webp"
        alt="folder closed icon"
      />

      <NuxtImg
        class="folder"
        src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721429356/ovo-3.7/index/folder--open-2_3x_rkqm5b.webp"
        alt="folder open with image icon"
      />

      <NuxtImg
        class="folder"
        src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721428550/ovo-3.7/index/folder--open-3_3x_smzosn.webp"
        alt="folder open with images icon"
      />

      <NuxtImg
        class="folder"
        src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721428780/ovo-3.7/index/folder_3x_sbimem.webp"
        alt="folder closed icon"
      />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  @import "/assets/style/grid.scss";

  .container {
    position: relative;
  }

  .button {
    position: relative;
    border-radius: var(--border-radius--full);
    background: var(--color--button-primary);
    box-shadow: var(--shadow--lg);
    padding: 1.2rem 1.6rem 1.3rem;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
    color: var(--color--primary);
    text-shadow: var(--shadow--text);
    overflow: hidden;
  }

  .button:hover {
    background: none;
    .bg {
      opacity: 1;
      transform: scale(2);
      transition: opacity 300ms ease, transform 16s ease;
    }
  }

  @media (prefers-color-scheme: dark) {
    .button:hover {
      .sheen {
        opacity: 0;
      }
      .bg {
        background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721610830/ovo-3.7/global/prim-button-bg--night_2x_r1hnfb.webp")
          no-repeat center center;
        background-size: cover;
      }
    }
  }

  .button:active {
    transform: scale(0.98);
  }

  .sheen {
    position: absolute;
    z-index: var(--z1);
    top: 0.5px;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 100px;
    width: 88%;
    height: 62%;
    background: var(--color--button-sheen);
    pointer-events: none;
  }

  .bg {
    position: absolute;
    z-index: var(--z0);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721581090/ovo-3.7/global/prim-button-bg_2x_invutl.webp")
      no-repeat center center;
    background-size: cover;
    opacity: 0;
    transition: transform 1ms ease;
    pointer-events: none;
  }

  .label {
    z-index: var(--z1);
    width: max-content;
  }

  .folder {
    position: absolute;
    z-index: var(--z0);
    inset: 0;
    margin: auto;
    width: 4.8rem;
    height: auto;
    opacity: 0;
    pointer-events: none;
    // transform: translate(0) scale(0.5);
    transition: opacity 200ms ease, transform 1ms ease 200ms;
    will-change: transform, opacity;
    filter: drop-shadow(0 6px 4px rgba(0, 0, 0, 0.05))
      drop-shadow(0 19px 16px rgba(0, 0, 0, 0.07))
      drop-shadow(0 84px 68px rgba(0, 0, 0, 0.12));
  }

  .folder:nth-of-type(1) {
    transform: translate(-6rem, -2.2rem) rotate(0) scale(0.5);
  }

  .button:hover ~ .folder:nth-of-type(1) {
    opacity: 1;
    transform: translate(-8rem, -3.6rem) rotate(-15deg);
    transition: opacity 400ms ease 150ms,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
  }

  .folder:nth-of-type(2) {
    transform: translate(4rem, -1.8rem) rotate(0) scale(0.5);
  }

  .button:hover ~ .folder:nth-of-type(2) {
    opacity: 1;
    transform: translate(7.2rem, -3.6rem) rotate(24deg) scale(0.76);
    transition: opacity 400ms ease 250ms,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
  }

  .folder:nth-of-type(3) {
    transform: translate(-3.2rem, 2.4rem) rotate(0) scale(0.5);
  }

  .button:hover ~ .folder:nth-of-type(3) {
    opacity: 1;
    transform: translate(-5.6rem, 4.8rem) rotate(16deg) scale(0.92);
    transition: opacity 400ms ease 200ms,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
  }

  .folder:nth-of-type(4) {
    transform: translate(3.6rem, 2.6rem) rotate(0) scale(0.5);
  }

  .button:hover ~ .folder:nth-of-type(4) {
    opacity: 1;
    transform: translate(5.6rem, 4.4rem) rotate(-10deg) scale(0.8);
    transition: opacity 400ms ease 300ms,
      transform 600ms cubic-bezier(0.8, 0, 0.16, 1);
  }
</style>

<script setup>
  defineProps({
    buttonLabel: String,
  })

  const showing = ref(false)
  const randomPost = ref(null)
  const container = ref("")
  const label = ref("")
  const tracking = ref(false)

  const moveLabel = (e) => {
    if (tracking.value) {
      const rect = container.value.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      label.value.style.transform = `translate(${x + 18}px, ${y + 10}px)`
    }
  }

  onMounted(async () => {
    let posts = await queryContent("/work").find()
    posts = posts.filter((post) => !post.isExternal)
    randomPost.value = posts[~~(Math.random() * posts.length)]._path

    container.value.addEventListener("pointermove", moveLabel)
    container.value.addEventListener("pointerenter", () => {
      tracking.value = true
    })
    container.value.addEventListener("pointerleave", () => {
      tracking.value = false
    })
  })

  onUnmounted(() => {
    document.removeEventListener("pointermove", moveLabel)
  })
</script>
