<template>
  <!-- The page behind, dimmed and out of reach while a panel is open;
       clicking it closes. -->
  <AnimatePresence>
    <motion.div
      v-if="study"
      class="desk-dialog__scrim"
      aria-hidden="true"
      @click="emit('close')"
      :initial="{ opacity: 0 }"
      :animate="{
        opacity: 1,
        transition: { duration: reduceMotion ? 0.01 : 0.4 },
      }"
      :exit="{
        opacity: 0,
        transition: {
          duration: reduceMotion ? 0.01 : 0.3,
          delay: reduceMotion ? 0 : 0.25,
        },
      }"
    />
  </AnimatePresence>

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
        <button
          ref="closeButton"
          class="desk-dialog__close"
          type="button"
          aria-label="Close"
          :class="{ 'is-focused': autoFocused, 'is-scrolled': scrolled }"
          @blur="autoFocused = false"
          @click="emit('close')"
        >
          <span class="desk-dialog__close-label">Close</span>
        </button>
        <div
          ref="body"
          class="desk-dialog__body"
          @scroll.passive="onScroll"
        >
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
            <!-- The open post is the page's main content, so its title is
                 the h1 (pages/index.vue drops its own while one is open).
                 The intro is a standfirst, not a heading. -->
            <p
              v-if="study.intro"
              class="desk-dialog__intro"
            >
              {{ study.intro }}
            </p>
            <h1
              :id="`${study.slug}-title`"
              class="desk-dialog__overline"
            >
              {{ study.title }}
            </h1>
            <dl class="desk-dialog__details">
              <div
                v-for="detail in details"
                :key="detail.label"
                class="desk-dialog__row"
              >
                <dt class="desk-dialog__label">{{ detail.label }}</dt>
                <!-- The summary: cut short with a "More" that shows the rest
                     (and "Less" to put it back). -->
                <dd
                  v-if="detail.summary"
                  :ref="(el) => (summaryEl = el as HTMLElement | null)"
                  class="desk-dialog__value desk-dialog__summary"
                >
                  {{ summaryOpen ? detail.value : shortSummary }}
                  <button
                    v-if="shortSummary !== detail.value"
                    class="desk-dialog__more"
                    type="button"
                    :aria-expanded="summaryOpen"
                    @click="summaryOpen = !summaryOpen"
                  >
                    {{ summaryOpen ? 'Less' : 'More' }}
                  </button>
                </dd>
                <dd
                  v-else
                  class="desk-dialog__value"
                >
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
                  class="desk-dialog__image desk-dialog__image--body"
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
                  class="desk-dialog__image desk-dialog__image--body"
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
                <!-- One level under the title: Craft's Heading is an h2,
                     its Subheading an h3 (the classes keep the data's
                     names). -->
                <h2
                  v-else-if="node.kind === 'h3'"
                  class="desk-dialog__h3"
                  v-html="node.html"
                />
                <h3
                  v-else-if="node.kind === 'h4'"
                  class="desk-dialog__h4"
                  v-html="node.html"
                />
                <!-- Three dots between sections; a solid rule before the
                     notes. -->
                <hr
                  v-else-if="node.kind === 'break'"
                  class="desk-dialog__break"
                  :class="{ 'is-rule': opensNotes(study.body, index) }"
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
                <!-- Closes the post and asks Mallow (Craft: a link to the
                     site with ?ask=). -->
                <button
                  v-else-if="node.kind === 'ask'"
                  class="desk-dialog__ask"
                  type="button"
                  @click="emit('ask', node.question)"
                >
                  <img
                    class="desk-dialog__ask-guy"
                    src="/little-guy/rest-sm.webp"
                    alt=""
                  />
                  {{ node.label }}
                </button>
                <blockquote
                  v-else-if="node.kind === 'quote'"
                  class="desk-dialog__quote"
                  v-html="node.html"
                />
                <p
                  v-else
                  class="desk-dialog__para"
                  :class="{ 'is-bold': isAllBold(node.html) }"
                  v-html="node.html"
                />
              </template>
              <!-- On every post, below everything else (the footnotes,
                   usually): a rule like the one above them, then how the
                   post was made. -->
              <hr class="desk-dialog__break is-rule" />
              <p class="desk-dialog__note">
                The ideas and opinions in this post are mine. Claude helps with
                research.
              </p>
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
      width: min(66rem, calc(100% - 3.2rem));
      min-height: 0;
      aspect-ratio: 4 / 3.45;
    }

    // Centred on the page, as in the Figma dialog (94rem wide at 1440).
    // Insets all round plus auto margins centre it without a transform
    // (motion owns the transform for the open/close FLIP). That needs a set
    // height: most of the screen (88svh), and never less than enough for
    // the cover (16 / 10) to sit as far from the bottom as from the sides.
    // 6.85rem is where the cover starts (padding, close button and gap) and
    // the cover is 87% of the width (the body's side padding, below), so
    // 6.1rem each side. 65% of the screen wide, between 80rem and 112rem,
    // so it grows on very large screens.
    @include breakpoint(lg) {
      --dialog-width: min(clamp(80rem, 65.3vw, 112rem), 100vw - 3.2rem);

      inset: 0;
      margin: auto;
      width: var(--dialog-width);
      height: max(
        88svh,
        calc(6.85rem + var(--dialog-width) * 0.87 * 10 / 16 + 6.1rem)
      );
      max-height: calc(100% - 1.6rem);
      aspect-ratio: auto;
    }

    &.is-resized {
      aspect-ratio: auto;
    }
  }

  // Clear on phones, where the panel nearly fills the screen and the bright
  // desk around it marks its edge; it still keeps taps off the desk.
  .desk-dialog__scrim {
    position: fixed;
    inset: 0;
    z-index: calc(var(--zmax) - 2);
    cursor: var(--cursor);

    @include breakpoint(md) {
      background: rgba(0, 0, 0, 0.5);
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
    // Extra room above and below images in the body, on top of the flow.
    --around-image: 1.6rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
    // The top clears the close button (2rem down, 2.8rem tall) by the gap.
    padding: 6.8rem 2.4rem 8rem;
    scrollbar-width: none;
    overflow-y: auto;
    overscroll-behavior: contain;

    // Images run 87% of the dialog's width (818 of 940 in Figma), centred.
    @include breakpoint(md) {
      padding-right: 6.5%;
      padding-left: 6.5%;
    }

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

  .desk-dialog__details {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin: 0;
    padding: 0.4rem 0 0.8rem;
  }

  .desk-dialog__row {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
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
    font-family: var(--text-font);
    font-weight: 400;
    line-height: 1.11;
    text-transform: uppercase;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    @include breakpoint(md) {
      width: 17.4rem;
    }
  }

  .desk-dialog__value {
    flex: 1 0 0;
    min-width: 0;
    margin: 0;
    font-family: var(--text-font);
    font-weight: 500;
    letter-spacing: -0.013rem;
    line-height: 1.11;
    text-transform: capitalize;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
  }

  // Sentence case and looser lines than the other values: it's prose.
  .desk-dialog__summary {
    line-height: 1.38;
    text-transform: none;
  }

  // The light grey of the labels and captions (white at 0.8, as a color
  // here so the underline matches).
  .desk-dialog__more {
    padding: 0;
    color: rgba(255, 255, 255, 0.8);
    background: none;
    font: inherit;
    text-decoration-line: underline;
    text-underline-offset: 0.15em;
    cursor: var(--cursor);
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

  // Below the cover: 5.6rem from the caption, counting the body's gap.
  .desk-dialog__figure + .desk-dialog__article {
    margin-top: 1.6rem;
    @include breakpoint(md) {
      margin-top: 3.6rem;
    }
  }

  .desk-dialog__figure {
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  // Under the cover, and under images in the body (an italic line right
  // after one in Craft).
  .desk-dialog__caption {
    margin: 1.6rem auto 0;
    max-width: 100%;
    opacity: 0.8;
    font-family: var(--text-font);
    font-size: 1.2rem;
    letter-spacing: -0.014rem;
    line-height: 1.5;
    text-align: center;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    @include breakpoint(md) {
      max-width: 80%;
      font-size: 1.4rem;
    }
  }

  // Under its image (past the flow's gap and the image's extra room),
  // keeping that extra room below it instead.
  .desk-dialog__caption--body {
    margin: calc(1.6rem - var(--flow) - var(--around-image)) auto
      var(--around-image);
  }

  .desk-dialog__image {
    width: 100%;
    height: auto;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.06);
  }

  // Images and video in the body get more room than the flow between text
  // blocks, so text doesn't crowd them.
  .desk-dialog__image--body {
    margin: var(--around-image) 0;

    // Back to back, the room between them counts once (flex margins don't
    // collapse).
    & + & {
      margin-top: 0;
    }
  }

  .desk-dialog__image--hero {
    background: #fff;
    aspect-ratio: 408 / 280;
    object-fit: cover;

    // A touch flatter in the wide, centred panel.
    @include breakpoint(lg) {
      aspect-ratio: 16 / 10;
    }
  }

  // Heads the detail rows, as in the Figma dialog: 3.6rem under the intro
  // and 1.2rem over the first rule (the flow's gap, and the rows' top
  // padding, pulled in).
  .desk-dialog__overline {
    margin: calc(3.6rem - var(--flow)) 0 calc(1.2rem - var(--flow) - 0.4rem);
    font-family: var(--text-font);
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: -0.014rem;
    line-height: 1.5;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
  }

  .desk-dialog__intro {
    font-family: var(--text-font);
    font-size: 2.2rem;
    font-weight: 600;
    letter-spacing: -0.0875rem;
    line-height: 1.16;
    text-wrap: pretty;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    @include breakpoint(md) {
      font-size: 2.8rem;
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
  // Craft's divider: three Blush asterisks, as in Figma. An <hr> still,
  // for screen readers; the asterisks are drawn in it.
  .desk-dialog__break {
    display: flex;
    justify-content: center;
    align-self: center;
    margin: 0.5rem auto;
    width: auto;
    height: auto;
    border: 0;
    overflow: visible;

    // The blush mixin isn't injected into components (only grid.scss is),
    // and a pseudo-element can't take the .blush class: its stack as is,
    // like ContactButton's.
    &::before {
      content: '***';
      font-family: 'blush', var(--system-font);
      font-synthesis: none;
      color: rgba(255, 255, 255, 0.5);
      font-size: 2.4rem;
      font-weight: 500;
      letter-spacing: 0.06rem;
      line-height: 0.8;
      text-box-edge: cap alphabetic;
      text-box-trim: trim-both;
      font-variation-settings:
        'wdth' 100,
        'HGHT' 0;
    }

    // Before the notes: a hairline across the text column instead.
    &.is-rule {
      align-self: stretch;
      width: auto;
      height: 0;
      margin: 0.5rem 0;
      border-top: 0.5px solid rgba(255, 255, 255, 0.35);
      background: none;

      &::before {
        content: none;
      }
    }
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
    color: rgba(255, 255, 255, 0.9);
    font-family: var(--text-font);
    font-size: 1.6rem;
    letter-spacing: -0.018rem;
    line-height: 1.5;
    text-wrap: pretty;
    @include breakpoint(md) {
      font-weight: 440;
      font-size: 1.8rem;
      line-height: 1.35;
    }

    // Bold all the way through in Craft: set tighter, like a heading.
    &.is-bold {
      line-height: 1.3;
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
    font-weight: 500;
    color: #fff;
    letter-spacing: -0.005em;
  }

  // From md, images and video run the body's full width and the text sits
  // in a centred column inside them: 651 of 818 in Figma.
  .desk-dialog__overline,
  .desk-dialog__intro,
  .desk-dialog__details,
  .desk-dialog__h3,
  .desk-dialog__h4,
  .desk-dialog__para,
  .desk-dialog__quote,
  .desk-dialog__note,
  .desk-dialog__break.is-rule,
  .desk-dialog__caption--body {
    @include breakpoint(md) {
      --text-width: 79.6%;

      margin-right: max(0rem, calc((100% - var(--text-width)) / 2));
      margin-left: max(0rem, calc((100% - var(--text-width)) / 2));
    }
  }

  // Asks Mallow, at the end of a post: a grey pill with Mallow in it,
  // centred.
  .desk-dialog__ask {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.8rem;
    margin: 0.8rem auto 0;
    padding: 0.6rem 1.6rem 0.6rem 1.2rem;
    border-radius: 100rem;
    color: #fff;
    background: #323232;
    font-family: var(--text-font);
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.016rem;
    line-height: 1.3;
    transition: background var(--ease);
    cursor: var(--cursor);

    &:hover,
    &:focus-visible {
      background: #404040;
    }
  }

  .desk-dialog__ask-guy {
    width: 3.2rem;
    height: 3.2rem;
    object-fit: contain;
  }

  // A "Close" pill (the label), centred at the top, over a band of black
  // that fades out below it, so the copy scrolls away under it.
  .desk-dialog__close {
    display: block;
    position: absolute;
    top: 2rem;
    left: 50%;
    z-index: var(--z2);
    color: #fff;
    transform: translateX(-50%);
    cursor: var(--cursor);

    // The band: wider than any dialog (the dialog clips it to its corners),
    // from the dialog's top edge down past the pill. Only once the copy has
    // scrolled; at the top it would just shade the cover.
    &::before {
      content: '';
      position: absolute;
      top: -2rem;
      left: 50%;
      z-index: -1;
      width: 100vw;
      height: 14rem;
      opacity: 0;
      // Solid behind the pill, then an eased fade (a smoothstep-like curve
      // in stops) so it doesn't end in a hard edge.
      background: linear-gradient(
        #000 44%,
        rgba(0, 0, 0, 0.738) 51.4%,
        rgba(0, 0, 0, 0.541) 60.4%,
        rgba(0, 0, 0, 0.382) 68.2%,
        rgba(0, 0, 0, 0.278) 73.9%,
        rgba(0, 0, 0, 0.194) 79%,
        rgba(0, 0, 0, 0.126) 83.8%,
        rgba(0, 0, 0, 0.075) 88.1%,
        rgba(0, 0, 0, 0.042) 91.7%,
        rgba(0, 0, 0, 0.021) 94.6%,
        rgba(0, 0, 0, 0.008) 97.1%,
        rgba(0, 0, 0, 0.002) 98.9%,
        transparent
      );
      transform: translateX(-50%);
      transition: opacity var(--ease);
      pointer-events: none;
    }

    &.is-scrolled::before {
      opacity: 1;
    }

    &:focus-visible,
    &.is-focused {
      outline: 1px solid rgba(255, 255, 255, 0.32);
      outline-offset: 2px;
      border-radius: 100rem;
    }
  }

  .desk-dialog__close-label {
    display: block;
    padding: 0.8rem 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.56);
    border-radius: 100rem;
    background: #000;
    font-family: var(--text-font);
    font-size: 1.4rem;
    letter-spacing: -0.014rem;
    line-height: 1.5;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
  }
</style>

<script setup lang="ts">
  import { motion, AnimatePresence } from 'motion-v'
  import type { ComponentPublicInstance } from 'vue'
  import type { BodyNode, CaseStudy } from '#shared/types/case-study'

  const props = defineProps<{
    study: CaseStudy | null
    origin?: HTMLElement | null
  }>()
  const emit = defineEmits<{ close: []; ask: [question: string] }>()

  type Detail = {
    label: string
    value: string
    href?: string
    summary?: boolean
  }

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
    if (study.summary) {
      rows.push({ label: 'Summary', value: study.summary, summary: true })
    }
    return rows
  })

  // About three lines of the summary at full width, cut at a word, until
  // "More" shows the rest. Closed again for each post. Small screens'
  // narrow column would take twice that, so there it's measured: as many
  // words as fit in three lines, "… More" included (see fitSummary).
  const SUMMARY_CHARS = 200
  const SUMMARY_LINES = 3
  const summaryOpen = ref(false)
  const summaryWords = ref<number | null>(null)
  let summaryEl: HTMLElement | null = null
  const shortSummary = computed(() => {
    const text = props.study?.summary ?? ''
    const words = text.split(/\s+/)
    if (summaryWords.value !== null) {
      if (summaryWords.value >= words.length) return text
      return cutSummary(words, summaryWords.value)
    }
    if (text.length <= SUMMARY_CHARS) return text
    const cut = text.slice(0, SUMMARY_CHARS)
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`
  })

  function cutSummary(words: string[], count: number) {
    return `${words
      .slice(0, count)
      .join(' ')
      .replace(/[,;:.\s]+$/, '')}…`
  }

  // Tried out in a hidden copy of the summary at its width: the whole text,
  // or else the most words that, with "… More", stay within three lines.
  function fitSummary() {
    const el = summaryEl
    const text = props.study?.summary ?? ''
    if (window.matchMedia('(min-width: 700px)').matches || !el || !text) {
      summaryWords.value = null
      return
    }
    if (summaryOpen.value) return
    const words = text.split(/\s+/)
    const probe = el.cloneNode(false) as HTMLElement
    probe.style.cssText = `position: absolute; visibility: hidden; width: ${el.clientWidth}px`
    // Scoped styles: the button needs the component's data-v attribute.
    const button = document.createElement('button')
    for (const { name } of el.attributes) {
      if (name.startsWith('data-v-')) button.setAttribute(name, '')
    }
    button.className = 'desk-dialog__more'
    button.textContent = 'More'
    const content = document.createTextNode('')
    probe.append(content)
    el.after(probe)
    const max =
      Number.parseFloat(getComputedStyle(el).lineHeight) * SUMMARY_LINES + 1
    const fits = (shown: string, withMore: boolean) => {
      content.textContent = withMore ? `${shown} ` : shown
      if (withMore) probe.append(button)
      else button.remove()
      return probe.getBoundingClientRect().height <= max
    }
    let count = words.length
    if (!fits(text, false)) {
      let low = 0
      let high = words.length - 1
      while (low < high) {
        const mid = Math.ceil((low + high) / 2)
        if (fits(cutSummary(words, mid), true)) low = mid
        else high = mid - 1
      }
      count = low
    }
    probe.remove()
    summaryWords.value = count
  }

  watch(
    () => props.study?.id,
    () => {
      summaryOpen.value = false
      summaryWords.value = null
      nextTick(fitSummary)
    },
  )
  watch(summaryOpen, (open) => {
    if (!open) nextTick(fitSummary)
  })

  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)

  // A break that leads into the notes: the next thing is a note, or a
  // heading (like "Notes & references") right before one.
  function opensNotes(body: BodyNode[], index: number) {
    const next = body[index + 1]
    if (next?.kind === 'note') return true
    const heading = next?.kind === 'h3' || next?.kind === 'h4'
    return heading && body[index + 2]?.kind === 'note'
  }

  // One <strong> wrapping the whole paragraph.
  function isAllBold(html: string) {
    return /^<strong>(?:(?!<\/?strong>)[\s\S])*<\/strong>$/.test(html.trim())
  }

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
  const scrolled = ref(false)
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
    scrolled.value = (body.value?.scrollTop ?? 0) > 0
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
      phase.value = 'hidden'
      scrolled.value = false
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

  // Keep Tab inside the panel. The scrim keeps pointers off the desk behind
  // it; everyone leaves with Esc, the close button or a click on the scrim.
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
    window.addEventListener('resize', fitSummary)
    nextTick(fitSummary)
    // A direct link to /work/[slug] renders the panel open on the server.
    if (props.study) focusPanel()
  })

  function onFineChange(event: MediaQueryListEvent) {
    finePointer.value = event.matches
  }

  onBeforeUnmount(() => {
    clearTimeout(idleTimer)
    if (tooltipTimer) {
      clearTimeout(tooltipTimer)
      suppressTooltip(false)
    }
    onResizeUp()
    fineQuery?.removeEventListener('change', onFineChange)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', measureHeightBounds)
    window.removeEventListener('resize', fitSummary)
  })
</script>
