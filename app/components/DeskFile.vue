<template>
  <DeskItem
    v-slot="{ asking }"
    :delay="delay"
    :ask="ask"
  >
    <component
      :is="href ? 'a' : 'button'"
      ref="file"
      class="desk-file"
      :class="{ 'has-tooltip': tooltipText }"
      v-bind="
        href
          ? { href, target: '_blank', rel: 'noopener' }
          : {
              type: 'button',
              'aria-haspopup': 'dialog',
              'aria-expanded': expanded,
            }
      "
      :data-tooltip="tooltipText"
      :data-tooltip-image="hinting ? undefined : tooltipImage"
      :aria-label="label"
      :aria-describedby="moveHintId"
      @mousedown="onMouseDown"
      @click="onClick"
      @focus="onFocus"
      @blur="keyboardFocus = false"
    >
      <span
        ref="art"
        class="desk-file__art"
        :class="{ 'is-selected': selected || keyboardFocus }"
      >
        <img
          v-if="image"
          class="desk-file__image"
          :src="image"
          alt=""
        />
      </span>
      <span
        class="desk-file__meta"
        :class="{ 'is-asking': asking }"
      >
        <span class="desk-file__name blush">{{ displayName }}</span>
        <AnimatePresence>
          <motion.span
            v-if="count != null"
            class="desk-file__count"
            aria-hidden="true"
            :initial="{
              opacity: 0,
              filter: reduceMotion ? 'blur(0px)' : 'blur(10px)',
            }"
            :animate="{
              opacity: 1,
              filter: 'blur(0px)',
              // A leftover filter would cancel this pill's backdrop blur.
              transitionEnd: { filter: 'none' },
            }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: reduceMotion ? 0.01 : 0.4 }"
          >
            <svg
              class="desk-file__count-icon"
              width="6.644"
              height="7.537"
              viewBox="0 0 6.64398 7.53742"
              fill="none"
            >
              <path
                d="M3.14589 0.115172C3.21307 -0.0383908 3.4309 -0.0383906 3.49809 0.115172L6.62726 7.26756C6.69709 7.42718 6.53557 7.58991 6.37544 7.52128L3.39771 6.24511C3.34935 6.22439 3.29462 6.22439 3.24627 6.24511L0.268534 7.52128C0.108402 7.58991 -0.0531138 7.42718 0.0167163 7.26756L3.14589 0.115172Z"
                fill="currentColor"
              />
            </svg>
            <span class="desk-file__count-value blush">{{
              formatCount(count)
            }}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </component>
    <!-- Read after its name by screen readers (DeskItem moves it with the
         arrow keys). -->
    <span
      :id="moveHintId"
      hidden
      >Use the arrow keys to move</span
    >
  </DeskItem>
</template>

<style scoped lang="scss">
  .desk-file {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    color: #fff;
    text-decoration: none;

    &:focus-visible {
      outline: none;
    }
  }

  button.desk-file {
    font: inherit;
    text-align: left;
  }

  .desk-file[href],
  button.desk-file {
    cursor: var(--cursor);
  }

  .desk-file__art {
    display: block;
    flex-shrink: 0;
    position: relative;
    width: 7.8rem;
    height: 5.6rem;
    border: 3px solid #fff;
    border-radius: 2px;
    background: #d2f976;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.19);
    overflow: hidden;

    &.is-selected {
      outline: 2px solid #285955;
      outline-offset: 3px;
    }
  }

  .desk-file__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: cover;
  }

  .desk-file__meta {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    min-width: 0;
    padding-top: 0.6rem;
    transition: opacity 200ms ease;

    // Held over Mallow (see useAskDrop): just the picture.
    &.is-asking {
      opacity: 0;
    }
  }

  .desk-file__name {
    display: block;
    margin: -0.8rem 0;
    padding: 0.8rem 0;
    text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
    font-size: 1.3rem;
    font-weight: 550;
    letter-spacing: 0.07em;
    line-height: 1.11;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-variation-settings:
      'wdth' 94,
      'HGHT' 100;
    overflow: hidden;
  }

  .desk-file__count {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.4rem;
    margin-top: 0.5rem;
    padding: 0.4rem 0.7rem 0.4rem 0.4rem;
    height: 2rem;
    border-radius: 100rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(6px);
    overflow: hidden;
  }

  .desk-file__count-icon {
    display: block;
    flex-shrink: 0;
    margin: 0 0.15rem 0.1rem;
    opacity: 1;
    transform: rotate(-37deg);
  }

  .desk-file__count-value {
    font-size: 1.3rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.07em;
    line-height: 1.11;
    text-transform: uppercase;
    white-space: nowrap;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    font-variation-settings:
      'wdth' 80,
      'HGHT' 100;
  }
</style>

<script setup lang="ts">
  import type { AskDropItem } from '~/composables/useAskDrop'
  import { motion, AnimatePresence } from 'motion-v'

  const moveHintId = useId()

  const props = withDefaults(
    defineProps<{
      name: string
      image?: string | null
      href?: string | null
      tooltip?: string
      tooltipImage?: string
      label?: string
      expanded?: boolean
      delay?: number
      // Times opened; null hides the pill (not loaded or Worker down).
      count?: number | null
      // Dropped on Mallow, what he's asked (see useAskDrop).
      ask?: AskDropItem
    }>(),
    {
      image: null,
      href: null,
      tooltip: undefined,
      tooltipImage: undefined,
      label: undefined,
      expanded: false,
      delay: 0,
      count: null,
    },
  )

  // Desk labels read like filenames; keep them short so they don't stretch.
  const NAME_MAX = 16
  const displayName = computed(() => {
    const name = props.name
    if (name.length <= NAME_MAX) return name
    return `${name.slice(0, NAME_MAX)}…`
  })

  const reduceMotion = ref(false)

  const emit = defineEmits<{ open: [origin: HTMLElement | null] }>()

  const file = useTemplateRef<HTMLElement>('file')
  const art = useTemplateRef<HTMLElement>('art')
  const selected = ref(false)
  const keyboardFocus = ref(false)

  // Like a desktop: the first click selects, a second click (or double-click)
  // opens. Touch opens on the first tap. Read at mousedown, since that's also
  // when the click selects.
  let wasSelected = false

  // Hint the second click until the visitor has opened any desk file once.
  // Delayed past a double-click so it doesn't flash on the way to opening.
  const HINT_DELAY = 400
  const learned = useState('desk-file-learned', () => false)
  const hinting = computed(() => selected.value && !learned.value)
  const tooltipText = computed(() =>
    hinting.value ? 'Double-click to open' : props.tooltip,
  )
  let hintTimer: ReturnType<typeof setTimeout> | undefined

  // A mousedown moves focus (Safari drops it to <body>), which would steal it
  // back from the dialog we open, especially on double-click.
  function onMouseDown(event: MouseEvent) {
    if (!props.href) event.preventDefault()
    wasSelected = selected.value
    selected.value = true
    if (!wasSelected && !learned.value) {
      clearTimeout(hintTimer)
      hintTimer = setTimeout(() => {
        if (hinting.value && file.value) showTooltip(file.value)
      }, HINT_DELAY)
    }
  }

  function onClick(event: MouseEvent) {
    const keyboard = event.detail === 0
    const ignored = matchMedia('(pointer: coarse)').matches
      ? event.detail > 1
      : !wasSelected || event.detail > 2
    if (!keyboard && ignored) {
      event.preventDefault()
      return
    }
    if (!keyboard) {
      clearTimeout(hintTimer)
      if (!learned.value) {
        learned.value = true
        dismissTooltip()
      }
    }
    if (!props.href) emit('open', art.value)
  }

  function onFocus(event: FocusEvent) {
    keyboardFocus.value = (event.target as HTMLElement).matches(
      ':focus-visible',
    )
  }

  function onPointerDown(event: PointerEvent) {
    if (!file.value?.contains(event.target as Node)) selected.value = false
  }

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    document.addEventListener('pointerdown', onPointerDown)
  })
  onBeforeUnmount(() => {
    clearTimeout(hintTimer)
    document.removeEventListener('pointerdown', onPointerDown)
  })
</script>
