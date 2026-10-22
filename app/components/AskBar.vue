<template>
  <!-- Transparent and inert until he's ready (see LittleGuy's "ready"), so
       the bar never appears with an empty or loading avatar. Not
       visibility: hidden, which would stop his video from decoding. -->
  <motion.form
    class="ask-bar"
    aria-label="Ask Mallow"
    :inert="!ready || tucked"
    :initial="{ opacity: 0, filter: 'blur(10px)' }"
    :animate="reveal"
    :class="{ 'is-open': open, 'is-drop-target': dropOver }"
    :style="sprungWidth ? { x, y, scale, width } : { x, y, scale }"
    @pointerdown="startDrag"
    @click.capture="onClick"
    @submit.prevent="submit"
    @keydown.esc="open = false"
  >
    <!-- The conversation, once there is one (the pill grows into a panel). -->
    <!-- The panel grows open: this wrapper animates from no height to the
         conversation's own (and back when it folds), so nothing is scaled
         or squashed. The list inside keeps its padding and scrolling. -->
    <AnimatePresence>
      <motion.div
        v-if="open"
        class="ask-bar__grow"
        :style="{ height: shownHeight }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1, transition: fadeIn }"
        :exit="{ opacity: 0, transition: fadeOut }"
      >
        <!-- No blur on the way in: blurring the whole list while the panel
             springs open was janky. The panel's fade is enough. -->
        <ul
          :ref="trackList"
          class="ask-bar__messages"
          aria-live="polite"
        >
          <li
            v-for="(message, index) in messages"
            :key="index"
            class="ask-bar__message"
            :class="`ask-bar__message--${message.role}`"
          >
            <template v-if="message.role === 'user'">
              <div class="ask-bar__asked">
                <!-- Asked by dropping a desk item on Mallow: that item's
                     picture in a bubble of its own, above the words. -->
                <p
                  v-if="message.chip?.image"
                  class="ask-bar__bubble ask-bar__bubble--image"
                >
                  <img
                    class="ask-bar__chip-image"
                    :src="message.chip.image"
                    :alt="message.chip.label"
                  />
                </p>
                <p class="ask-bar__bubble">{{ message.content }}</p>
              </div>
            </template>
            <template v-else>
              <!-- Mallow's perch; he sits over the latest reply's (below). -->
              <span class="ask-bar__face" />
              <p class="ask-bar__reply">
                <template v-if="message.parts?.length">
                  <!-- Each reveal step is its own span, so it can unblur in. -->
                  <span
                    v-for="(part, step) in message.parts"
                    :key="step"
                    class="ask-bar__char"
                    >{{ part }}</span
                  >
                </template>
                <span
                  v-else-if="!message.content"
                  class="ask-bar__thinking"
                  >{{ message.thinking ?? THINKING[0] }}</span
                >
                <template v-else>{{ message.content }}</template>
              </p>
            </template>
          </li>
          <!-- One Mallow for the whole conversation, over the latest reply's
           perch (talking while it streams). He hops down to each new reply
           rather than reappearing, so his video never restarts. -->
          <motion.li
            v-if="perch"
            class="ask-bar__hopper"
            aria-hidden="true"
            :initial="{ x: perch.x, y: perch.y, opacity: 0 }"
            :animate="hop"
          >
            <span class="ask-bar__hopper-guy">
              <LittleGuy
                :size="3.2"
                :mood="streaming ? 'talking' : 'idle'"
                label=""
              />
            </span>
          </motion.li>
        </ul>
      </motion.div>
    </AnimatePresence>

    <div class="ask-bar__row">
      <span
        v-show="!open"
        class="ask-bar__avatar"
      >
        <span class="ask-bar__guy">
          <LittleGuy
            ref="pillGuy"
            :size="4.2"
            label="Mallow, the site's assistant"
            @ready="ready = true"
          />
        </span>
      </span>
      <span class="ask-bar__field">
        <input
          ref="input"
          v-model="question"
          class="ask-bar__input"
          @scroll.passive="fadeInputEdges"
          @input="fadeInputEdges"
          @keydown="fadeInputEdges"
          @select="fadeInputEdges"
          @click="fadeInputEdges"
          type="text"
          name="question"
          :placeholder="open ? 'Ask a follow-up...' : showHints ? '' : HINTS[0]"
          aria-label="Ask Mallow anything"
          autocomplete="off"
          enterkeyhint="send"
          maxlength="500"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
        <!-- While it's empty and folded, a line that changes every few
           seconds in place of a placeholder (which can't animate). -->
        <span
          v-if="showHints"
          class="ask-bar__hints"
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            <motion.span
              :key="hint"
              class="ask-bar__hint"
              :initial="{ opacity: 1 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0, filter: 'blur(10px)', y: -6 }"
              :transition="{ duration: 0.35, ease }"
            >
              <!-- Coming in, a word at a time (ask-bar-hint-word); going
                   out, the whole line at once. -->
              <span
                v-for="(word, index) in hint.split(' ')"
                :key="index"
                class="ask-bar__hint-word"
                :style="{ '--word': index }"
                >{{ word }}{{ ' ' }}</span
              >
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
      <button
        class="ask-bar__send"
        :class="{ 'is-ready': canSend }"
        type="submit"
        aria-label="Send"
        :disabled="!canSend"
      >
        <img
          class="ask-bar__arrow"
          :src="arrow"
          alt=""
          width="12.8947"
          height="9.73686"
        />
      </button>
    </div>
    <!-- While a desk item is dragged over him. On <body>, so it's drawn
         above the item being dragged (which sits above the bar). -->
    <Teleport to="body">
      <AnimatePresence>
        <motion.span
          v-if="dropOver"
          class="ask-bar__drop-hint"
          :style="dropHintAt"
          aria-hidden="true"
          :initial="{ opacity: 0, y: -4, filter: 'blur(6px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :exit="{ opacity: 0, filter: 'blur(6px)' }"
          :transition="{ duration: reduceMotion ? 0.01 : 0.2 }"
        >
          Drop here to ask Mallow
        </motion.span>
      </AnimatePresence>
    </Teleport>
  </motion.form>
</template>

<style scoped lang="scss">
  :global(html.is-dragging-ask-bar) {
    -webkit-user-select: none;
    user-select: none;
  }

  .ask-bar {
    display: flex;
    flex-direction: column;
    padding: 1.2rem 1.5rem 1.2rem 1.8rem;
    border-radius: 3.2rem;
    // A soft glow from the top centre, fading to black (after Figma
    // 2299:3580, a little brighter and reaching further).
    background: radial-gradient(
      100% 100% at 50% 0%,
      #3a3a3a 0%,
      #1f1f1f 34%,
      #0e0e0e 52%,
      #000 70%
    );
    // The hairline edge is the first, inset shadow rather than a border:
    // a border adds to the height (it's set by the content) and is drawn at
    // a whole pixel in Chrome.
    box-shadow:
      inset 0 0 0 0.5px rgba(255, 255, 255, 0.18),
      0 6.7237rem 7.3684rem 0 rgba(0, 0, 0, 0.2),
      0 1.5018rem 1.6458rem 0 rgba(0, 0, 0, 0.12),
      0 0.4471rem 0.49rem 0 rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(0.5526rem);
    user-select: none;

    // A desk item is being dragged over him: a lime edge to drop onto.
    &.is-drop-target {
      box-shadow:
        inset 0 0 0 1px rgba(210, 249, 118, 0.7),
        0 6.7237rem 7.3684rem 0 rgba(0, 0, 0, 0.2),
        0 1.5018rem 1.6458rem 0 rgba(0, 0, 0, 0.12),
        0 0.4471rem 0.49rem 0 rgba(0, 0, 0, 0.08);
    }
  }

  // Styled as the site's tooltip (TooltipLabel). Placed by dropHintAt.
  .ask-bar__drop-hint {
    position: fixed;
    z-index: var(--zmax);
    padding: 0.4rem 1rem 0.5rem;
    border: 1px solid #000;
    border-radius: 100rem;
    color: #fff;
    background: #000;
    box-shadow:
      0 1px 0 0 rgba(255, 255, 255, 0.4) inset,
      0 2px 3px 0 rgba(0, 0, 0, 0.32);
    font-family: var(--system-font);
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: -0.04rem;
    line-height: 1.4;
    white-space: nowrap;
    // `translate`, not transform: motion animates the transform.
    translate: -50% 0;
    pointer-events: none;
  }

  .ask-bar__asked {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.6rem;
    max-width: 85%;
  }

  .ask-bar__bubble--image {
    display: flex;
    padding: 2rem;
    border-radius: 2.4rem;
  }

  // Framed like the desk file it came from.
  .ask-bar__chip-image {
    display: block;
    width: 7.6rem;
    height: 5.6rem;
    border: 3px solid #fff;
    border-radius: 2px;
    object-fit: cover;
  }

  .ask-bar__row {
    display: flex;
    align-items: center;
    gap: 1rem;

    .is-open > & {
      padding-left: 0.5rem;
    }
  }

  // Bleeds 0.8rem past the content edges (into the bar's padding), and the
  // list pads it back, so Mallow, who's wider than his perch, isn't clipped
  // by the list's scrolling or this wrapper's height animation.
  .ask-bar__grow {
    display: flex;
    // Not stretched to this wrapper's animated height: the list keeps its
    // own, which is what the wrapper grows to.
    align-items: flex-start;
    justify-content: flex-end;
    margin: 0 -0.8rem;
    overflow: hidden;
  }

  // Laid out at the open panel's width from the first frame, pinned to the
  // right (the bar grows leftward): its height is measured to grow open
  // while the width is still animating, and measuring at the narrower
  // width made it open too tall, then settle. --ask-bar-open-width comes
  // from the page; the 1.7rem is the bar's side padding minus the bleed.
  .ask-bar__messages {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 1.6rem;
    position: relative;
    // A string, so Sass passes the calc through instead of evaluating it.
    width: #{'calc(var(--ask-bar-open-width, 100% + 1.7rem) - 1.7rem)'};
    // --ask-bar-room: what the keyboard leaves on phones (fitAboveKeyboard).
    max-height: #{'min(46rem, 50svh, var(--ask-bar-room, 100svh))'};
    // Includes the 1rem above the input, so it grows open with the list.
    padding: 0.3rem 0.8rem 2.6rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }

  // Soft edges where there's more to scroll to, instead of a hard clip. All
  // CSS: the list's own scroll position drives each fade (a scroll-driven
  // animation), so scrolling runs no script and re-renders nothing. The top
  // fades in over the first 2.4rem of scroll, the bottom fades out over the
  // last 2.4rem. A list too short to scroll has no timeline, so no fades.
  // (FADE_PX in the script matches 2.4rem.)
  @property --ask-bar-fade-top {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }

  @property --ask-bar-fade-bottom {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }

  .ask-bar__messages {
    mask-image: linear-gradient(
      to bottom,
      transparent,
      #000 var(--ask-bar-fade-top),
      #000 calc(100% - var(--ask-bar-fade-bottom)),
      transparent
    );
  }

  // Elsewhere the script sets the sizes as it scrolls (fadeEdgesOnScroll).
  @supports (animation-timeline: scroll()) {
    .ask-bar__messages {
      animation:
        ask-bar-fade-top linear both,
        ask-bar-fade-bottom linear both;
      animation-timeline: scroll(self);
      animation-range:
        0 2.4rem,
        calc(100% - 2.4rem) 100%;
    }
  }

  @keyframes ask-bar-fade-top {
    from {
      --ask-bar-fade-top: 0px;
    }

    to {
      --ask-bar-fade-top: 2.4rem;
    }
  }

  @keyframes ask-bar-fade-bottom {
    from {
      --ask-bar-fade-bottom: 2.4rem;
    }

    to {
      --ask-bar-fade-bottom: 0px;
    }
  }

  .ask-bar__message {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
  }

  .ask-bar__message--user {
    justify-content: flex-end;
  }

  .ask-bar__bubble,
  .ask-bar__reply {
    font-family: var(--system-font);
    font-size: 1.6rem;
    font-weight: 550;
    letter-spacing: -0.032rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
    user-select: text;
  }

  .ask-bar__bubble {
    padding: 1.4rem;
    border-radius: 2.1rem;
    color: #e3e3e3;
    background: rgba(255, 255, 255, 0.1);
  }

  .ask-bar__reply {
    flex: 1 0 0;
    min-width: 0;
    // Centres the first line (16px × 1.37 ≈ 22px) on the 24px avatar.
    padding-top: 0.1rem;
    color: #fff;
    line-height: 1.38;
    white-space: pre-wrap;
  }

  // While Mallow waits on the reply: a light that sweeps across the words,
  // the gradient clipped to the text. (reset.scss stops it, and leaves it
  // dim, for reduced motion.)
  .ask-bar__thinking {
    // reset.scss sets spans to normal weight; keep the reply's.
    font-weight: inherit;
    color: transparent;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.45) 40%,
        #fff 50%,
        rgba(255, 255, 255, 0.45) 60%
      )
      0 0 / 250% 100%;
    background-clip: text;
    animation: ask-bar-shimmer 1.6s linear infinite;
  }

  @keyframes ask-bar-shimmer {
    from {
      background-position: 100% 0;
    }

    to {
      background-position: 0 0;
    }
  }

  // Newly revealed characters come in from a blur (reset.scss turns this
  // off for reduced motion). `backwards`, not `both`: a filter left on
  // afterwards, even blur(0), renders text as an image without its font
  // smoothing, so it looked lighter than its real weight. The duration
  // is UNBLUR_MS in the script.
  .ask-bar__char {
    // reset.scss sets spans to normal weight; keep the reply's.
    font-weight: inherit;
    animation: ask-bar-unblur 400ms ease-out backwards;
  }

  @keyframes ask-bar-unblur {
    from {
      opacity: 0;
      filter: blur(10px);
    }

    to {
      opacity: 1;
      filter: blur(0);
    }
  }

  // A 24px slot, like the pill's avatar but smaller.
  .ask-bar__face {
    flex-shrink: 0;
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }

  // Sized like a perch and placed on one by its x/y (see hopTo); squashes
  // from near his feet.
  .ask-bar__hopper {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.4rem;
    height: 2.4rem;
    transform-origin: 50% 90%;
  }

  .ask-bar__hopper-guy {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.2rem;
    transform: translate(-49.3%, -52.7%);
  }

  // A 32px slot; he's drawn a little larger and centred on it, since his
  // video frame has room around him for his breathing.
  .ask-bar__avatar {
    flex-shrink: 0;
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }

  .ask-bar__guy {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-49.3%, -52.7%);
  }

  .ask-bar__field {
    display: flex;
    flex: 1 0 0;
    position: relative;
    min-width: 0;
  }

  .ask-bar__hints {
    display: flex;
    align-items: center;
    position: absolute;
    inset: 0;
    color: #fff;
    font-family: var(--system-font);
    font-size: 1.6rem;
    font-weight: 550;
    letter-spacing: -0.048rem;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    pointer-events: none;
  }

  .ask-bar__hint {
    font-weight: inherit;
    white-space: pre;
  }

  .ask-bar__hint-word {
    display: inline-block;
    font-weight: inherit;
    // A soft ease-out, so each word settles rather than pops.
    animation: ask-bar-hint-word 600ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(var(--word) * 80ms);
  }

  @keyframes ask-bar-hint-word {
    from {
      opacity: 0;
      filter: blur(10px);
      transform: translateY(0.3rem);
    }
  }

  .ask-bar__input {
    flex: 1 0 0;
    min-width: 0;
    padding: 0;
    border: 0;
    color: #fff;
    background: none;
    font-family: var(--system-font);
    font-size: 1.6rem;
    font-weight: 550;
    letter-spacing: -0.048rem;
    line-height: 1;
    outline: none;
    // Soft edges where a long question runs past the field, instead of a
    // hard cut (sizes set by fadeInputEdges).
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 var(--ask-bar-input-fade-left, 0px),
      #000 calc(100% - var(--ask-bar-input-fade-right, 0px)),
      transparent
    );
    user-select: text;

    &::placeholder {
      color: #d2f976;
      opacity: 1;
    }

    .is-open &::placeholder {
      color: #fff;
      opacity: 0.7;
    }
  }

  .ask-bar__send {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 2.8rem;
    height: 2.8rem;
    border: 0;
    border-radius: 10rem;
    background: #d2f976;
    opacity: 0.3;
    // --ease is a whole timing (200ms ease), not just a curve.
    transition: opacity var(--ease);

    &.is-ready {
      opacity: 1;
      cursor: var(--cursor, pointer);
    }

    &:focus-visible {
      outline: 1px solid #d2f976;
      outline-offset: 2px;
    }
  }

  .ask-bar__arrow {
    display: block;
    transform: rotate(-90deg);
  }
</style>

<script setup lang="ts">
  import type { AskDropItem } from '~/composables/useAskDrop'
  import { AnimatePresence, animate, motion, useMotionValue } from 'motion-v'
  import arrow from '~/assets/icons/send-arrow.svg'

  const ease = [0.8, 0, 0.16, 1] as const
  // Opening and folding the panel: one spring for its height and its width,
  // both ways, so they move together. Its bounce would take the height
  // below zero when folding (invalid, so the browser would show it full
  // size for a frame); the height is clamped at zero instead, so it lands.
  // Taller panels get a slower spring: the quick one suits two or three
  // lines, but a long thread would fly open in the same time. A full panel
  // takes about 1s to open and 0.7s to fold (folding has no visible
  // bounce, so it settles sooner for the same spring).
  const GROW_S = 0.35
  const OPEN_MAX_S = 0.5
  const FOLD_MAX_S = 0.55
  function growFor(height: number, maxS: number) {
    const t = Math.min(1, Math.max(0, (height - 120) / 340))
    const visualDuration = GROW_S + (maxS - GROW_S) * t
    return { type: 'spring', bounce: 0.35, visualDuration } as const
  }
  const instant = { duration: 0 }
  const growHeight = useMotionValue(0)
  const shownHeight = useMotionValue(0)
  growHeight.on('change', (h) => shownHeight.set(Math.max(0, h)))
  // The content fades with it; folding, the fade also keeps the panel
  // mounted until the height has sprung shut.
  const fadeIn = computed(() =>
    reduceMotion.value ? instant : { duration: GROW_S * 0.6, ease },
  )
  // As long as the fold's spring for the panel's current height. Kept up to
  // date as it's measured: the panel's exit uses the props it last
  // rendered with, so setting it only as it folds came too late.
  const fadeOut = ref<{ duration: number; ease?: typeof ease }>(instant)

  // The panel's height follows the conversation's, measured as it changes:
  // the spring opens it, then each new line of a streaming reply eases it
  // taller (with plain `auto` it jumped a line at a time). Each measurement
  // starts its own animation: going through a watched value, reopening to
  // the same height as before looked like no change, so it stayed shut.
  const LINE_EASE = { duration: 0.25, ease: 'easeOut' } as const

  let listObserver: ResizeObserver | undefined
  let trackedList: HTMLElement | null = null
  let measureList = () => {}
  // Called with each conversation list as it mounts (and null as it goes),
  // so a list that's still folding away when the panel reopens is never the
  // one measured.
  function trackList(ref: unknown) {
    const el = (ref as { $el?: unknown } | null)?.$el ?? ref
    if (!(el instanceof HTMLElement)) {
      if (trackedList && !trackedList.isConnected) {
        listObserver?.disconnect()
        trackedList = null
      }
      return
    }
    if (el === trackedList) return
    trackedList = el
    listObserver?.disconnect()
    let measured = 0
    const measure = () => {
      const height = el.offsetHeight
      if (!height || height === measured) return
      // The first size opens it (spring); later ones are new lines (ease).
      const opening = !measured
      const grow = growFor(height, OPEN_MAX_S)
      const move = reduceMotion.value ? instant : opening ? grow : LINE_EASE
      measured = height
      animate(growHeight, height, move)
      fadeOut.value = reduceMotion.value
        ? instant
        : { duration: growFor(height, FOLD_MAX_S).visualDuration, ease }
      // The width opens with the height, on the same spring.
      if (opening) springWidth(grow)
    }

    measureList = measure
    listObserver = new ResizeObserver(measure)
    listObserver.observe(el)
    measure()
    fadeEdgesOnScroll(el)
    fitAboveKeyboard()
  }

  // On phones the keyboard, and Safari's form toolbar above it, cover the
  // bottom of the screen; the visual viewport is what's left. The list is
  // capped so the whole panel fits in that, with the same gap as at the
  // sides. (Not with a mouse: there the bar is dragged back inside instead.)
  const KEYBOARD_GAP = 12
  let fitFrame = 0
  function fitAboveKeyboard() {
    fitFrame = 0
    const list = trackedList
    const form = formEl()
    const view = window.visualViewport
    if (!list || !form || !view || draggable.value) return
    // Everything but the conversation: padding and the input row.
    const chrome = form.offsetHeight - (list.parentElement?.offsetHeight ?? 0)
    const top = Math.max(0, form.getBoundingClientRect().top - view.offsetTop)
    const room = view.height - top - chrome - KEYBOARD_GAP
    list.style.setProperty('--ask-bar-room', `${Math.max(0, room)}px`)
  }
  function queueFit() {
    fitFrame ||= requestAnimationFrame(fitAboveKeyboard)
  }

  // The list's soft edges are CSS (a scroll-driven animation) where it's
  // supported. Elsewhere (Safari before 26) its scroll sets the two fade
  // sizes itself: straight onto the list's style, once a frame at most, so
  // scrolling re-renders nothing. Same sizes as the CSS.
  const FADE_PX = 24
  function fadeEdgesOnScroll(el: HTMLElement) {
    if (CSS.supports('animation-timeline: scroll()')) return
    let frame = 0
    const update = () => {
      frame = 0
      const below = el.scrollHeight - el.clientHeight - el.scrollTop
      const top = Math.min(FADE_PX, Math.max(0, el.scrollTop))
      const bottom = Math.min(FADE_PX, Math.max(0, below))
      el.style.setProperty('--ask-bar-fade-top', `${top}px`)
      el.style.setProperty('--ask-bar-fade-bottom', `${bottom}px`)
    }
    const queue = () => (frame ||= requestAnimationFrame(update))
    el.addEventListener('scroll', queue, { passive: true })
    new ResizeObserver(queue).observe(el)
    update()
  }
  // The width (desktop only; on phones the bar spans the screen). The page
  // sets both widths as CSS variables; motion springs between them.
  const width = useMotionValue(0)
  const sprungWidth = ref(false)
  function cssWidths() {
    const form = formEl()
    if (!form) return null
    const style = getComputedStyle(form)
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const closed = parseFloat(style.getPropertyValue('--ask-bar-width'))
    const opened = parseFloat(style.getPropertyValue('--ask-bar-open-width'))
    return closed && opened
      ? { closed: closed * rem, open: opened * rem }
      : null
  }
  function settleWidth() {
    const widths = cssWidths()
    sprungWidth.value = !!widths
    if (widths) width.set(open.value ? widths.open : widths.closed)
  }
  // Which way it widens depends on where it's been dragged to: the layout
  // pins its right edge, so on its own it always grows leftward (and from
  // the left side of the screen, off the edge). In the left third it moves
  // right by the whole change in width, so its left edge holds still; in the
  // middle by half, so it grows from its centre; in the right third not at
  // all. On the same spring as the width, so the held edge stays put.
  const SHIFT_SETTLE_MS = 1200
  let shiftingUntil = 0
  function widthShare() {
    const bar = formEl()?.getBoundingClientRect()
    if (!bar) return 0
    const middle = (bar.left + bar.width / 2) / window.innerWidth
    return middle < 1 / 3 ? 1 : middle < 2 / 3 ? 0.5 : 0
  }
  function springWidth(spring: ReturnType<typeof growFor>) {
    const widths = cssWidths()
    if (!widths) return
    const target = open.value ? widths.open : widths.closed
    const shift = (target - width.get()) * widthShare()
    if (reduceMotion.value) {
      width.set(target)
      x.set(x.get() + shift)
      return
    }
    animate(width, target, spring)
    if (!shift) return
    animate(x, x.get() + shift, spring)
    // Keep-inside's sideways correction would cut the shift short; it
    // checks again after.
    shiftingUntil = performance.now() + SHIFT_SETTLE_MS
    setTimeout(keepInside, SHIFT_SETTLE_MS)
  }
  const ready = ref(false)
  const reduceMotion = ref(false)

  // On desktop an open case study covers the top right, where the bar sits
  // until it's dragged away. While it's there it fades out under the panel,
  // and back when the panel closes; dragged elsewhere, it stays.
  const props = defineProps<{ covered?: boolean }>()
  const wide = ref(false)
  const atHome = ref(true)
  const tucked = computed(() => props.covered && wide.value && atHome.value)
  // The bar's fade in. A computed, not an object in the template, so it's
  // the same object across re-renders.
  const reveal = computed(() =>
    tucked.value
      ? {
          opacity: 0,
          filter: 'blur(10px)',
          // A beat after the panel starts opening over it.
          transition: reduceMotion.value
            ? { duration: 0.01 }
            : { duration: 0.3, delay: 0.12, ease },
        }
      : ready.value
        ? {
            opacity: 1,
            filter: 'blur(0px)',
            // Any filter left on, even blur(0px), stops the bar's own
            // backdrop-filter from seeing the page behind it.
            transitionEnd: { filter: 'none' },
            transition: { duration: reduceMotion.value ? 0.01 : 0.6, ease },
          }
        : { opacity: 0, filter: 'blur(10px)' },
  )

  // With a mouse or trackpad the bar drags around the desk like the icons
  // (same bounds and feel as DeskItem). Not on touch, where it's full width.
  // Drags start anywhere but the text field and the send button.
  // Not motion's `drag`: that gives the bar a layout projection, which
  // clears the transform to measure the layout on every re-render. Chrome
  // puts it back before painting, but Safari and Firefox showed the bar back
  // in its layout spot for a frame (closing the panel re-renders it a few
  // times, so it flickered). So the drag is done here, on motion values.
  const { surface } = useDesk()

  // Drag bounds: the desk, for the bar at its current size. x/y are where
  // it's been dragged to, relative to its place in the layout.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  // Still in its place in the layout (see `tucked`).
  const trackHome = () =>
    (atHome.value = Math.abs(x.get()) < 1 && Math.abs(y.get()) < 1)
  x.on('change', trackHome)
  y.on('change', trackHome)
  const bounds = ref({ top: 0, left: 0, right: 0, bottom: 0 })

  function formEl() {
    return input.value?.closest('form') ?? null
  }

  function measureBounds() {
    const form = formEl()
    const desk = surface.value
    if (!form || !desk) return
    // Where it can be dragged, thrown and grown: the desk, less a margin
    // along every edge so it never sits flush against the screen's edge.
    // The margin matches its starting gap from the right, so its starting
    // spot is just inside. Only with a mouse or trackpad, the only time it
    // moves; on touch it spans the screen.
    const rem = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    )
    const edge = draggable.value ? EDGE_REM * rem : 0
    // offsetLeft/Top ignore the drag transform: the bar's spot in the layout.
    bounds.value = {
      left: -form.offsetLeft + edge,
      top: -form.offsetTop + edge,
      right: desk.clientWidth - form.offsetLeft - form.offsetWidth - edge,
      bottom: desk.clientHeight - form.offsetTop - form.offsetHeight - edge,
    }
  }
  const EDGE_REM = 1.2

  // When it grows (opening, a longer reply) or the window shrinks, glide
  // back inside if it now hangs off an edge. Not while it's being dragged.
  let dragging = false
  function keepInside() {
    measureBounds()
    if (dragging) return
    // Mid-shift (springWidth) only the up-down correction runs.
    const shifting = performance.now() < shiftingUntil
    const { left, right, top, bottom } = bounds.value
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), Math.max(min, max))
    const tx = clamp(x.get(), left, right)
    const ty = clamp(y.get(), top, bottom)
    const glide = { type: 'spring', stiffness: 260, damping: 30 } as const
    if (tx !== x.get() && !shifting)
      animate(x, tx, reduceMotion.value ? { duration: 0 } : glide)
    if (ty === y.get()) return
    // While the panel's height is animating, follow it exactly: near the
    // bottom of the screen it then grows upward, its bottom edge held at
    // the bottom of the desk (a spring of its own lagged, then overshot).
    if (reduceMotion.value || growHeight.isAnimating()) y.set(ty)
    else animate(y, ty, glide)
  }

  let resizeObserver: ResizeObserver | undefined
  onMounted(() => {
    const form = formEl()
    if (form) {
      resizeObserver = new ResizeObserver(keepInside)
      resizeObserver.observe(form)
    }
    window.addEventListener('resize', keepInside)
    window.addEventListener('resize', settleWidth)
    window.visualViewport?.addEventListener('resize', queueFit)
    window.visualViewport?.addEventListener('scroll', queueFit)
    settleWidth()
    measureBounds()
  })
  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    listObserver?.disconnect()
    window.removeEventListener('resize', keepInside)
    window.removeEventListener('resize', settleWidth)
    window.visualViewport?.removeEventListener('resize', queueFit)
    window.visualViewport?.removeEventListener('scroll', queueFit)
    cancelAnimationFrame(fitFrame)
  })
  const draggable = ref(false)
  let dragged = false

  // The feel: it lifts a little while held, gives a little past the edges
  // (the elastic), and is thrown on release, springing back inside.
  const DRAG_THRESHOLD = 3
  const ELASTIC = 0.12
  const LIFT = { type: 'spring', stiffness: 400, damping: 30 } as const

  function startDrag(event: PointerEvent) {
    dragged = false
    if (!draggable.value || event.button !== 0) return
    if ((event.target as Element).closest('input, button')) return
    // The press would also start selecting text across the page. Turn
    // selection off until it's released (cancelling the press instead
    // stops the input from taking focus).
    const root = document.documentElement
    root.classList.add('is-dragging-ask-bar')
    window.getSelection()?.removeAllRanges()

    const from = { x: x.get(), y: y.get() }
    const press = { x: event.clientX, y: event.clientY }
    // Past an edge it only follows a fraction of the way.
    const give = (value: number, min: number, max: number) =>
      value < min
        ? min + (value - min) * ELASTIC
        : value > max
          ? max + (value - max) * ELASTIC
          : value

    function move(e: PointerEvent) {
      const dx = e.clientX - press.x
      const dy = e.clientY - press.y
      if (!dragging) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
        dragging = dragged = true
        x.stop()
        y.stop()
        measureBounds()
        animate(scale, 1.04, LIFT)
      }
      const { left, right, top, bottom } = bounds.value
      x.set(give(from.x + dx, left, Math.max(left, right)))
      y.set(give(from.y + dy, top, Math.max(top, bottom)))
    }
    function release() {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      root.classList.remove('is-dragging-ask-bar')
      if (!dragging) return
      dragging = false
      animate(scale, 1, LIFT)
      throwInside()
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
  }

  // Let go, it carries on a little with the drag's speed (power, as motion's
  // own drag throw), then springs to rest inside the bounds, back in from
  // an edge it was pulled or thrown past. (Not an inertia animation: motion
  // skips those when they start and end on the same value.)
  const THROW_POWER = 0.18
  function throwInside() {
    measureBounds()
    if (reduceMotion.value) return keepInside()
    const { left, right, top, bottom } = bounds.value
    const glide = (value: typeof x, min: number, max: number) => {
      const velocity = value.getVelocity()
      const target = value.get() + velocity * THROW_POWER
      animate(value, Math.min(Math.max(target, min), Math.max(min, max)), {
        type: 'spring',
        velocity,
        stiffness: 260,
        damping: 30,
        restDelta: 0.5,
      })
    }
    glide(x, left, right)
    glide(y, top, bottom)
  }

  // Letting go after a drag isn't a click (no hop from the little guy).
  function onClick(event: MouseEvent) {
    if (!dragged) return
    event.preventDefault()
    event.stopPropagation()
    dragged = false
  }

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    draggable.value = window.matchMedia('(pointer: fine)').matches
    const wideQuery = window.matchMedia('(min-width: 700px)')
    wide.value = wideQuery.matches
    wideQuery.addEventListener('change', (e) => (wide.value = e.matches))
  })

  // Mallow's chat (server/api/ask.post.ts): the pill grows into a panel with
  // the conversation, and his reply streams in while he talks.
  type Message = {
    role: 'user' | 'assistant'
    content: string
    // A reply as it was revealed, piece by piece (for the unblur).
    parts?: string[]
    // What Mallow says while the reply is on its way.
    thinking?: string
    // Asked by dropping a desk item on him: the item, and what he's really
    // asked (the bubble has a line like "Tell me about …", see dropLine).
    chip?: { label: string; image?: string | null }
    prompt?: string
  }

  // A different one each time (never the same twice in a row).
  const THINKING = [
    'Mallow is thinking…',
    'Rummaging through the desk…',
    'Fluffing up an answer…',
    'Mulling it over…',
    'Checking the desk drawers…',
  ]
  let lastThinking = -1
  function pickThinking() {
    let index = Math.floor(Math.random() * THINKING.length)
    if (index === lastThinking) index = (index + 1) % THINKING.length
    lastThinking = index
    return THINKING[index]!
  }

  const question = ref('')
  const messages = ref<Message[]>([])
  const open = ref(false)
  const streaming = ref(false)
  const input = useTemplateRef<HTMLInputElement>('input')

  // A question longer than the field scrolls inside it. Fade whichever end
  // has text hidden past it, sized by how much is (up to INPUT_FADE_PX), the
  // way the conversation's edges fade. Checked a frame after each change,
  // once the caret has moved and the field has scrolled to it.
  const INPUT_FADE_PX = 20
  let inputFrame = 0
  function fadeInputEdges() {
    inputFrame ||= requestAnimationFrame(() => {
      inputFrame = 0
      const el = input.value
      if (!el) return
      // Rounded: at the end there can be a fraction of a pixel left over.
      const past = Math.floor(el.scrollWidth - el.clientWidth - el.scrollLeft)
      const left = Math.min(INPUT_FADE_PX, Math.max(0, el.scrollLeft))
      const right = Math.min(INPUT_FADE_PX, Math.max(0, past))
      el.style.setProperty('--ask-bar-input-fade-left', `${left}px`)
      el.style.setProperty('--ask-bar-input-fade-right', `${right}px`)
    })
  }
  // Sending clears it, and losing focus scrolls it back to the start.
  watch(question, fadeInputEdges, { flush: 'post' })
  const canSend = computed(
    () => question.value.trim().length > 0 && !streaming.value,
  )
  let controller: AbortController | undefined

  const SORRY =
    "I'm having trouble answering right now. You can always reach Matt at matt@ohiosveryown.co."
  const BUSY =
    "I've answered a lot of questions in a row! Give me a few minutes, or email Matt at matt@ohiosveryown.co."

  function scrollToEnd() {
    nextTick(() => {
      const el = input.value
        ?.closest('form')
        ?.querySelector<HTMLElement>('.ask-bar__messages')
      if (el) el.scrollTop = el.scrollHeight
      // Also called as a reply grows, so keep the panel's height in step
      // (alongside the ResizeObserver).
      measureList()
    })
  }

  // Mallow's position: the latest reply's perch (its top-left, inside the
  // message list's scrolling content). A new reply makes him hop there: a
  // crouch, an arc up and over, and a squash on landing.
  type Point = { x: number; y: number }
  const perch = ref<Point | null>(null)
  const hop = ref<Record<string, unknown>>({})
  const HOP_S = 0.6

  function latestPerch(): Point | null {
    const slots = input.value
      ?.closest('form')
      ?.querySelectorAll<HTMLElement>('.ask-bar__face')
    const slot = slots?.[slots.length - 1]
    return slot ? { x: slot.offsetLeft, y: slot.offsetTop } : null
  }

  function hopTo() {
    const to = latestPerch()
    if (!to) return
    const from = perch.value
    perch.value = to
    if (from && from.x === to.x && from.y === to.y) return
    if (!from) {
      // First reply: he arrives with the site's usual unblur.
      hop.value = {
        x: to.x,
        y: to.y,
        opacity: [0, 1],
        filter: ['blur(10px)', 'blur(0px)'],
        transitionEnd: { filter: 'none' },
        transition: { duration: reduceMotion.value ? 0.01 : 0.5, ease },
      }
      return
    }
    if (reduceMotion.value) {
      hop.value = { x: to.x, y: to.y, transition: { duration: 0 } }
      return
    }
    const peak = Math.min(from.y, to.y) - 28
    hop.value = {
      x: [from.x, to.x],
      y: [from.y, from.y + 3, peak, to.y, to.y],
      scaleX: [1, 1.14, 0.9, 1.12, 0.96, 1],
      scaleY: [1, 0.82, 1.12, 0.86, 1.04, 1],
      opacity: 1,
      transition: {
        x: { duration: HOP_S * 0.7, delay: HOP_S * 0.15, ease: 'easeInOut' },
        // Crouch, rise, fall, land (at 85%), then settle.
        y: {
          duration: HOP_S,
          times: [0, 0.15, 0.5, 0.85, 1],
          ease: ['easeOut', 'easeOut', 'easeIn', 'linear'],
        },
        scaleX: { duration: HOP_S, times: [0, 0.15, 0.4, 0.85, 0.93, 1] },
        scaleY: { duration: HOP_S, times: [0, 0.15, 0.4, 0.85, 0.93, 1] },
      },
    }
  }

  // A new reply: hop once it's in the list. Reopening the panel remounts
  // the list, so he starts fresh (no hop from nowhere).
  watch(
    () => messages.value.length,
    () => nextTick(hopTo),
  )
  // Opening starts from nothing: the list's first size then springs the
  // height and width open (see trackList). Folding springs both shut.
  watch(open, (isOpen) => {
    if (isOpen) return growHeight.set(0)
    const fold = growFor(growHeight.get(), FOLD_MAX_S)
    springWidth(fold)
    animate(growHeight, 0, reduceMotion.value ? instant : fold)
  })
  watch(open, (isOpen) => {
    perch.value = null
    if (isOpen) {
      nextTick(hopTo)
    } else {
      listObserver?.disconnect()
      trackedList = null
    }
  })

  function reopen() {
    if (messages.value.length) open.value = true
  }

  // The folded bar's hint, in place of a placeholder: a few lines in turn,
  // every few seconds, while it's empty. Paused while it has focus; the
  // drag hint only where dragging onto Mallow works. Reduced motion keeps
  // the first line.
  const HINTS = [
    "What's Matt up to?",
    'Psst, ask me anything',
    'Drag a file here…',
    'I get paid by the hour',
  ]
  const HINT_MS = 5500
  const focused = ref(false)
  const hintIndex = ref(0)
  const hints = computed(() =>
    draggable.value ? HINTS : HINTS.filter((line) => !line.startsWith('Drag')),
  )
  const hint = computed(() => hints.value[hintIndex.value % hints.value.length])
  const showHints = computed(() => !open.value && !question.value)
  let hintTimer: ReturnType<typeof setInterval> | undefined
  // Also paused while a desk file is held over the bar, about to be dropped.
  const fileOver = useAskDrop().over
  watchEffect(() => {
    clearInterval(hintTimer)
    const paused = focused.value || fileOver.value || reduceMotion.value
    if (!ready.value || !showHints.value || paused) return
    hintTimer = setInterval(() => (hintIndex.value += 1), HINT_MS)
  })
  onBeforeUnmount(() => clearInterval(hintTimer))

  function onInputFocus() {
    focused.value = true
    reopen()
  }

  // Replies arrive in bursts of words; show them a character at a time at
  // a steady pace instead, catching up if a lot is waiting. Resolves once
  // everything pushed has been shown.
  const CHAR_MS = 24
  // How long each character takes to unblur (ask-bar-unblur in the styles).
  const UNBLUR_MS = 400
  // Whole characters, not UTF-16 units: slicing a string can cut an emoji
  // in half, which shows as a broken glyph.
  const graphemes =
    typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? (text: string) =>
          Array.from(new Intl.Segmenter().segment(text), (s) => s.segment)
      : (text: string) => Array.from(text)

  function typeInto(message: Message) {
    let queue: string[] = []
    let timer: ReturnType<typeof setInterval> | undefined
    let drained: (() => void) | undefined
    function step() {
      const count = Math.max(1, Math.ceil(queue.length / 40))
      const piece = queue.slice(0, count).join('')
      message.content += piece
      message.parts?.push(piece)
      queue = queue.slice(count)
      scrollToEnd()
      if (!queue.length) {
        clearInterval(timer)
        timer = undefined
        drained?.()
      }
    }
    return {
      push(text: string) {
        // A reply can open with a blank line or two; the reply keeps line
        // breaks (pre-wrap), so they'd show as extra space above it.
        if (!message.content && !queue.length) text = text.trimStart()
        if (!text) return
        if (reduceMotion.value) {
          message.content += text
          scrollToEnd()
          return
        }
        queue.push(...graphemes(text))
        timer ??= setInterval(step, CHAR_MS)
      },
      done() {
        return queue.length
          ? new Promise<void>((r) => (drained = r))
          : undefined
      },
      stop() {
        clearInterval(timer)
        queue = []
      },
    }
  }

  function submit() {
    if (!canSend.value) return
    const text = question.value.trim()
    question.value = ''
    return ask({ role: 'user', content: text })
  }

  async function ask(question: Message) {
    const history = [...messages.value, question]
    messages.value = [
      ...history,
      { role: 'assistant', content: '', parts: [], thinking: pickThinking() },
    ]
    const reply = messages.value.at(-1)!
    open.value = true
    streaming.value = true
    scrollToEnd()

    const typer = typeInto(reply)
    controller = new AbortController()
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only finished turns; the server keeps the last few.
        body: JSON.stringify({
          messages: history.map(({ role, content, prompt }) => ({
            role,
            content: prompt ?? content,
          })),
        }),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        typer.push(res.status === 429 ? BUSY : SORRY)
        await typer.done()
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let received = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        received += chunk
        typer.push(chunk)
      }
      if (!received.trim()) typer.push(SORRY)
      // He keeps talking until the last character is on screen.
      await typer.done()
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        typer.stop()
      } else {
        typer.push(SORRY)
        await typer.done()
      }
    } finally {
      // Likewise a trailing line break, as space below it.
      reply.content = reply.content.trimEnd()
      streaming.value = false
      controller = undefined
      scrollToEnd()
      // Without scrolling: on desktop the page is its own scroll box, and
      // with the bar near the bottom the grown panel's input sat below it,
      // so focusing scrolled the whole page.
      input.value?.focus({ preventScroll: true })
      // Once the last character has unblurred, back to plain text: kept as
      // spans, reopening the panel replayed every one's unblur at once,
      // hundreds in a long thread, and the panel stuttered open.
      setTimeout(() => (reply.parts = undefined), UNBLUR_MS)
    }
  }

  // Dragging a desk item onto him (useAskDrop). While one is over the bar
  // it lifts a little and he hops; dropped, he's asked about it.
  const {
    over: dropOver,
    dropped,
    setTarget,
    targetRect: dropTargetRect,
  } = useAskDrop()
  const pillGuy = useTemplateRef<{ hop: () => void }>('pillGuy')
  // Centred under the bar, where the bar is when the item arrives.
  const dropHintAt = ref({ top: '0px', left: '0px' })
  watch(dropOver, (isOver) => {
    // As measured when the drag began (see useAskDrop).
    const bar = dropTargetRect()
    if (isOver && bar) {
      dropHintAt.value = {
        top: `${bar.bottom + 8}px`,
        left: `${bar.left + bar.width / 2}px`,
      }
    }
    if (reduceMotion.value) return
    animate(scale, isOver ? 1.03 : 1, LIFT)
    if (isOver && !open.value) pillGuy.value?.hop()
  })
  // The visitor's line under a dropped item's picture, so a run of drops
  // doesn't read "Tell me about…" every time (never the same twice in a row).
  const DROP_LINES = {
    study: [
      'Tell me about {name}',
      "What's the story with {name}?",
      'Give me the gist of {name}',
      "What's {name} all about?",
      'Sum up {name} for me',
    ],
    track: [
      "What's {name}?",
      'Tell me about {name}',
      'What do you make of {name}?',
      'Is {name} any good?',
      "Why's Matt listening to {name}?",
    ],
  } as const
  let lastDropLine = ''
  function dropLine(item: AskDropItem) {
    const lines = DROP_LINES[item.kind]
    let line = lines[Math.floor(Math.random() * lines.length)]!
    if (line === lastDropLine) {
      line = lines[(lines.indexOf(line) + 1) % lines.length]!
    }
    lastDropLine = line
    return line.replace('{name}', item.name)
  }

  watch(dropped, (drop) => {
    if (!drop || streaming.value) return
    ask({
      role: 'user',
      content: dropLine(drop.item),
      chip: { label: drop.item.label, image: drop.item.image },
      prompt: drop.item.prompt,
    })
  })
  onMounted(() => setTarget(formEl()))
  onBeforeUnmount(() => setTarget(null))

  // A click anywhere else on the page folds the panel back into the pill.
  function onDocumentPointer(event: PointerEvent) {
    const form = input.value?.closest('form')
    if (form?.contains(event.target as Node)) {
      pressingInside = true
      return
    }
    if (open.value && form) open.value = false
  }

  // On phones, closing the keyboard (Safari's Done, or swiping it away)
  // folds the panel too. The text field losing focus is the sign, unless a
  // tap inside the panel did that (sending, or scrolling the conversation,
  // also dismisses the keyboard), so taps inside are tracked until just
  // after they lift.
  let pressingInside = false
  let liftedAt = 0
  function onDocumentLift() {
    if (!pressingInside) return
    pressingInside = false
    liftedAt = performance.now()
  }
  function onInputBlur() {
    focused.value = false
    fadeInputEdges()
    foldWithKeyboard()
  }
  function foldWithKeyboard() {
    if (draggable.value || !open.value) return
    if (pressingInside || performance.now() - liftedAt < 500) return
    open.value = false
  }
  onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointer, true)
    document.addEventListener('pointerup', onDocumentLift, true)
    document.addEventListener('pointercancel', onDocumentLift, true)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointer, true)
    document.removeEventListener('pointerup', onDocumentLift, true)
    document.removeEventListener('pointercancel', onDocumentLift, true)
    controller?.abort()
  })
</script>
