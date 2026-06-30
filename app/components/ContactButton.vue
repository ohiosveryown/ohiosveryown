<template>
  <a
    href="mailto:matt@ohiosveryown.co"
    @click.prevent
  >
    <button
      ref="buttonRef"
      class="button-contact has-tooltip"
      :data-tooltip="currentTooltip"
      @click="handleClick"
    >
      <slot>Get in touch</slot>
    </button>
  </a>
</template>

<style scoped lang="scss">
  .button-contact {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    height: 3.8rem;
    padding: 0 1.7rem;
    border: 1px solid rgba(220, 220, 220, 0.5);
    border-radius: 200px;
    color: #3d3f44;
    background: linear-gradient(180deg, rgba(225, 225, 225, 0.5), #fff);
    box-shadow:
      0 1.13px 3.63px 0 rgba(0, 0, 0, 0.05),
      0 9px 29px 0 rgba(0, 0, 0, 0.09);
    font-size: 1.3rem;
    font-family: var(--system-font);
    font-weight: 500;
    letter-spacing: -0.02rem;
    white-space: nowrap;
    cursor: var(--cursor);
    transition: transform var(--ease);
  }

  .button-contact::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0.9rem;
    left: 0.9rem;
    height: 2.4rem;
    border-radius: 13rem;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
    pointer-events: none;
  }

  .button-contact:hover {
    transform: translateY(-0.1rem);
  }

  .button-contact:active {
    transform: translateY(0);
  }
</style>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'

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
