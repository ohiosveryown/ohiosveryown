<template>
  <div class="container-index">
    <SiteHeader>
      <span class="row">
        I'm
        <span
          class="has-tooltip"
          data-tooltip="Hey there 👋"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
          >Matt</span
        >, a principal designer at
        <span
          class="has-tooltip"
          data-tooltip="$XYZ"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/skills/loop.gif"
          >Square</span
        >
        <IconSquare class="icon-square" />
        ,
      </span>
      <span class="row">
        living in always peachy,
        <span
          class="has-tooltip"
          data-tooltip="The city in a forest"
          data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp?updatedAt=1716129844773"
          >Atlanta, Ga</span
        >
        🍑.
      </span>
    </SiteHeader>

    <section class="buttons">
      <div class="button-adventure-wrap">
        <NuxtLink
          :to="randomWorkPath"
          @click="handleAdventureClick"
        >
          <button
            class="button-adventure has-tooltip"
            data-tooltip="Let the models shape your destiny"
            @mouseenter="adventureHover = true"
            @mouseleave="adventureHover = false"
          >
            <span class="sheen" />
            <span class="button-bg" />
            Adventure time
          </button>
        </NuxtLink>

        <motion.span
          v-for="folder in adventureFolders"
          :key="folder.src"
          class="adventure-folder-wrap"
          :initial="false"
          :animate="
            adventureHover
              ? { opacity: 1, filter: 'blur(0)' }
              : { opacity: 0, filter: 'blur(1rem)' }
          "
          :transition="
            adventureHover ? folder.transition : folder.exitTransition
          "
        >
          <motion.img
            :src="folder.src"
            :alt="folder.alt"
            class="adventure-folder"
            :initial="false"
            :animate="adventureHover ? folder.animate : folder.initial"
            :transition="
              adventureHover ? folder.transition : folder.exitTransition
            "
          />
        </motion.span>
      </div>

      <ContactButton />
    </section>

    <LogoPile />

    <WorkList />
  </div>
</template>

<style scoped lang="scss">
  .container-index {
    padding-bottom: 5.6rem;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @include breakpoint(md) {
      margin-top: 4rem;
    }
  }

  .button-adventure-wrap {
    position: relative;
  }

  .adventure-folder-wrap {
    display: block;
    position: absolute;
    z-index: var(--z0);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 4.8rem;
    height: 4.8rem;
    pointer-events: none;
    will-change: transform, opacity, filter;
  }

  .adventure-folder {
    display: block;
    width: 100%;
    height: auto;
    will-change: transform;
    filter: drop-shadow(0 0.6rem 0.4rem rgba(0, 0, 0, 0.05))
      drop-shadow(0 1.9rem 1.6rem rgba(0, 0, 0, 0.07))
      drop-shadow(0 8.4rem 6.8rem rgba(0, 0, 0, 0.12));
  }

  .button-adventure {
    position: relative;
    overflow: hidden;
    padding: 1.2rem 1.6rem 1.3rem;
    border-radius: 100px;
    background: linear-gradient(180deg, hsla(0, 0%, 83%, 0.8), #fff);
    box-shadow:
      0 -1px 1px 0 rgba(0, 0, 0, 0.12) inset,
      0 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
      0 20px 18px 0px rgba(0, 0, 0, 0.05),
      0 6px 5px 0px rgba(0, 0, 0, 0.03);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
    cursor: var(--cursor);
  }

  .sheen {
    position: absolute;
    z-index: var(--z2);
    top: 0.5px;
    right: 0;
    left: 0;
    margin: auto;
    width: 88%;
    height: 62%;
    border-radius: 100px;
    background: linear-gradient(
      hsla(0, 0%, 100%, 0.9) 0.42%,
      hsla(0, 0%, 100%, 0)
    );
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  .button-bg {
    position: absolute;
    z-index: var(--z1);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: url(https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721581090/ovo-3.7/global/prim-button-bg_2x_invutl.webp)
      no-repeat 50%;
    background-size: cover;
    filter: brightness(1.1);
    mix-blend-mode: multiply;
    pointer-events: none;
    transition:
      opacity 200ms ease,
      transform 1ms ease 200ms;
  }

  .button-adventure:hover {
    background: transparent;
  }

  .button-adventure:hover .button-bg {
    opacity: 1;
    transform: scale(2.8);
    transition:
      transform 8s ease-out,
      opacity 200ms ease;
  }
</style>

<script setup lang="ts">
  import { ref, onMounted, onActivated } from 'vue'
  import { motion } from 'motion-v'

  const router = useRouter()
  const workPaths = router
    .getRoutes()
    .filter((route) => route.path.startsWith('/work/'))
    .map((route) => route.path)

  const randomWorkPath = ref(workPaths[0] ?? '/')
  const adventureHover = ref(false)

  function randomizeWorkPath() {
    if (workPaths.length === 0) return
    randomWorkPath.value =
      workPaths[Math.floor(Math.random() * workPaths.length)]!
  }

  function handleAdventureClick() {
    dismissTooltip()
    adventureHover.value = false
  }

  onMounted(randomizeWorkPath)
  onActivated(randomizeWorkPath)

  const FOLDER_EASE = [0.8, 0, 0.16, 1] as const
  const FOLDER_EXIT_TRANSITION = {
    duration: 0.35,
    delay: 0,
    ease: FOLDER_EASE,
  } as const

  type AdventureFolder = {
    src: string
    alt: string
    initial: Record<string, string | number>
    animate: Record<string, string | number>
    transition: {
      duration: number
      delay: number
      ease: readonly [number, number, number, number]
    }
    exitTransition: typeof FOLDER_EXIT_TRANSITION
  }

  const adventureFolders: readonly AdventureFolder[] = [
    {
      src: 'https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722447739/ovo-3.7/index/icons/folder_3x_wwvysu.webp',
      alt: 'folder closed icon',
      initial: {
        x: '-6rem',
        y: '-2.2rem',
        rotate: 0,
        scale: 0.5,
      },
      animate: {
        x: '-8rem',
        y: '-3.6rem',
        rotate: -15,
        scale: 1,
      },
      transition: { duration: 0.6, delay: 0.15, ease: FOLDER_EASE },
      exitTransition: FOLDER_EXIT_TRANSITION,
    },
    {
      src: 'https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722447737/ovo-3.7/index/icons/folder--vid_3x_yqcncr.webp',
      alt: 'folder open with image icon',
      initial: {
        x: '4rem',
        y: '-1.8rem',
        rotate: 0,
        scale: 0.5,
      },
      animate: {
        x: '7.2rem',
        y: '-3.6rem',
        rotate: 24,
        scale: 0.76,
      },
      transition: { duration: 0.6, delay: 0.25, ease: FOLDER_EASE },
      exitTransition: FOLDER_EXIT_TRANSITION,
    },
    {
      src: 'https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722447738/ovo-3.7/index/icons/folder-images_3x_okncdx.webp',
      alt: 'folder open with images icon',
      initial: {
        x: '-3.2rem',
        y: '2.4rem',
        rotate: 0,
        scale: 0.5,
      },
      animate: {
        x: '-5.6rem',
        y: '4.8rem',
        rotate: 16,
        scale: 0.92,
      },
      transition: { duration: 0.6, delay: 0.2, ease: FOLDER_EASE },
      exitTransition: FOLDER_EXIT_TRANSITION,
    },
    {
      src: 'https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722447736/ovo-3.7/index/icons/folder--browser_3x_aa5f79.webp',
      alt: 'folder with browser icon',
      initial: {
        x: '3.6rem',
        y: '2.6rem',
        rotate: 0,
        scale: 0.5,
      },
      animate: {
        x: '5.6rem',
        y: '4.4rem',
        rotate: -10,
        scale: 0.8,
      },
      transition: { duration: 0.6, delay: 0.3, ease: FOLDER_EASE },
      exitTransition: FOLDER_EXIT_TRANSITION,
    },
  ]
</script>
