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
      :aria-label="study.title"
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
            <!-- html is rendered and sanitized on the server -->
            <figcaption
              v-if="study.hero.caption"
              class="desk-dialog__caption"
              v-html="study.hero.caption"
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
            <div
              class="desk-dialog__copy"
              @click="followFootnote"
            >
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
                <!-- Silent loops: muted, looping, playing inline. With
                     reduced motion they wait, with controls, to be played. -->
                <video
                  v-else-if="node.kind === 'video'"
                  class="desk-dialog__image"
                  :src="node.src"
                  :style="
                    node.aspectRatio
                      ? { aspectRatio: node.aspectRatio }
                      : undefined
                  "
                  :autoplay="!reduceMotion"
                  :controls="reduceMotion"
                  muted
                  loop
                  playsinline
                  preload="metadata"
                  :aria-hidden="!reduceMotion"
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
                <!-- Three dots between sections. -->
                <hr
                  v-else-if="node.kind === 'break'"
                  class="desk-dialog__break"
                />
                <p
                  v-else-if="node.kind === 'note'"
                  :id="`fn-${node.n}`"
                  class="desk-dialog__note"
                >
                  <a
                    class="desk-dialog__note-back"
                    :href="`#fnref-${node.n}`"
                    :data-fn-back="node.n"
                    :aria-label="`Back to note ${node.n} in the text`"
                    >{{ node.n }}</a
                  >
                  <span v-html="node.html" />
                </p>
                <p
                  v-else-if="node.kind === 'caption'"
                  class="desk-dialog__caption desk-dialog__caption--body"
                  v-html="node.html"
                />
                <blockquote
                  v-else-if="node.kind === 'quote'"
                  class="desk-dialog__quote"
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
    // The system stack: San Francisco on Apple devices, Segoe UI on
    // Windows, Roboto on Android. Nothing to download, and real italics.
    --text-font: var(--system-font);

    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: calc(var(--zmax) - 1);
    top: 0.8rem;
    right: 0.8rem;
    left: 0.8rem;
    // Bottom inset matches the 0.8rem top inset.
    max-height: calc(100% - 1.2rem);
    border: 0.5px solid rgba(255, 255, 255, 0.26);
    border-radius: 3.5rem;
    color: #fff;
    background: #000;
    box-shadow:
      0 7.3rem 8rem 0 rgba(0, 0, 0, 0.2),
      0 1.6rem 1.7rem 0 rgba(0, 0, 0, 0.12),
      0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(6px);
    transform-origin: 0 0;
    overflow: hidden;

    @include breakpoint(md) {
      left: auto;
      width: min(58rem, calc(100% - 3.2rem));
      min-height: 0;
      aspect-ratio: 4 / 3.45;
    }

    // Centred on the page, and wider, with images at full width and the
    // text in a narrower column (see the inset rule below). Insets all round
    // plus auto margins centre it without a transform (motion owns the
    // transform for the open/close FLIP). That needs a set height: just tall
    // enough for the cover (always 408 / 280) to sit as far from the bottom
    // as from the sides. 7.31rem is where the cover starts (top padding,
    // file name and gap), 2.45rem the side inset (padding plus border), and
    // the cover is the width less both side insets. Half the screen wide,
    // between 72rem and 100rem, so it grows on very large screens.
    @include breakpoint(lg) {
      --dialog-width: min(clamp(72rem, 50vw, 100rem), 100vw - 3.2rem);

      inset: 0;
      margin: auto;
      width: var(--dialog-width);
      height: calc(
        7.31rem + (var(--dialog-width) - 4.9rem) * 280 / 408 + 2.45rem
      );
      max-height: calc(100% - 1.6rem);
      aspect-ratio: auto;
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
    // The rhythm of everything after the cover: between the intro, details
    // and copy, and between paragraphs, images and headings. The gap below
    // the cover is a step bigger.
    --flow: 2rem;

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
    // With the body's 2rem gap, 3.1rem from the file name's baseline to the
    // cover, as in the Figma dialog.
    margin-bottom: 1.1rem;
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

  .desk-dialog__details {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    margin: 0;
    padding: var(--flow) 0;
  }

  .desk-dialog__row {
    display: flex;
    align-items: flex-start;
    gap: 1.8rem;
    padding-top: 1.4rem;
    background: repeating-linear-gradient(
        to right,
        #fff 0 1px,
        transparent 1px 3px
      )
      top / 100% 0.5px no-repeat;
    font-size: 1.4rem;

    &:last-child {
      padding-bottom: 1.4rem;
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
      width: 14rem;
    }
  }

  .desk-dialog__value {
    flex: 1 0 0;
    min-width: 0;
    margin: 0;
    font-family: var(--text-font);
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.11;
    text-transform: uppercase;
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
    gap: var(--flow);
  }

  // Below the cover: 1.25 × the flow (3.5rem), on top of the body's gap.
  .desk-dialog__figure + .desk-dialog__article {
    margin-top: calc(var(--flow) * 1.25 - 2rem);
  }

  .desk-dialog__figure {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  // Under the cover, and under images in the body (an italic line right
  // after one in Craft).
  .desk-dialog__caption {
    margin: 1rem auto 0;
    max-width: 100%;
    text-align: center;
    opacity: 0.6;
    font-family: var(--text-font);
    font-size: 1.2rem;
    line-height: 1.3;
    @include breakpoint(md) {
      max-width: 80%;
      font-size: 1.4rem;
    }
  }

  // In the body, pulled up under its image (past the flow's gap).
  .desk-dialog__caption--body {
    margin: calc(1rem - var(--flow)) auto 0;
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
    font-family: var(--text-font);
    font-size: 2.1rem;
    font-weight: 600;
    letter-spacing: -0.04rem;
    line-height: 1.2;
    text-wrap: pretty;
    @include breakpoint(md) {
      font-size: 2.4rem;
    }
  }

  .desk-dialog__copy {
    display: flex;
    flex-direction: column;
    gap: var(--flow);
  }

  .desk-dialog__h3,
  .desk-dialog__h4 {
    font-family: var(--text-font);
    font-weight: 600;
    text-wrap: balance;

    &:not(:first-child) {
      margin-top: var(--flow);
    }
  }

  // A heading sits close to the text it introduces: a tighter gap than the
  // flow between blocks (the copy's gap, pulled in).
  .desk-dialog__h3 + .desk-dialog__para,
  .desk-dialog__h4 + .desk-dialog__para {
    margin-top: calc(1.2rem - var(--flow));
  }

  .desk-dialog__h3 {
    font-size: 2.3rem;
    letter-spacing: -0.03rem;
    line-height: 1.3;
  }

  .desk-dialog__h4 {
    font-size: 2rem;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  // Footnote markers in the text (rendered on the server, so :deep).
  .desk-dialog__copy :deep(.fn-ref) {
    margin-left: 0.1em;
    font-size: 0.72em;
    line-height: 0;
    vertical-align: super;
    color: rgba(255, 255, 255, 0.64);
    opacity: 1 !important;
  }

  .desk-dialog__copy :deep(.fn-ref a) {
    padding: 0 0.1em;
    text-decoration: none;
  }

  // The notes they link to: small and muted, numbered, closely spaced.
  .desk-dialog__note {
    display: flex;
    gap: 0.8rem;
    margin: 0;
    opacity: 0.6;
    font-family: var(--text-font);
    font-size: 1.4rem;
    line-height: 1.45;

    & + & {
      margin-top: calc(1rem - var(--flow));
    }
  }

  .desk-dialog__note-back {
    flex-shrink: 0;
    min-width: 1.6rem;
    color: #fff;
    text-decoration: none;
    font-variant-numeric: tabular-nums;
  }

  // Three dots, centred: one dot repeated across a box three steps wide.
  .desk-dialog__break {
    align-self: center;
    width: 3.6rem;
    height: 0.4rem;
    margin: 0.5rem auto;
    border: 0;
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.35) 0.2rem,
        transparent 0.22rem
      )
      0 0 / 1.2rem 0.4rem repeat-x;
  }

  .desk-dialog__quote {
    margin: 0;
    padding-left: 1.6rem;
    border-left: 2px solid rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.7);
    font-family: var(--text-font);
    font-size: 1.5rem;
    font-weight: 450;
    letter-spacing: -0.005em;
    line-height: 1.4;

    @include breakpoint(md) {
      text-wrap: pretty;
      font-size: 1.7rem;
    }
  }

  .desk-dialog__para {
    margin: 0;
    font-family: var(--text-font);
    font-size: 1.6rem;
    line-height: 1.45;
    text-wrap: balance;
    opacity: 0.88;
    @include breakpoint(md) {
      font-weight: 430;
      font-size: 1.8rem;
    }
  }
  // A paragraph bold all the way through in Craft: in the site's lime.

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
    letter-spacing: -0.005em;
  }

  // On the wider centred dialog, images and video run the full width and
  // the text sits in a narrower column inside them: 56.7rem wide on a 72rem
  // dialog (inset 5.2rem each side). As the dialog grows, the column grows
  // by a quarter as much, so lines stay a comfortable length (63.7rem at
  // the 100rem maximum). 100% is the full inner width.
  .desk-dialog__intro,
  .desk-dialog__details,
  .desk-dialog__h3,
  .desk-dialog__h4,
  .desk-dialog__para,
  .desk-dialog__quote,
  .desk-dialog__note,
  .desk-dialog__caption--body {
    @include breakpoint(lg) {
      --text-width: calc(56.7rem + (var(--dialog-width) - 72rem) / 4);

      margin-right: max(5.2rem, calc((100% - var(--text-width)) / 2));
      margin-left: max(5.2rem, calc((100% - var(--text-width)) / 2));
    }
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
  import { motion, AnimatePresence, animate, motionValue } from 'motion-v'
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
        label: 'Topic(s)',
        value: study.disciplines.join(', '),
      })
    }
    return rows
  })

  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)

  // Footnotes: a marker in the text scrolls to its note, and a note's number
  // back to the marker. Within the panel, not by URL hash, which would move
  // the page and change the route.
  function followFootnote(event: MouseEvent) {
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[data-fn], a[data-fn-back]',
    )
    const copy = event.currentTarget as HTMLElement
    if (!link) return
    event.preventDefault()
    const n = link.dataset.fn ?? link.dataset.fnBack
    const target = link.dataset.fn
      ? copy.querySelector(`#fn-${n}`)
      : copy.querySelector(`a[data-fn="${n}"]`)
    target?.scrollIntoView({
      block: 'center',
      behavior: reduceMotion.value ? 'auto' : 'smooth',
    })
  }
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
    if (!hinting) rememberScrolled()
  }

  // The cover can fill the panel exactly, so it may not look scrollable.
  // Until someone has scrolled a panel themselves (since the page last
  // loaded), each one nudges its content up a little after opening, then
  // settles back. Any input during the nudge stops it where it is.
  const HINT_PX = 64
  const HINT_DELAY_MS = 900
  // Shared app state, not storage: kept across panels and route changes,
  // reset by a reload.
  const scrolledOnce = useState('desk-dialog:scrolled', () => false)
  let hinting = false
  let hintTimer: ReturnType<typeof setTimeout> | undefined
  let hintAnimation: ReturnType<typeof animate> | undefined
  const HINT_STOPPERS = ['wheel', 'touchstart', 'pointerdown', 'keydown']

  function rememberScrolled() {
    scrolledOnce.value = true
  }

  function scheduleHint() {
    clearTimeout(hintTimer)
    if (reduceMotion.value || scrolledOnce.value) return
    hintTimer = setTimeout(hintScroll, HINT_DELAY_MS)
  }

  function hintScroll() {
    const el = body.value
    if (!el || el.scrollTop > 0) return
    if (el.scrollHeight - el.clientHeight < HINT_PX) return

    hinting = true
    const offset = motionValue(0)
    offset.on('change', (value) => (el.scrollTop = value))
    hintAnimation = animate(offset, [0, HINT_PX, HINT_PX, 0], {
      duration: 1.5,
      times: [0, 0.35, 0.5, 1],
      ease: 'easeInOut',
      onComplete: endHint,
    })
    for (const type of HINT_STOPPERS)
      el.addEventListener(type, stopHint, { passive: true })
  }

  function stopHint() {
    hintAnimation?.stop()
    endHint()
  }

  function endHint() {
    hintAnimation = undefined
    for (const type of HINT_STOPPERS)
      body.value?.removeEventListener(type, stopHint)
    // The last scroll events of the nudge arrive a frame after it ends.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        hinting = false
      }),
    )
  }

  function cancelHint() {
    clearTimeout(hintTimer)
    hintAnimation?.stop()
    hintAnimation = undefined
    hinting = false
    for (const type of HINT_STOPPERS)
      body.value?.removeEventListener(type, stopHint)
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

  // Large screens centre the dialog (see the lg styles), so it grows from
  // the middle, both ways.
  function isCentered() {
    return window.matchMedia('(min-width: 1200px)').matches
  }

  function measureHeightBounds() {
    if (!dialog) return
    // Max height leaves the same gap below as the dialog has above (0.8rem
    // each way when centred, matching its CSS max-height).
    const top = isCentered()
      ? Number.parseFloat(getComputedStyle(document.documentElement).fontSize) *
        0.8
      : Number.parseFloat(getComputedStyle(dialog).top) || 0
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
    // Centred, the bottom edge only moves half as far as the height changes,
    // so double it to keep the edge under the pointer.
    const pull = (event.clientY - resizeStart.y) * (isCentered() ? 2 : 1)
    const next = resizeStart.height + pull
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
      cancelHint()
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
    scheduleHint()
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

  // While the panel grows out of its item, it passes in and out from under a
  // still pointer, and the item's tooltip comes back each time the item is
  // under it; once the panel covers it, Safari sends nothing to take the
  // tooltip away again. So none show until it has opened.
  let tooltipTimer: ReturnType<typeof setTimeout> | undefined
  function holdTooltips() {
    suppressTooltip(true)
    clearTimeout(tooltipTimer)
    tooltipTimer = setTimeout(
      () => suppressTooltip(false),
      reduceMotion.value ? 0 : 800,
    )
  }

  watch(
    () => props.study,
    async (study, previous) => {
      if (study && !previous) {
        openedAt = performance.now()
        holdTooltips()
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
    cancelHint()
    if (tooltipTimer) {
      clearTimeout(tooltipTimer)
      suppressTooltip(false)
    }
    onResizeUp()
    fineQuery?.removeEventListener('change', onFineChange)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', measureHeightBounds)
  })
</script>
