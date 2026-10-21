<template>
  <AnimatePresence>
    <motion.section
      v-if="study"
      :key="study.id"
      ref="shell"
      class="desk-dialog"
      :class="{ 'is-resized': height != null }"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`${study.slug}-title`"
      :style="shellStyle"
      :variants="variants"
      initial="hidden"
      :animate="phase"
      exit="exit"
      @mousedown.capture="swallowOpeningClick"
      @click.capture="swallowOpeningClick"
    >
      <motion.div
        class="desk-dialog__content"
        :variants="content"
      >
        <div
          ref="body"
          class="desk-dialog__body"
          @scroll.passive="onScroll"
        >
          <header class="desk-dialog__header">
            <p class="desk-dialog__name blush">{{ study.label }}</p>
            <h2
              :id="`${study.slug}-title`"
              class="desk-dialog__title"
            >
              {{ study.title }}
            </h2>
          </header>

          <figure
            v-if="study.hero"
            class="desk-dialog__figure"
          >
            <img
              class="desk-dialog__image desk-dialog__image--hero"
              :src="study.hero.src"
              :alt="study.hero.alt"
            />
          </figure>

          <article class="desk-dialog__article">
            <h3
              v-if="study.intro"
              class="desk-dialog__intro"
            >
              {{ study.intro }}
            </h3>
            <dl class="desk-dialog__details">
              <div
                v-for="detail in details"
                :key="detail.label"
                class="desk-dialog__row"
              >
                <dt class="desk-dialog__label blush">{{ detail.label }}</dt>
                <dd class="desk-dialog__value">
                  <a
                    v-if="detail.href"
                    class="desk-dialog__link"
                    :href="detail.href"
                    target="_blank"
                    rel="noopener"
                    >{{ detail.value }}&nbsp;↗</a
                  >
                  <template v-else>{{ detail.value }}</template>
                </dd>
              </div>
            </dl>
            <div class="desk-dialog__copy">
              <!-- html is rendered and sanitized on the server -->
              <template
                v-for="(node, index) in study.body"
                :key="index"
              >
                <img
                  v-if="node.kind === 'img'"
                  class="desk-dialog__image"
                  :src="node.src"
                  :alt="node.alt"
                  :style="
                    node.aspectRatio
                      ? { aspectRatio: node.aspectRatio }
                      : undefined
                  "
                  loading="lazy"
                  decoding="async"
                />
                <h3
                  v-else-if="node.kind === 'h3'"
                  class="desk-dialog__h3"
                  v-html="node.html"
                />
                <h4
                  v-else-if="node.kind === 'h4'"
                  class="desk-dialog__h4"
                  v-html="node.html"
                />
                <p
                  v-else
                  class="desk-dialog__para"
                  v-html="node.html"
                />
              </template>
            </div>
          </article>
        </div>

        <div
          v-show="scrollable"
          ref="rail"
          class="desk-dialog__rail"
          :class="{ 'is-visible': scrolling || dragging }"
          aria-hidden="true"
          @pointerdown="onRailDown"
        >
          <span
            class="desk-dialog__thumb"
            :style="{
              height: `${thumb.size}px`,
              transform: `translateY(${thumb.offset}px)`,
            }"
            @pointerdown.stop="onThumbDown"
            @pointermove="onThumbMove"
            @pointerup="onThumbUp"
            @pointercancel="onThumbUp"
          />
        </div>

        <div
          v-if="canResize"
          class="desk-dialog__resize"
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize dialog"
          :aria-valuemin="minHeight"
          :aria-valuemax="maxHeight"
          :aria-valuenow="height ?? minHeight"
          @pointerdown="onResizeDown"
        />

        <button
          ref="closeButton"
          class="desk-dialog__close"
          type="button"
          aria-label="Close"
          :class="{ 'is-focused': autoFocused }"
          @blur="autoFocused = false"
          @click="emit('close')"
        >
          <svg
            class="desk-dialog__close-icon"
            width="43.6357"
            height="43.6357"
            viewBox="0 0 43.6357 43.6357"
            fill="none"
            aria-hidden="true"
          >
            <g filter="url(#desk-dialog-close-shadow)">
              <rect
                x="1.81819"
                width="39.9994"
                height="39.9994"
                rx="19.9997"
                fill="black"
              />
              <path
                d="M25.7202 14.8121C26.0751 14.4572 26.6503 14.4573 27.0053 14.8121C27.3603 15.1672 27.3603 15.7423 27.0053 16.0973L23.103 19.9996L27.0063 23.903C27.3609 24.2579 27.361 24.8332 27.0063 25.1881C26.6514 25.543 26.0762 25.5428 25.7211 25.1881L21.8178 21.2848L17.9145 25.1881C17.5595 25.5429 16.9843 25.543 16.6293 25.1881C16.2746 24.8332 16.2747 24.2579 16.6293 23.903L20.5327 19.9996L16.6303 16.0973C16.2753 15.7423 16.2753 15.1672 16.6303 14.8121C16.9854 14.4573 17.5605 14.4572 17.9155 14.8121L21.8178 18.7145L25.7202 14.8121Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="desk-dialog-close-shadow"
                x="0"
                y="0"
                width="43.6357"
                height="43.6357"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1.81819" />
                <feGaussianBlur stdDeviation="0.909095" />
                <feComposite
                  in2="hardAlpha"
                  operator="out"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
      </motion.div>
    </motion.section>
  </AnimatePresence>
</template>

<style scoped lang="scss">
  .desk-dialog {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: calc(var(--zmax) - 1);
    top: 0.8rem;
    right: 0.8rem;
    left: 0.8rem;
    // Bottom inset matches the 0.8rem top inset.
    max-height: calc(100% - 1.6rem);
    border: 0.5px solid rgba(255, 255, 255, 0.26);
    border-radius: 3.5rem;
    color: #fff;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #000);
    box-shadow:
      0 7.3rem 8rem 0 rgba(0, 0, 0, 0.2),
      0 1.6rem 1.7rem 0 rgba(0, 0, 0, 0.12),
      0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(6px);
    transform-origin: 0 0;
    overflow: hidden;

    @include breakpoint(md) {
      left: auto;
      width: min(62rem, calc(100% - 3.2rem));
      min-height: 0;
      aspect-ratio: 4 / 3.45;
    }

    &.is-resized {
      aspect-ratio: auto;
    }
  }

  .desk-dialog__resize {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 1.2rem;
    touch-action: none;
    cursor: ns-resize;
  }

  .desk-dialog__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    position: relative;
    min-height: 0;
  }

  .desk-dialog__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3.2rem 2.4rem 2.8rem;
    scrollbar-width: none;
    overflow-y: auto;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .desk-dialog__rail {
    position: absolute;
    top: 3.5rem;
    right: 0;
    bottom: 3.5rem;
    width: 1.2rem;
    opacity: 0;
    touch-action: none;
    transition: opacity 0.4s var(--ease);
    cursor: var(--cursor);

    &:hover,
    &.is-visible {
      opacity: 1;
      transition-duration: 0.15s;
    }
  }

  .desk-dialog__thumb {
    display: block;
    position: absolute;
    top: 0;
    left: 0.4rem;
    width: 0.4rem;
    border-radius: 100rem;
    background: rgba(255, 255, 255, 0.28);
    transition: background 0.2s var(--ease);
    cursor: var(--cursor);

    &:hover {
      background: rgba(255, 255, 255, 0.45);
    }
  }

  .desk-dialog__header {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-right: 4rem;
  }

  .desk-dialog__name {
    opacity: 0.6;
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.07em;
    line-height: 1.11;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    overflow: hidden;
  }

  .desk-dialog__title {
    font-family: var(--system-font);
    font-size: 2.6rem;
    font-weight: 600;
    letter-spacing: -0.03rem;
    line-height: 1;
    text-wrap: balance;
    @include breakpoint(md) {
      margin-bottom: 1.2rem;
      font-size: 3.2rem;
    }
  }

  .desk-dialog__details {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin: 0;
    padding: 1.6rem 0;
  }

  .desk-dialog__row {
    display: flex;
    align-items: flex-start;
    gap: 1.8rem;
    padding-top: 1.2rem;
    background: repeating-linear-gradient(
        to right,
        #fff 0 1px,
        transparent 1px 3px
      )
      top / 100% 0.5px no-repeat;
    font-size: 1.3rem;

    &:last-child {
      padding-bottom: 1.2rem;
      background:
        repeating-linear-gradient(to right, #fff 0 1px, transparent 1px 3px)
          top / 100% 0.5px no-repeat,
        repeating-linear-gradient(to right, #fff 0 1px, transparent 1px 3px)
          bottom / 100% 0.5px no-repeat;
    }
  }

  .desk-dialog__label {
    flex-shrink: 0;
    width: 10rem;
    opacity: 0.8;
    font-weight: 500;
    letter-spacing: 0.05em;
    line-height: 1.11;
    text-transform: uppercase;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    @include breakpoint(md) {
      width: 18rem;
    }
  }

  .desk-dialog__value {
    flex: 1 0 0;
    min-width: 0;
    margin: 0;
    font-family: var(--system-font);
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.11;
    text-transform: capitalize;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
  }

  .desk-dialog__link {
    text-transform: none;
    cursor: var(--cursor);
  }

  .desk-dialog__article {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .desk-dialog__figure {
    display: block;
  }

  .desk-dialog__image {
    width: 100%;
    height: auto;
    border-radius: 1.7rem;
    background: rgba(255, 255, 255, 0.06);
  }

  .desk-dialog__image--hero {
    background: #fff;
    aspect-ratio: 408 / 280;
    object-fit: cover;
  }

  .desk-dialog__intro {
    padding: 0.8rem 0;
    font-family: var(--system-font);
    font-size: 2.4rem;
    font-weight: 520;
    letter-spacing: -0.04rem;
    line-height: 1.12;
    text-wrap: pretty;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
  }

  .desk-dialog__copy {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .desk-dialog__h3,
  .desk-dialog__h4 {
    font-family: var(--system-font);
    font-weight: 600;
    text-wrap: balance;

    &:not(:first-child) {
      margin-top: 1.6rem;
    }
  }

  .desk-dialog__h3 {
    font-size: 2rem;
    letter-spacing: -0.03rem;
    line-height: 1.3;
  }

  .desk-dialog__h4 {
    font-size: 1.7rem;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  .desk-dialog__para {
    margin: 0;
    opacity: 0.9;
    font-family: var(--system-font);
    font-size: 1.7rem;
    letter-spacing: -0.003em;
    line-height: 1.5;
    @include breakpoint(md) {
      text-wrap: pretty;
    }
  }

  // Body HTML comes from v-html, so scoped classes can't reach its links.
  .desk-dialog__para :deep(a),
  .desk-dialog__h3 :deep(a),
  .desk-dialog__h4 :deep(a) {
    color: inherit;
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-decoration-thickness: 6%;
    text-underline-offset: 0.18em;
    cursor: var(--cursor);

    &:hover {
      text-decoration-style: solid;
    }
  }

  .desk-dialog__para :deep(strong) {
    font-weight: 600;
  }

  .desk-dialog__close {
    display: block;
    position: absolute;
    top: 1.25rem;
    right: 1.24rem;
    width: 4rem;
    height: 4rem;
    cursor: var(--cursor);

    &:focus-visible,
    &.is-focused {
      outline: 1px solid rgba(255, 255, 255, 0.32);
      outline-offset: 2px;
      border-radius: 100rem;
    }
  }

  .desk-dialog__close-icon {
    display: block;
    margin-left: -0.18rem;
  }
</style>

<script setup lang="ts">
  import { motion, AnimatePresence } from 'motion-v'
  import type { ComponentPublicInstance } from 'vue'
  import type { CaseStudy } from '#shared/types/case-study'

  const props = defineProps<{
    study: CaseStudy | null
    origin?: HTMLElement | null
  }>()
  const emit = defineEmits<{ close: [] }>()

  type Detail = { label: string; value: string; href?: string }

  const details = computed<Detail[]>(() => {
    const study = props.study
    if (!study) return []
    const rows: Detail[] = []
    if (study.date) rows.push({ label: 'Date', value: study.date })
    if (study.link) {
      rows.push({
        label: 'Link',
        value: study.link.replace(/^https?:\/\//, '').replace(/\/$/, ''),
        href: study.link,
      })
    }
    if (study.disciplines.length) {
      rows.push({
        label: 'Discipline(s)',
        value: study.disciplines.join(', '),
      })
    }
    return rows
  })

  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)
  const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
  const autoFocused = ref(false)
  const body = useTemplateRef<HTMLElement>('body')
  const rail = useTemplateRef<HTMLElement>('rail')

  const MIN_THUMB = 32
  const IDLE_MS = 900

  const thumb = reactive({ size: 0, offset: 0 })
  const scrollable = ref(false)
  const scrolling = ref(false)
  const dragging = ref(false)

  let idleTimer: ReturnType<typeof setTimeout> | undefined
  let dragStart = { y: 0, scrollTop: 0 }

  function measure() {
    const el = body.value
    const track = rail.value
    if (!el || !track) return

    const { scrollHeight, clientHeight, scrollTop } = el
    const range = scrollHeight - clientHeight
    scrollable.value = range > 1

    const trackHeight = track.clientHeight
    thumb.size = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      MIN_THUMB,
    )
    thumb.offset =
      range > 0 ? (scrollTop / range) * (trackHeight - thumb.size) : 0
  }

  function reveal() {
    scrolling.value = true
    clearTimeout(idleTimer)
    idleTimer = setTimeout(() => (scrolling.value = false), IDLE_MS)
  }

  function onScroll() {
    measure()
    reveal()
  }

  function scrollPerPixel() {
    const el = body.value
    const track = rail.value
    if (!el || !track) return 0
    const travel = track.clientHeight - thumb.size
    return travel > 0 ? (el.scrollHeight - el.clientHeight) / travel : 0
  }

  function onThumbDown(event: PointerEvent) {
    if (!body.value) return
    event.preventDefault()
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    dragging.value = true
    dragStart = { y: event.clientY, scrollTop: body.value.scrollTop }
  }

  function onThumbMove(event: PointerEvent) {
    if (!dragging.value || !body.value) return
    body.value.scrollTop =
      dragStart.scrollTop + (event.clientY - dragStart.y) * scrollPerPixel()
  }

  function onThumbUp() {
    if (!dragging.value) return
    dragging.value = false
    reveal()
  }

  function onRailDown(event: PointerEvent) {
    const el = body.value
    const track = rail.value
    if (!el || !track) return
    event.preventDefault()
    const y = event.clientY - track.getBoundingClientRect().top
    el.scrollTo({
      top: (y - thumb.size / 2) * scrollPerPixel(),
      behavior: reduceMotion.value ? 'auto' : 'smooth',
    })
  }

  watch(body, (el, _previous, onCleanup) => {
    if (!el) return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    Array.from(el.children).forEach((child) => observer.observe(child))
    nextTick(measure)
    onCleanup(() => observer.disconnect())
  })

  const shell = useTemplateRef<ComponentPublicInstance>('shell')
  const phase = ref<'hidden' | 'visible'>('hidden')
  const identity = { x: 0, y: 0, scaleX: 1, scaleY: 1 }
  let from = identity
  // Vue nulls the template ref as soon as the leave starts, before `exit` runs.
  let dialog: HTMLElement | null = null

  // Height resize (pointer: fine only). Min is the default laid-out height;
  // max matches the CSS max-height.
  const finePointer = ref(false)
  const minHeight = ref(0)
  const maxHeight = ref(0)
  const height = ref<number | null>(null)
  const canResize = computed(
    () => finePointer.value && maxHeight.value > minHeight.value + 1,
  )
  const shellStyle = computed(() =>
    height.value != null ? { height: `${height.value}px` } : undefined,
  )

  let resizeStart = { y: 0, height: 0 }
  let fineQuery: MediaQueryList | undefined

  function measureHeightBounds() {
    if (!dialog) return
    // Max height leaves the same gap below as the dialog has above.
    const top = Number.parseFloat(getComputedStyle(dialog).top) || 0
    maxHeight.value = Math.max(0, window.innerHeight - top * 2)

    // offsetHeight is the layout size (ignores the FLIP transform). While the
    // user hasn't resized, keep min in sync with the default height.
    if (height.value == null) {
      minHeight.value = dialog.offsetHeight
      return
    }
    height.value = Math.min(
      Math.max(height.value, minHeight.value),
      maxHeight.value,
    )
  }

  function onResizeDown(event: PointerEvent) {
    if (!dialog || !canResize.value) return
    event.preventDefault()
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    resizeStart = {
      y: event.clientY,
      height: height.value ?? dialog.offsetHeight,
    }
    window.addEventListener('pointermove', onResizeMove)
    window.addEventListener('pointerup', onResizeUp)
    window.addEventListener('pointercancel', onResizeUp)
  }

  function onResizeMove(event: PointerEvent) {
    if (!dialog) return
    const next = resizeStart.height + (event.clientY - resizeStart.y)
    height.value = Math.min(Math.max(next, minHeight.value), maxHeight.value)
  }

  function onResizeUp() {
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)
    window.removeEventListener('pointercancel', onResizeUp)
  }

  // FLIP: the transform that maps the dialog's resting box onto the trigger's
  // box, given `transform-origin: 0 0`. Measured live because the trigger can
  // be dragged around the desk while the dialog is open.
  function invert(): typeof identity {
    const trigger = props.origin
    if (reduceMotion.value || !dialog || !trigger?.isConnected) return identity

    const last = dialog.getBoundingClientRect()
    const first = trigger.getBoundingClientRect()
    if (!last.width || !last.height) return identity

    return {
      x: first.left - last.left,
      y: first.top - last.top,
      scaleX: first.width / last.width,
      scaleY: first.height / last.height,
    }
  }

  watch(shell, (instance) => {
    if (!instance) {
      phase.value = 'hidden'
      height.value = null
      minHeight.value = 0
      maxHeight.value = 0
      return
    }
    dialog = instance.$el as HTMLElement
    from = invert()
    phase.value = 'visible'
    nextTick(measureHeightBounds)
  })

  const variants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: [0, 1],
      x: [from.x, 0],
      y: [from.y, 0],
      scaleX: [from.scaleX, 1],
      scaleY: [from.scaleY, 1],
      transition: {
        duration: reduceMotion.value ? 0.01 : 0.75,
        ease,
        opacity: {
          duration: reduceMotion.value ? 0.01 : 0.15,
          delay: reduceMotion.value ? 0 : 0.2,
        },
      },
    }),
    exit: () => ({
      ...invert(),
      opacity: 0,
      transition: {
        duration: reduceMotion.value ? 0.01 : 0.5,
        ease,
        opacity: {
          duration: reduceMotion.value ? 0.01 : 0.25,
          delay: reduceMotion.value ? 0 : 0.2,
        },
      },
    }),
  }

  const content = {
    hidden: () => ({
      opacity: 0,
      filter: reduceMotion.value ? 'blur(0px)' : 'blur(10px)',
    }),
    visible: () => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: reduceMotion.value ? 0.01 : 0.35,
        delay: reduceMotion.value ? 0 : 0.2,
        ease,
      },
    }),
    exit: () => ({
      opacity: 0,
      filter: reduceMotion.value ? 'blur(0px)' : 'blur(10px)',
      transition: { duration: reduceMotion.value ? 0.01 : 0.15, ease },
    }),
  }

  let returnFocus: HTMLElement | null = null

  // When the opening click is the first half of a double-click, the second
  // half lands on the dialog (it covers the trigger on narrow screens) and
  // would select a word or follow a link.
  const OPENING_CLICK_MS = 600
  let openedAt = 0

  function swallowOpeningClick(event: MouseEvent) {
    if (event.detail < 2) return
    if (performance.now() - openedAt > OPENING_CLICK_MS) return
    event.preventDefault()
    event.stopPropagation()
  }

  const FOCUSABLE =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

  // Keep Tab inside the panel. Pointer users can still reach the desk behind
  // it (clicking another icon switches panels); keyboard users leave with Esc.
  function trapTab(event: KeyboardEvent) {
    if (!dialog) return
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => el.offsetParent !== null || el === closeButton.value)
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (!first || !last) return

    const active = document.activeElement as HTMLElement | null
    const outside = !active || !dialog.contains(active)
    if (event.shiftKey && (outside || active === first)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (outside || active === last)) {
      event.preventDefault()
      first.focus()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (!props.study) return
    if (event.key === 'Escape') emit('close')
    else if (event.key === 'Tab') trapTab(event)
  }

  async function focusPanel() {
    await nextTick()
    closeButton.value?.focus({ preventScroll: true })
    autoFocused.value = document.activeElement === closeButton.value
  }

  // The trigger keeps focus off itself on mousedown, so document.activeElement
  // is usually <body>; return focus to the icon that opened the panel instead.
  function triggerOf(origin: HTMLElement | null | undefined) {
    return origin?.closest<HTMLElement>('a, button') ?? null
  }

  // Lock the page behind the panel (mostly matters on mobile, where the page
  // itself scrolls).
  useHead({
    htmlAttrs: {
      class: computed(() => (props.study ? 'is-scroll-locked' : undefined)),
    },
  })

  watch(
    () => props.study,
    async (study, previous) => {
      if (study && !previous) {
        openedAt = performance.now()
        returnFocus =
          triggerOf(props.origin) ??
          (document.activeElement as HTMLElement | null)
        await focusPanel()
      } else if (!study && previous) {
        returnFocus?.focus({ preventScroll: true })
        returnFocus = null
      }
    },
  )

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    fineQuery = window.matchMedia('(pointer: fine)')
    finePointer.value = fineQuery.matches
    fineQuery.addEventListener('change', onFineChange)
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', measureHeightBounds)
    // A direct link to /work/[slug] renders the panel open on the server.
    if (props.study) focusPanel()
  })

  function onFineChange(event: MediaQueryListEvent) {
    finePointer.value = event.matches
  }

  onBeforeUnmount(() => {
    clearTimeout(idleTimer)
    onResizeUp()
    fineQuery?.removeEventListener('change', onFineChange)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', measureHeightBounds)
  })
</script>
