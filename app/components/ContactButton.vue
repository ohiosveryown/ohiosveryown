<template>
  <a
    :href="MAILTO"
    :class="{ 'button-contact-link--field': variant === 'field' }"
    @click.prevent
  >
    <button
      ref="buttonRef"
      class="button-contact has-tooltip"
      :class="{ 'button-contact--field blush': variant === 'field' }"
      :data-tooltip="currentTooltip"
      @click="handleClick"
    >
      <slot>Get in touch</slot>
    </button>
  </a>
</template>

<style scoped lang="scss">
  .button-contact-link--field {
    display: block;
    width: 100%;
  }

  .button-contact--field {
    width: 100%;
    height: auto;
    padding: 2rem 1.6rem;
    border-radius: 100rem;
    border: 1px solid #d2f976;
    color: #d2f976;
    box-shadow: none;
    font-family: 'blush', var(--system-font);
    font-size: 2rem;
    font-synthesis: none;
    font-weight: 600;
    letter-spacing: 0.04rem;
    line-height: 0.87;
    text-transform: uppercase;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    font-variation-settings:
      'wdth' 100,
      'HGHT' 100;

    @include breakpoint(md) {
      padding: clamp(1.5rem, calc(1.5rem + (100vw - 144rem) * 0.0067), 1.875rem)
        clamp(1.6rem, calc(1.6rem + (100vw - 144rem) * 0.00714), 2rem);
      font-size: clamp(1.6rem, calc(1.6rem + (100vw - 144rem) * 0.00714), 2rem);
      font-weight: 700;
      letter-spacing: 0.03em;
      font-variation-settings:
        'wdth' 100,
        'HGHT' 120;
    }
  }

  .button-contact--field::before {
    display: none;
  }

  .button-contact--field:hover {
    transform: none;
  }

  .button-contact--field:active {
    transform: none;
  }
</style>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'

  withDefaults(defineProps<{ variant?: 'field' }>(), {
    variant: undefined,
  })

  type CopyTarget = {
    value: string
    idle: string
    copied: string
  }

  const COPY_TARGETS: readonly CopyTarget[] = [
    {
      value: 'matt@ohiosveryown.co',
      idle: 'Click to copy email',
      copied: 'Success – click again to copy LinkedIn URL',
    },
    {
      value: 'https://linkedin.com/in/mpence20',
      idle: 'Success – click again to copy LinkedIn URL',
      copied: '✅ Corporations, am I right?',
    },
  ] as const

  const RESET_DELAY = 4000

  // Touch devices open an email instead of copying through the tooltip.
  const MAILTO = `mailto:matt@ohiosveryown.co?subject=${encodeURIComponent('hey matt')}`

  function getTarget(index: number): CopyTarget {
    return COPY_TARGETS[index % COPY_TARGETS.length] as CopyTarget
  }

  const buttonRef = ref<HTMLButtonElement | null>(null)
  const copyIndex = ref(0)
  const currentTooltip = ref(getTarget(0).idle)
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

  async function handleClick() {
    const button = buttonRef.value
    if (!button) return

    if (window.matchMedia('(pointer: coarse)').matches) {
      // Copy the address too: with no mail app set up, iOS can't open the
      // link ("the address is invalid"), and the address is still at hand.
      legacyCopy(getTarget(0).value)
      window.location.href = MAILTO
      return
    }

    const target = getTarget(copyIndex.value)
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
      copyIndex.value = (copyIndex.value + 1) % COPY_TARGETS.length
    }

    currentTooltip.value = success ? target.copied : target.value
    await nextTick()
    refreshTooltip(button)

    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(async () => {
      currentTooltip.value = getTarget(copyIndex.value).idle
      await nextTick()
      if (button.matches(':hover')) refreshTooltip(button)
      resetTimer = null
    }, RESET_DELAY)
  }
</script>
