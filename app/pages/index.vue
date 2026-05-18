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
  </div>
</template>

<style scoped lang="scss">
  .greeting {
    margin-bottom: 1.2rem;
    font-family: 'sans', var(--system-font);
    font-size: clamp(1rem, -0.875rem + 12vw, 6rem);
    font-weight: 360;
    letter-spacing: -0.25rem;
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
</style>

<script setup lang="ts">
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
