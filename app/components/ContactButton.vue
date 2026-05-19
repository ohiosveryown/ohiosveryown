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
