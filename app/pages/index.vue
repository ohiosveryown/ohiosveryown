<template>
  <div class="container-index">
    <header>
      <div class="greeting">Welcome traveler</div>
      <h1>
        <span class="row"
          >I'm
          <span
            class="has-tooltip"
            data-tooltip="Hey there 👋"
            data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
            >Matt</span
          >, a principal designer at
          <span
            class="has-tooltip"
            data-tooltip="$XYZ"
            data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp?updatedAt=1715362287713"
            >Square</span
          >
          <IconSquare class="icon-square" />
          ,</span
        >
        <span class="row"
          >living in always peachy,
          <span
            class="has-tooltip"
            data-tooltip="The city in a forest"
            data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp?updatedAt=1716129844773"
            >Atlanta, Ga</span
          >
          🍑.
        </span>
      </h1>
    </header>

    <section class="buttons">
      <a href="#">
        <button
          class="button-adventure has-tooltip"
          data-tooltip="Let the models shape your destiny"
        >
          <span class="sheen" />
          <span class="button-bg" />
          Adventure time
        </button>
      </a>

      <a
        href="mailto:matt@ohiosveryown.co"
        @click.prevent
      >
        <button
          class="button-contact has-tooltip"
          data-tooltip="Click to copy email"
          @click="copyContact"
        >
          Get in touch
        </button>
      </a>
    </section>

    <LogoPile />

    <section class="work">
      <ul class="work-list">
        <li
          v-for="entry in workEntries"
          :key="entry.path"
          class="work-item"
          @mouseenter="hoveredPath = entry.path"
          @mouseleave="hoveredPath = null"
        >
          <NuxtLink
            :to="entry.path"
            class="work-link"
          >
            <div class="work-text">
              <ul class="work-tags">
                <li
                  v-for="(tag, i) in entry.tags"
                  :key="tag"
                >
                  {{ tag }}{{ i < (entry.tags?.length ?? 0) - 1 ? ',' : '' }}
                </li>
              </ul>
              <h3 class="work-title">
                <span
                  v-if="entry.folder"
                  class="work-folder-anchor"
                >
                  <AnimatePresence>
                    <motion.img
                      v-if="hoveredPath === entry.path"
                      :key="entry.path"
                      :src="entry.folder"
                      alt=""
                      class="work-folder"
                      :initial="{
                        opacity: 0,
                        scale: 0.88,
                        filter: 'blur(1rem)',
                      }"
                      :animate="{
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0)',
                      }"
                      :exit="{
                        opacity: 0,
                        scale: 0.88,
                        filter: 'blur(1rem)',
                      }"
                      :transition="{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }"
                    />
                  </AnimatePresence>
                </span>
                {{ entry.title }}
              </h3>
              <p class="work-description">{{ entry.description }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .greeting {
    margin-bottom: 1.2rem;
    // font-family: 'sans', var(--system-font);
    font-size: clamp(1rem, -0.875rem + 12vw, 6rem);
    font-weight: 360;
    letter-spacing: -0.2rem;
    line-height: 114%;
  }

  h1,
  span {
    font-family: italic, Courier, monospace;
    font-size: clamp(1rem, -0.875rem + 10vw, 4.2rem);
    font-weight: 100;
    line-height: 128%;
    letter-spacing: -0.072rem;
  }

  .row {
    display: block;
  }

  span.has-tooltip {
    color: #7b7b7b;
    // text-decoration: underline;
    text-decoration-thickness: 0.064rem;
    text-decoration-color: currentColor;
    text-underline-offset: 0.8rem;
  }

  span.has-tooltip:hover {
    text-decoration: none;
  }

  .icon-square {
    width: 2.6rem;
    height: 2.6rem;
    margin-left: 1rem;
    transform: translateY(0.1rem);
  }

  .buttons {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    @include breakpoint(md) {
      margin-top: 4rem;
    }
  }

  .button-adventure {
    position: relative;
    background: linear-gradient(180deg, hsla(0, 0%, 83%, 0.8), #fff);
    border-radius: 100px;
    box-shadow:
      0 -1px 1px 0 rgba(0, 0, 0, 0.12) inset,
      0 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
      0 20px 18px 0px rgba(0, 0, 0, 0.05),
      0 6px 5px 0px rgba(0, 0, 0, 0.03);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
    overflow: hidden;
    padding: 1.2rem 1.6rem 1.3rem;
    cursor: var(--cursor);
  }

  .sheen {
    position: absolute;
    z-index: var(--z2);
    top: 0.5px;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 100px;
    width: 88%;
    height: 62%;
    pointer-events: none;
    mix-blend-mode: overlay;
    background: linear-gradient(
      hsla(0, 0%, 100%, 0.9) 0.42%,
      hsla(0, 0%, 100%, 0)
    );
  }

  .button-bg {
    position: absolute;
    background: url(https://res.cloudinary.com/dn1q8h2ga/image/upload/v1721581090/ovo-3.7/global/prim-button-bg_2x_invutl.webp)
      no-repeat 50%;
    background-size: cover;
    height: 100%;
    left: 0;
    opacity: 0;
    top: 0;
    width: 100%;
    z-index: var(--z1);
    mix-blend-mode: multiply;
    filter: brightness(1.1);
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

  .button-contact {
    border-radius: 100px;
    padding: 1.2rem 1.6rem 1.3rem;
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: -0.025rem;
    transition: background 200ms ease;
  }

  .button-contact:hover {
    background: #f7f7f7;
  }

  .work {
    margin-top: 5rem;
    @include breakpoint(md) {
      width: grid-width(5);
    }
  }

  .work-heading {
    margin-bottom: 2.4rem;
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12rem;
    color: #7b7b7b;
  }

  .work-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .work-item {
    position: relative;
  }

  .work-link {
    display: flex;
    flex-direction: column;
    cursor: var(--cursor);
    // padding: 2rem 0;
    // border-top: 1px solid #ebebeb;
  }

  .work-link:hover {
    .work-title {
      background: #f7f7f7;
    }
  }

  .work-folder-anchor {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(100% + 0.8rem);
    width: 3.2rem;
    pointer-events: none;
  }

  .work-folder {
    display: block;
    width: 100%;
    height: auto;
    transform-origin: right center;
    will-change: transform, opacity, filter;
  }

  // .work-item:last-child .work-link {
  //   border-bottom: 1px solid #ebebeb;
  // }

  .work-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin: 0 0 0.8rem;
    padding: 0;
    list-style: none;
  }

  .work-title {
    position: relative;
    border-radius: 0.5rem;
    margin-bottom: 1.3rem;
    width: fit-content;
    font-size: clamp(2.4rem, 2.1vw, 2.8rem);
    font-weight: 440;
    line-height: 1.2;
    letter-spacing: -0.068rem;
  }

  .work-description {
    font-size: clamp(1.7rem, 1.26vw, 1.8rem);
    font-weight: 450;
    letter-spacing: -0.024rem;
    opacity: 0.72;
    line-height: 1.3;
    text-wrap: balance;
  }

  .work-tags li {
    font-family: 'thin', Georgia, serif;
    font-size: clamp(1.7rem, 1.1vw, 1.9rem);
    font-weight: 360;
    line-height: 1.32;
  }
</style>

<script setup lang="ts">
  import { ref } from 'vue'
  import { motion, AnimatePresence } from 'motion-v'

  const router = useRouter()
  const workEntries = router
    .getRoutes()
    .filter((r) => r.path.startsWith('/work/'))
    .map((r) => ({
      path: r.path,
      title: r.meta.title,
      description: r.meta.description,
      tags: r.meta.tags,
      cover: r.meta.cover,
      folder: r.meta.folder,
    }))

  const hoveredPath = ref<string | null>(null)

  const COPY_TARGETS = [
    {
      value: 'matt@ohiosveryown.co',
      idle: 'Click to copy email',
      copied: 'Success – click again to copy LinkedIn URL',
    },
    {
      value: 'https://linkedin.com/in/mpence20',
      idle: 'Success – click again to copy LinkedIn URL',
      copied: '✅ Corporations, am I right?',
    },
  ] as const

  const RESET_DELAY = 4000

  let copyIndex = 0
  let resetTimer: ReturnType<typeof setTimeout> | null = null

  function refreshTooltip(button: HTMLElement) {
    button.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, cancelable: true }),
    )
  }

  function legacyCopy(text: string): boolean {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.top = '-9999px'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      return ok
    } catch (err) {
      console.warn('legacy copy failed', err)
      return false
    }
  }

  async function copyContact(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement
    const target = COPY_TARGETS[copyIndex]
    let success = legacyCopy(target.value)

    if (!success && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(target.value)
        success = true
      } catch (err) {
        console.warn('navigator.clipboard.writeText failed', err)
      }
    }

    if (success) {
      copyIndex = (copyIndex + 1) % COPY_TARGETS.length
    }

    button.dataset.tooltip = success ? target.copied : target.value
    refreshTooltip(button)

    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      button.dataset.tooltip = COPY_TARGETS[copyIndex].idle
      if (button.matches(':hover')) refreshTooltip(button)
      resetTimer = null
    }, RESET_DELAY)
  }
</script>
