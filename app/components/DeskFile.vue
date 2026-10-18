<template>
  <DeskItem :delay="delay">
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
      <span class="desk-file__meta">
        <span class="desk-file__name blush">{{ name }}</span>
      </span>
    </component>
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
</style>

<script setup lang="ts">
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
    }>(),
    {
      image: null,
      href: null,
      tooltip: undefined,
      tooltipImage: undefined,
      label: undefined,
      expanded: false,
      delay: 0,
    },
  )

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

  onMounted(() => document.addEventListener('pointerdown', onPointerDown))
  onBeforeUnmount(() => {
    clearTimeout(hintTimer)
    document.removeEventListener('pointerdown', onPointerDown)
  })
</script>
