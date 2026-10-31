<template>
  <!-- The Post Office (Figma 2449:12259): a sheet everyone stamps. Pick a
       postmark in the tray, then click the sheet; it says where you are
       and when, and stays for every visitor after. -->
  <!-- The page behind, out of reach while it's open, as behind a post's
       panel (DeskDialog): all black on small screens (Figma 2469:19954),
       dimmed from md. Clicking it closes. -->
  <AnimatePresence>
    <motion.div
      v-if="open"
      class="post-office-overlay"
      aria-hidden="true"
      @click="open = false"
      :initial="{ opacity: 0 }"
      :animate="{
        opacity: 1,
        // Settling in as the window grows (0.75s), not ahead of it.
        transition: reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.6, delay: 0.2, ease },
      }"
      :exit="{
        opacity: 0,
        transition: { duration: reduceMotion ? 0.01 : 0.3, ease },
      }"
    />
  </AnimatePresence>
  <AnimatePresence>
    <motion.section
      v-if="open"
      ref="shell"
      class="post-office"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-office-title"
      :variants="variants"
      initial="hidden"
      :animate="phase"
      exit="exit"
      @pointermove="onAim"
      @pointerleave="onLeave"
    >
      <!-- Grows out of the desk icon and back into it, like a post's panel
           (DeskDialog); its contents fade in once it's open. -->
      <motion.div
        class="post-office__content"
        :variants="content"
      >
        <h2
          id="post-office-title"
          class="visually-hidden"
        >
          Greetings
        </h2>
        <!-- The stamp, and washi tape to come (Figma 2449:12695). -->
        <div
          class="post-office__toolbar"
          role="toolbar"
          aria-label="Tools"
        >
          <button
            class="post-office__tool is-selected"
            type="button"
            aria-pressed="true"
            aria-label="Stamp"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                fill="#2E2F34"
                d="M14 14a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1 0-1h11a.5.5 0 0 1 .5.5ZM13 8H9.47l.99-4.58A2 2 0 0 0 8.5 1h-1a2 2 0 0 0-1.96 2.42L6.53 8H3a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z"
              />
            </svg>
          </button>
          <!-- aria-disabled, not disabled: a disabled button gets no pointer
               events, and it needs them for its tooltip. -->
          <button
            class="post-office__tool"
            type="button"
            aria-disabled="true"
            aria-label="Washi tape – coming soon"
            data-tip="Washi tape – coming soon"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="#2E2F34"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M13.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
              <path d="M9.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
              <path d="M7 14.5h7.5" />
            </svg>
          </button>
        </div>

        <button
          ref="closeButton"
          class="post-office__close"
          type="button"
          @click="open = false"
        >
          Close
        </button>

        <!-- The sheets, once there's more than one (the last being where
             stamps go), coming in as the first fills; hovering says how
             many stamps there are and from where. -->
        <AnimatePresence>
          <motion.div
            v-if="pages > 1"
            class="post-office__dots"
            role="group"
            :aria-label="`Sheets: ${countText}`"
            :data-tip="countText"
            :initial="{ opacity: 0, scale: 0.6, filter: blur(10) }"
            :animate="{
              opacity: 1,
              scale: 1,
              filter: blur(0),
              transitionEnd: { filter: 'none' },
              transition: reduceMotion
                ? { duration: 0.01 }
                : { type: 'spring', stiffness: 400, damping: 28 },
            }"
            :exit="{
              opacity: 0,
              scale: 0.6,
              filter: blur(10),
              transition: { duration: reduceMotion ? 0.01 : 0.2 },
            }"
          >
            <button
              v-for="page in dotPages"
              :key="page"
              class="post-office__dot"
              :class="{ 'is-current': page === viewing }"
              type="button"
              :aria-label="`Sheet ${page + 1} of ${pages}`"
              :aria-current="page === viewing ? 'page' : undefined"
              @click="goTo(page)"
            />
          </motion.div>
        </AnimatePresence>

        <div
          ref="sheetEl"
          class="post-office__sheet"
          role="button"
          tabindex="0"
          :aria-label="`Stamp a ${selected.name} postmark`"
          :aria-disabled="!sheet"
          @pointerdown="onStamp"
          @keydown.enter.prevent="stampSomewhere"
          @keydown.space.prevent="stampSomewhere"
        >
          <!-- The stamp in hand, as the pointer: a layer of its own over the
             sheet, shown only while stamping. Safari only updates the
             cursor when the element under the pointer changes, not when a
             class does, so near Close and the tools this goes and the
             site's cursor comes back. -->
        <div
          v-show="aim && !near && onLast"
          class="post-office__hand"
          :class="{ 'is-pressing': pressing }"
          aria-hidden="true"
        />

        <!-- One sheet at a time, sliding over to the next. -->
          <AnimatePresence
            :custom="direction"
            :initial="false"
          >
            <motion.div
              :key="viewing"
              class="post-office__page"
              :custom="direction"
              :variants="slide"
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div
                v-for="mark in shown"
                :key="`${mark.seed}-${mark.at}`"
                class="post-office__mark"
                :style="markStyle(mark)"
                :initial="
                  stampedHere.has(mark.seed)
                    ? { opacity: 0, scale: reduceMotion ? 1 : 1.25 }
                    : false
                "
                :animate="{
                  opacity: 1,
                  scale: 1,
                  transition: reduceMotion
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 700, damping: 34 },
                }"
              >
                <PostmarkArt
                  :type="mark.type"
                  :mark="mark"
                  :ink="inkOf(mark)"
                  :serial="mark.id"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <!-- Where the next one would land (the pointer is the stamp),
               trailing the pointer a little, like the desk's tooltips. -->
          <motion.div
            v-if="aim && sheet && onLast"
            class="post-office__aim"
            :style="{ x: aimX, y: aimY }"
            aria-hidden="true"
          >
            <!-- Put away near Close and the tools. -->
            <AnimatePresence>
              <motion.span
                v-if="!near && !full"
                class="post-office__mark post-office__mark--ghost"
                :style="
                  markStyle(
                    { type: selected.id, size: stampSize, x: 0, y: 0, seed: 0 },
                    false,
                  )
                "
                :initial="{ opacity: 0, scale: 0.6, filter: blur(10) }"
                :animate="{
                  opacity: 0.5,
                  scale: 1,
                  filter: blur(0),
                  transition: { duration: reduceMotion ? 0.01 : 0.25, ease },
                }"
                :exit="{
                  opacity: 0,
                  scale: 0.6,
                  filter: blur(10),
                  transition: { duration: reduceMotion ? 0.01 : 0.2, ease },
                }"
              >
                <PostmarkArt
                  :type="selected.id"
                  :mark="preview"
                  :ink="inkAt(ink)"
                  :serial="preview.id"
                  even
                />
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <!-- Past STAMPS_MAX lately: a word at the pointer, like the desk's
               tooltips, in place of a stamp. -->
          <AnimatePresence>
            <motion.div
              v-if="resting"
              class="post-office__tip post-office__tip--rest"
              :style="{ x: aimX, y: aimY }"
              role="status"
              :initial="{ opacity: 0, scale: 0.5, filter: blur(20), rotate: 10 }"
              :animate="{
                opacity: 1,
                scale: 1,
                filter: blur(0),
                rotate: 0,
                transition: { duration: reduceMotion ? 0.01 : 0.3 },
              }"
              :exit="{
                opacity: 0,
                scale: 0.5,
                filter: blur(20),
                transition: { duration: reduceMotion ? 0.01 : 0.15 },
              }"
            >
              The ink needs to dry for a bit
            </motion.div>
          </AnimatePresence>
        </div>

        <!-- What a control is, at the pointer (data-tip). -->
        <AnimatePresence>
          <motion.div
            v-if="tip"
            class="post-office__tip"
            :class="{ 'is-flipped': tip.flip, 'is-up': tip.up }"
            :style="{ left: `${tip.x}px`, top: `${tip.y}px` }"
            aria-hidden="true"
            :initial="{ opacity: 0, scale: 0.5, filter: blur(20), rotate: 10 }"
            :animate="{
              opacity: 1,
              scale: 1,
              filter: blur(0),
              rotate: 0,
              transition: { duration: reduceMotion ? 0.01 : 0.3 },
            }"
            :exit="{
              opacity: 0,
              scale: 0.5,
              filter: blur(20),
              transition: { duration: reduceMotion ? 0.01 : 0.15 },
            }"
          >
            {{ tip.text }}
          </motion.div>
        </AnimatePresence>

        <div class="post-office__tools">
          <!-- The postmarks as die-cut stickers (Figma 2457:17679), tucked
               into a bar along the bottom, all tilted: lifting a little
               under the pointer, and the one in hand lifted further. Scrolls
               sideways when they don't fit, fading at an edge with more past
               it. -->
          <div class="post-office__tray">
            <div
              ref="trayList"
              class="post-office__tray-list"
              :style="{
                '--fade-start': moreBefore ? '3.2rem' : '0px',
                '--fade-end': moreAfter ? '3.2rem' : '0px',
              }"
              role="radiogroup"
              aria-label="Postmarks"
              @scroll.passive="onTrayScroll"
            >
              <motion.button
                v-for="type in POSTMARKS"
                :key="type.id"
                class="post-office__type"
                :class="{ 'is-selected': type.id === selected.id }"
                :style="{
                  '--slot': `${STICKER_SLOTS[type.id] / 10}rem`,
                  '--room': `${(STICKER_ROOM[type.id] ?? 0) / 10}rem`,
                }"
                :initial="false"
                :animate="stickerPose(type.id)"
                :transition="
                  reduceMotion
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 420, damping: 28 }
                "
                type="button"
                role="radio"
                :aria-checked="type.id === selected.id"
                :aria-label="type.name"
                @pointerenter="onSticker($event, type.id)"
                @pointerleave="hovered = null"
                @click="selectedId = type.id"
              >
                <PostmarkSticker
                  class="post-office__sticker"
                  :type="type.id"
                  :ink="ink"
                  :mark="preview"
                  :serial="preview.id"
                />
              </motion.button>
            </div>
          </div>

          <!-- Under the dock (Figma 2465:19327): the stamp's size, a slider
               from small to large, and its ink, a few colours to pick from
               like FigJam's. -->
          <div class="post-office__menu">
            <div class="post-office__pill post-office__pill--size">
              <!-- The small and large stamps step the size down and up. -->
              <button
                class="post-office__size-step"
                type="button"
                aria-label="Smaller"
                @click="stepSize(-1)"
              >
                <svg
                  class="post-office__size-icon"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M12 11.92a.33.33 0 0 1-.33.33H4.33a.33.33 0 0 1 0-.67h7.34c.18 0 .33.15.33.34Zm-.67-4H8.98l.66-3.06a1.33 1.33 0 0 0-1.31-1.61h-.66a1.33 1.33 0 0 0-1.31 1.61l.65 3.06H4.67a.67.67 0 0 0-.67.66v1.67c0 .37.3.67.67.67h6.66c.37 0 .67-.3.67-.67V8.58a.67.67 0 0 0-.67-.66Z" />
                </svg>
              </button>
              <div
                ref="sizeTrack"
                class="post-office__size-track"
                role="slider"
                tabindex="0"
                aria-label="Stamp size"
                :aria-valuemin="STAMP_SIZE.min"
                :aria-valuemax="STAMP_SIZE.max"
                :aria-valuenow="stampSize"
                :aria-valuetext="`${Math.round(stampSize * 100)}%`"
                :style="{ '--size': sizeShare }"
                @pointerdown="onSizeDown"
                @keydown="onSizeKey"
              >
                <span class="post-office__size-fill" />
                <span class="post-office__size-thumb" />
              </div>
              <button
                class="post-office__size-step"
                type="button"
                aria-label="Larger"
                @click="stepSize(1)"
              >
                <svg
                  class="post-office__size-icon"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M13 12.96a.42.42 0 0 1-.42.42H3.42a.42.42 0 0 1 0-.84h9.16c.23 0 .42.19.42.42Zm-.83-5H9.23l.82-3.82a1.67 1.67 0 0 0-1.63-2.01h-.84a1.67 1.67 0 0 0-1.63 2.01l.82 3.82H3.83a.83.83 0 0 0-.83.83v2.08c0 .46.37.84.83.84h8.34c.46 0 .83-.38.83-.84V8.79a.83.83 0 0 0-.83-.83Z" />
                </svg>
              </button>
            </div>

            <div class="post-office__pill post-office__pill--inks">
              <div
                ref="inkTrack"
                class="post-office__ink-track"
                role="slider"
                tabindex="0"
                aria-label="Ink colour"
                aria-valuemin="0"
                aria-valuemax="1"
                :aria-valuenow="ink"
                :aria-valuetext="inkAt(ink)"
                :style="{ '--ink-place': ink, background: INK_GRADIENT }"
                @pointerdown="onInkDown"
                @keydown="onInkKey"
              >
                <span class="post-office__ink-thumb" />
              </div>
            </div>

            <!-- From md: a different postmark, size and ink at random
                 (Figma 2478:21645). -->
            <button
              class="post-office__pill post-office__shuffle"
              type="button"
              aria-label="Shuffle mark, size, and color"
              data-tip="Shuffle mark, size, and color"
              @click="shuffle()"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M14.85 11.15a.5.5 0 0 1 0 .7l-1.5 1.5a.5.5 0 0 1-.7-.7l.64-.65h-.73a4.5 4.5 0 0 1-3.66-1.88L6.29 6.47A3.5 3.5 0 0 0 3.44 5H2a.5.5 0 0 1 0-1h1.44a4.5 4.5 0 0 1 3.66 1.88l2.61 3.65A3.5 3.5 0 0 0 12.56 11h.73l-.64-.65a.5.5 0 0 1 .7-.7l1.5 1.5ZM8.94 6.69a.5.5 0 0 0 .7-.12l.07-.1A3.5 3.5 0 0 1 12.56 5h.73l-.64.65a.5.5 0 0 0 .7.7l1.5-1.5a.5.5 0 0 0 0-.7l-1.5-1.5a.5.5 0 0 0-.7.7l.64.65h-.73a4.5 4.5 0 0 0-3.66 1.88l-.08.1a.5.5 0 0 0 .12.71Zm-1.88 2.62a.5.5 0 0 0-.7.12l-.07.1A3.5 3.5 0 0 1 3.44 11H2a.5.5 0 0 0 0 1h1.44a4.5 4.5 0 0 0 3.66-1.88l.08-.1a.5.5 0 0 0-.12-.71Z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  </AnimatePresence>
</template>

<style scoped lang="scss">
  // The sheet's size in the design (Figma's window, 812 × 568, 2440:10134):
  // stamps are sized against its width, so a smaller window shows the same
  // sheet, smaller.

  // A stamp in hand (the filled stamp icon, Figma 2440:10357, at 24px), held
  // at its middle: the pointer over the sheet, away from Close and the
  // tools.
  $stamp-cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 16 16'%3E%3Cpath fill='%232E2F34' d='M14 14a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1 0-1h11a.5.5 0 0 1 .5.5ZM13 8H9.47l.99-4.58A2 2 0 0 0 8.5 1h-1a2 2 0 0 0-1.96 2.42L6.53 8H3a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z'/%3E%3C/svg%3E") 12 12, crosshair;
  // Pressed down: a touch smaller, while the button's held.
  $stamp-cursor-pressed: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 16 16'%3E%3Cpath fill='%232E2F34' d='M14 14a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1 0-1h11a.5.5 0 0 1 .5.5ZM13 8H9.47l.99-4.58A2 2 0 0 0 8.5 1h-1a2 2 0 0 0-1.96 2.42L6.53 8H3a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z'/%3E%3C/svg%3E") 10.5 10.5, crosshair;

  // Small screens (Figma 2469:19725): over a black overlay, the sheet as
  // its own card with the size and ink over its foot, and the dock, dark,
  // under it. From md, one paper window with everything on it.
  .post-office-overlay {
    position: fixed;
    z-index: calc(var(--zmax) - 2);
    inset: 0;
    background: #000;
    touch-action: manipulation;
    cursor: var(--cursor);

    @include breakpoint(md) {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .post-office {
    --ink: #2e2f34;
    --postmark-paper: #f0ede7;

    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: calc(var(--zmax) - 1);
    top: 0.8rem;
    right: 0.8rem;
    left: 0.8rem;
    height: calc(100% - 1.6rem);
    color: var(--ink);
    // No grey flash where a tap lands: the sheet, the stickers and the
    // sliders answer for themselves.
    -webkit-tap-highlight-color: transparent;
    // Taps in quick succession are stamps, not a double-tap zoom.
    touch-action: manipulation;
    // From the top-left, for the FLIP (motion owns the transform).
    transform-origin: 0 0;

    // From md, the size and place of a post's panel (DeskDialog), so every
    // window on the desk opens the same: centred, and from lg 65% of the
    // screen wide and most of its height.
    @include breakpoint(md) {
      inset: 0;
      margin: auto;
      width: min(66rem, calc(100% - 3.2rem));
      height: auto;
      aspect-ratio: 4 / 3.45;
      border-radius: 2.3rem;
      background: var(--postmark-paper);
      box-shadow:
        0 0.113rem 0.363rem rgba(0, 0, 0, 0.05),
        0 0.9rem 2.9rem rgba(0, 0, 0, 0.09);
      overflow: hidden;
    }

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

    // On very large screens a post's panel stops at 112rem, which leaves
    // the sheet a narrow strip of a tall window: a little wider here.
    @include breakpoint(xl) {
      --dialog-width: min(clamp(112rem, 45vw, 160rem), 100vw - 3.2rem);
    }
  }

  // Everything inside, as one box the size of the window, so it can fade
  // in and out over the window's own grow and shrink.
  .post-office__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    position: relative;
    min-height: 0;

    // The sheet fits inside it (see .post-office__sheet).
    @include breakpoint(md) {
      container-type: size;
    }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  // Figma 2449:12262: centred at the top.
  // Small screens: under Close, which is centred there.
  .post-office__dots {
    display: flex;
    gap: 0.4rem;
    position: absolute;
    z-index: var(--z2);
    top: 4.3rem;
    left: 50%;
    padding: 0.4rem;
    border-radius: 100rem;
    background: #dcd8c8;
    translate: -50% 0;

    // The site's cursor, mirrored (public/cursor-flipped@3x.png), pointing
    // back at the tooltip that opens to its left here. Its tip is its
    // top-right corner.
    cursor:
      image-set(url('/cursor-flipped@3x.png') 3x) 17 0,
      auto;

    // From md, down the right edge, centred (Figma 2465:19123).
    @include breakpoint(md) {
      flex-direction: column;
      top: 50%;
      right: 0.8rem;
      left: auto;
      translate: 0 -50%;
    }
  }

  .post-office__dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: #bdbdbd;
    transition: background var(--ease);
    cursor: inherit;

    &:hover,
    &.is-current {
      background: #969188;
    }

    &:focus-visible {
      outline: 1px solid rgba(46, 47, 52, 0.5);
      outline-offset: 2px;
    }
  }

  // Centred at the top, as a post's panel has it (DeskDialog).
  .post-office__close {
    position: absolute;
    z-index: var(--z2);
    top: 0.8rem;
    left: 50%;
    padding: 0.8rem 1.2rem;
    border: 1px solid rgba(46, 47, 52, 0.24);
    border-radius: 100rem;
    color: var(--ink);
    // The paper's color, so stamps under it don't show through.
    background: var(--postmark-paper);
    font-family: var(--system-font);
    font-size: 1.3rem;
    letter-spacing: -0.013rem;
    line-height: 1;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;
    translate: -50% 0;
    transition: background var(--ease);
    cursor: inherit;

    &:hover {
      background: #e9e5dc;
    }

    // Focused when the window opens (as in DeskDialog): a quiet ring, not
    // the browser's.
    &:focus-visible {
      outline: 1px solid rgba(46, 47, 52, 0.32);
      outline-offset: 2px;
    }
  }

  // Everything is stamped on here; positions are 0–1 of its size, so it
  // keeps the design's shape at every width.
  // Small screens: the room the window has above the tray, with stamps a
  // size up (--mark-scale) since the sheet's so narrow. From md, the
  // design's shape and size.
  .post-office__sheet {
    --mark-scale: 1.35;

    flex: 1 1 auto;
    position: relative;
    width: 100%;
    min-height: 0;
    // Small screens: ending 1.4rem short of where the dock's stickers start.
    margin-bottom: 1.4rem;
    border-radius: 3.6rem;
    background: var(--postmark-paper);
    container-type: inline-size;
    overflow: hidden;

    // From md, the design's shape (812 × 568) whatever the window's, as
    // big as fits and centred in it: the paper round it is the window's,
    // the same colour, so it reads as one sheet.
    @include breakpoint(md) {
      --mark-scale: 1;

      flex: none;
      margin: auto;
      width: min(100cqw, 100cqh * 812 / 568);
      aspect-ratio: 812 / 568;
      border-radius: 0;
      background: none;
    }

    &:focus-visible {
      outline: 2px solid #285955;
      outline-offset: -0.6rem;
      border-radius: 2.3rem;
    }
  }

  .post-office__hand {
    position: absolute;
    z-index: var(--z1);
    inset: 0;
    cursor: $stamp-cursor;

    &.is-pressing {
      cursor: $stamp-cursor-pressed;
    }
  }

  // A sheet's marks, all of it, so it can slide as one: its own layer,
  // drawn once and moved, rather than every masked mark redrawn each frame.
  .post-office__page {
    position: absolute;
    inset: 0;
    will-change: transform;
  }

  .post-office__mark {
    display: block;
    position: absolute;
    translate: -50% -50%;
    pointer-events: none;

    :deep(svg) {
      width: 100%;
      height: auto;
    }

  }

  .post-office__aim {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  // The window's tooltips, styled as the desk's (TooltipLabel), just right
  // of and below the pointer.
  .post-office__tip {
    position: absolute;
    z-index: var(--z3);
    margin: 1.4rem 0 0 1.4rem;
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
    pointer-events: none;

    // To the pointer's left instead, clear of the mirrored arrow there.
    &.is-flipped {
      margin-left: -1.4rem;
      translate: -100% 0;
    }

    // Above the pointer instead, clear of the window's bottom edge.
    &.is-up {
      margin-top: -1.4rem;
      translate: 0 -100%;
    }

    &.is-flipped.is-up {
      translate: -100% -100%;
    }
  }

  // The pause, on the sheet: placed by its x/y from the top-left.
  .post-office__tip--rest {
    top: 0;
    left: 0;
  }

  // A row of postmark tiles (Figma 2449:13077), scrolling sideways when it
  // doesn't fit: under the sheet on small screens, over its bottom edge
  // from md.
  // The dock, with the size and ink menu under it: below the sheet on
  // small screens, over its bottom edge from md.
  // Small screens: the dock just under the sheet, the stickers standing up
  // over its foot (the row's 4rem above the bar, less the gap).
  .post-office__tools {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    // Over the sheet, stamps and all, where the stickers stand up into it.
    z-index: var(--z2);
    margin-top: -3.2rem;

    @include breakpoint(md) {
      gap: 0.8rem;
      position: absolute;
      z-index: var(--z2);
      right: 0.8rem;
      bottom: 0.8rem;
      left: 0.8rem;
      align-items: center;
      margin-top: 0;
      pointer-events: none;
    }
  }

  // The bar (Figma 2457:17680), short, with the stickers standing up out
  // of it. Small screens: the window's width, scrolling sideways. From md,
  // only the bar and the stickers' own shapes take the pointer: the clear
  // room above the bar is still the sheet's, to stamp on.
  .post-office__tray {
    // The bar's height, at the zoom: 6.5rem on screen on small screens
    // (Figma 2469:20548); from md, about 6rem (see below).
    --bar: 4.533rem;
    // How far the stickers stand up above it: 2.6rem on screen as in
    // Figma, and 1.4rem more for the one in hand, so it isn't cut off.
    --over: 2.79rem;
    // Its corners: 2.3rem on screen (Figma 2470:20785), 1.3rem from md.
    --bar-round: 1.604rem;
    // The stickers' spacing: from md, 15% (lg 25%) wider apart, now that they
    // stand higher and more of each shows.
    --spread: 1;

    flex: 1 1 auto;
    position: relative;
    min-width: 0;
    pointer-events: auto;
    // The bar, the stickers and how far they lift, all scaled together:
    // Figma's phone size (stickers 80px across against 56), and from md
    // its later desk size (2462:18198, 462 wide against 398).
    zoom: 1.434;

    // The bar itself, behind the stickers: dark on small screens, with a
    // faint light edge all round (1px on screen).
    &::before {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: var(--bar);
      border: 0.07rem solid rgba(255, 255, 255, 0.24);
      border-radius: var(--bar-round);
      background: #212121;
      pointer-events: auto;
    }

    @include breakpoint(md) {
      // 5.4rem on screen at this zoom (1.161), 6.8rem at lg's.
      --bar: 4.686rem;
      --over: 4.1rem;
      --spread: 1.15;
      --bar-round: 1.3rem;

      flex: 0 1 auto;
      max-width: 100%;
      pointer-events: none;
      zoom: 1.161;

      &::before {
        border: none;
        background: #fdfcf8;
        box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.22);
      }
    }

    // 25% up in the bigger window from lg (a post's panel's size); the
    // md one is too narrow for it.
    // Wider apart again where there's room for it.
    @include breakpoint(lg) {
      --spread: 1.25;

      zoom: 1.451;
    }
  }

  // The stickers, cut off along the bar's bottom edge and its ends, with
  // room above for them to lift into. Small screens scroll it sideways, a
  // fade at an edge with more past it (--fade-start / --fade-end).
  .post-office__tray-list {
    display: flex;
    align-items: flex-end;
    position: relative;
    // More at the end: the square stickers there reach their corners out
    // past their slots, where the rings at the start don't.
    padding: 0 3rem 0 2.2rem;
    height: calc(var(--bar) + var(--over));
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 var(--fade-start),
      #000 calc(100% - var(--fade-end)),
      transparent
    );
    clip-path: inset(0 0 0 0 round 0 0 var(--bar-round) var(--bar-round));

    @include breakpoint(md) {
      overflow: visible;
      mask-image: none;
      clip-path: inset(-10rem 0 0 0 round 0 0 var(--bar-round) var(--bar-round));
    }
  }

  // Each sticker's place in the row (--slot, as spaced in Figma):
  // narrower than the sticker, so they overlap, each hanging from about
  // halfway up with its foot below the bar.
  .post-office__type {
    flex-shrink: 0;
    position: relative;
    margin-left: calc(var(--room, 0rem) * var(--spread));
    width: calc(var(--slot, 4rem) * var(--spread));
    height: 100%;
    background: none;
    cursor: inherit;

    &:focus-visible {
      outline: none;
    }

    &:focus-visible .post-office__sticker {
      outline: 2px solid #285955;
      outline-offset: 0.2rem;
      border-radius: 0.8rem;
    }
  }

  // Hung from just above the bar's top edge, as in Figma, whatever the
  // row's height.
  .post-office__sticker {
    position: absolute;
    top: calc(100% - var(--bar) - 0.5rem);
    left: 50%;
    max-width: none;
    translate: -50% 0;
    pointer-events: none;

    // Its painted shape, not its box, so hovering the clear corners round
    // it is the sheet's. Standing taller from md, nearly all of it showing
    // above the bar's bottom edge.
    // Hung from the row's foot rather than the bar's top, so the bar's
    // height doesn't move them.
    @include breakpoint(md) {
      top: calc(100% - 5.92rem);
      pointer-events: auto;
    }
  }

  // Figma 2449:12695: the top-left corner. Hidden for now: the stamp is
  // the only tool yet.
  .post-office__toolbar {
    display: none;
    flex-direction: column;
    gap: 0.2rem;
    position: absolute;
    z-index: var(--z2);
    top: 0.8rem;
    left: 0.8rem;
    padding: 0.6rem;
    border-radius: 1.3rem;
    background: #fff;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.22);
  }

  // Two white pills side by side, size and ink. Small screens (Figma
  // 2469:20751): over the sheet's foot, 1.6rem up, sharing its width and
  // all a size up (--m); from md, under the dock.
  .post-office__menu {
    --m: 1.3077;
    // The pills' height: a little taller than the design's 3.4rem on small
    // screens, to be easier under a thumb.
    --pill: 4rem;

    display: flex;
    justify-content: center;
    gap: calc(0.6rem * var(--m));
    position: absolute;
    z-index: var(--z1);
    right: 1.6rem;
    bottom: calc(100% - 0.2rem);
    left: 1.6rem;
    pointer-events: auto;

    // From md, the desk's size; from lg, 25% up with the dock.
    @include breakpoint(md) {
      --m: 1;
      --pill: calc(2.6rem * var(--m));

      position: static;
    }

    @include breakpoint(lg) {
      --m: 1.25;
    }
  }

  .post-office__pill {
    display: flex;
    // Halves, padding and all, whatever's in them.
    flex: 1 1 50%;
    align-items: center;
    box-sizing: border-box;
    min-width: 0;
    height: var(--pill);
    border-radius: calc(1rem * var(--m));
    background: #fff;
    box-shadow: 0 calc(0.2rem * var(--m)) calc(0.2rem * var(--m) + 0.2rem)
      rgba(0, 0, 0, 0.22);

    @include breakpoint(md) {
      flex: none;
    }

    &.post-office__pill--size {
      gap: calc(0.5rem * var(--m));
      padding: 0 calc(0.4rem * var(--m));
    }

    &.post-office__pill--inks {
      padding: 0 calc(0.5rem * var(--m));
    }
  }

  // Desktop only, for now: a square pill, its icon as the size pill's.
  .post-office__shuffle {
    display: none;

    @include breakpoint(md) {
      display: flex;
      flex: none;
      justify-content: center;
      width: var(--pill);
      cursor: inherit;
    }

    // Darkened by its fill, not opacity: fading opacity moves it onto a
    // layer of its own for the transition, and it jumps a pixel.
    svg {
      display: block;
      width: calc(1.6rem * var(--m));
      height: calc(1.6rem * var(--m));
      fill: rgba(0, 0, 0, 0.5);
      transition: fill var(--ease);
    }

    &:hover svg {
      fill: rgba(0, 0, 0, 0.8);
    }

    &:focus-visible {
      outline: 2px solid #285955;
      outline-offset: 0.2rem;
    }
  }

  .post-office__size-step {
    display: flex;
    flex-shrink: 0;
    cursor: inherit;

    &:hover .post-office__size-icon {
      fill: rgba(0, 0, 0, 0.8);
    }

    &:focus-visible {
      outline: 2px solid #285955;
      outline-offset: 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .post-office__size-icon {
    display: block;
    flex-shrink: 0;
    width: calc(1.6rem * var(--m));
    height: calc(1.6rem * var(--m));
    fill: rgba(0, 0, 0, 0.5);
    transition: fill var(--ease);
  }

  // The track, filled from the left up to the thumb (--size, 0–1). Taller
  // than it looks, to be easy to grab.
  // Small screens: as wide as the pill leaves it.
  .post-office__size-track {
    flex: 1 1 auto;
    position: relative;
    height: calc(1.4rem * var(--m));

    @include breakpoint(md) {
      flex: none;
      width: calc(7.6rem * var(--m));
    }
    touch-action: none;
    cursor: inherit;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      height: calc(0.4rem * var(--m));
      border-radius: 100rem;
      background: linear-gradient(to right, #ebe8e0, #dedad0);
      translate: 0 -50%;
    }

    &:focus-visible {
      outline: 2px solid #285955;
      outline-offset: 0.2rem;
      border-radius: 0.6rem;
    }
  }

  .post-office__size-fill {
    position: absolute;
    top: 50%;
    left: 0;
    width: calc(var(--size) * 100%);
    height: calc(0.4rem * var(--m));
    border-radius: 100rem;
    background: #404040;
    translate: 0 -50%;
  }

  .post-office__size-thumb {
    position: absolute;
    top: 50%;
    left: calc(var(--size) * 100%);
    width: calc(1.4rem * var(--m));
    height: calc(1.4rem * var(--m));
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    background: radial-gradient(circle at 40% 35%, #fff, #f3f3f3);
    box-shadow: 0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.13);
    translate: -50% -50%;
  }

  // The ink: a gradient through the colours (INK_GRADIENT), with a thin white
  // handle at the place picked (--ink-place, 0–1).
  .post-office__ink-track {
    flex: 1 1 auto;
    position: relative;
    height: calc(1.6rem * var(--m));
    border-radius: calc(0.5rem * var(--m));

    @include breakpoint(md) {
      flex: none;
      width: calc(11.6rem * var(--m));
    }
    touch-action: none;
    cursor: inherit;

    &:focus-visible {
      outline: 2px solid #285955;
      outline-offset: 0.2rem;
    }
  }

  .post-office__ink-thumb {
    position: absolute;
    top: 50%;
    left: calc(var(--ink-place) * 100%);
    width: calc(0.5rem * var(--m));
    height: calc(2rem * var(--m));
    border: 0.5px solid #7c7c7c;
    border-radius: calc(0.3rem * var(--m));
    background: #fff;
    box-shadow: 0 0 calc(0.4rem * var(--m)) rgba(0, 0, 0, 0.24);
    translate: -50% -50%;
  }

  .post-office__tool {
    display: flex;
    padding: 0.4rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.7rem;
    background: transparent;
    cursor: inherit;

    &.is-selected {
      background: #f3f3f3;
    }

    &[aria-disabled='true'] {
      opacity: 0.4;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>

<script setup lang="ts">
  import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion-v'
  import type { ComponentPublicInstance } from 'vue'
  import {
    INK_STOPS,
    POSTMARKS,
    STAMP_SIZE,
    inkAt,
    inkOf,
    postmark,
    seeded,
    type Mark,
    type PostmarkType,
  } from '~/data/postmarks'

  // How big a stamp is on the sheet, against its size in the tray.
  const SHEET_SCALE = 2.1
  const SHEET_WIDTH = 812
  // How far a stamp tilts, either way (degrees): never quite straight.
  const TILT_MIN = 2
  const TILT_MAX = 8

  // Its root is AnimatePresence, which can't take the page's scoped attrs.
  defineOptions({ inheritAttrs: false })

  const {
    open,
    origin,
    sheet,
    older,
    unavailable,
    inkDryAt,
    load,
    loadPage,
    stamp,
    turnIfCovered,
  } = usePostOffice()


  const ease = [0.8, 0, 0.16, 1] as const
  const reduceMotion = ref(false)
  const blur = (px: number) => `blur(${reduceMotion.value ? 0 : px}px)`

  // Which sheet is showing (from 0); stamps go on the last. `direction`
  // is which way the last change went, for the slide: 1 on to a later
  // sheet, -1 back.
  const pages = computed(() => sheet.value?.pages ?? 1)
  const viewing = ref(0)
  const direction = ref(1)
  const onLast = computed(() => viewing.value === pages.value - 1)
  const shown = computed(() =>
    onLast.value
      ? (sheet.value?.marks ?? [])
      : (older.value[viewing.value] ?? []),
  )

  // Up to DOTS of them, around the one showing.
  const DOTS = 9
  const dotPages = computed(() => {
    const first = Math.min(
      Math.max(viewing.value - Math.floor(DOTS / 2), 0),
      Math.max(pages.value - DOTS, 0),
    )
    return Array.from(
      { length: Math.min(DOTS, pages.value) },
      (_, index) => first + index,
    )
  })

  function goTo(page: number) {
    if (page === viewing.value) return
    if (page < pages.value - 1) loadPage(page)
    direction.value = page > viewing.value ? 1 : -1
    viewing.value = page
  }

  // A sheet slides out one side as the next comes in from the other, on a
  // soft spring (no bounce) so it glides rather than lurches. The way the
  // dots run: up and down from md (they're down the right edge), side to
  // side on small screens (along the top).
  const SLIDE_S = 1
  const slidesUp = ref(false)
  const slide = computed(() => {
    const transition = reduceMotion.value
      ? { duration: 0.01 }
      : { type: 'spring', duration: SLIDE_S, bounce: 0 }
    const axis = slidesUp.value ? 'y' : 'x'
    return {
      enter: (to: number) => ({ [axis]: to > 0 ? '100%' : '-100%' }),
      center: { x: 0, y: 0, transition },
      exit: (to: number) => ({
        [axis]: to > 0 ? '-100%' : '100%',
        transition,
      }),
    }
  })
  // A beat after the stamp that covers the sheet lands, before turning.
  const TURN_DELAY_MS = 700
  let turnTimer: ReturnType<typeof setTimeout> | undefined

  const selectedId = ref<PostmarkType>(POSTMARKS[0]!.id)
  // The ink, a place along the gradient: random on opening (see opened),
  // after which picking another postmark leaves it be.
  const ink = ref(0)
  const INK_GRADIENT = `linear-gradient(to right, ${INK_STOPS.map(
    (stop) => `${stop.hex} ${stop.at * 100}%`,
  ).join(', ')})`
  const inkTrack = useTemplateRef<HTMLElement>('inkTrack')

  // Both sliders: a place along a track (0–1) from the pointer, dragged or
  // pressed anywhere on it.
  function placeOn(track: HTMLElement | null, clientX: number) {
    const rect = track?.getBoundingClientRect()
    if (!rect) return 0
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
  }
  function drag(event: PointerEvent, set: (clientX: number) => void) {
    const track = event.currentTarget as HTMLElement
    track.setPointerCapture(event.pointerId)
    set(event.clientX)
    const move = (moved: PointerEvent) => set(moved.clientX)
    const up = () => {
      track.removeEventListener('pointermove', move)
      track.removeEventListener('pointerup', up)
      track.removeEventListener('pointercancel', up)
    }
    track.addEventListener('pointermove', move)
    track.addEventListener('pointerup', up)
    track.addEventListener('pointercancel', up)
  }

  function onInkDown(event: PointerEvent) {
    drag(event, (clientX) => {
      ink.value = Math.round(placeOn(inkTrack.value, clientX) * 1000) / 1000
    })
  }

  // Arrow keys step along by a twentieth; Home and End go to either end.
  function onInkKey(event: KeyboardEvent) {
    const next = {
      ArrowRight: ink.value + 0.05,
      ArrowUp: ink.value + 0.05,
      ArrowLeft: ink.value - 0.05,
      ArrowDown: ink.value - 0.05,
      Home: 0,
      End: 1,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    ink.value = Math.round(Math.min(Math.max(next, 0), 1) * 1000) / 1000
  }

  // The size each visit starts at, picked between these: near the usual,
  // never a speck or a giant to open with.
  const OPEN_SIZE = { min: 0.85, max: 1.15 }

  // The stamp's size (a STAMP_SIZE scale), random on opening, and
  // where that sits along the slider (0 small, 1 large).
  const stampSize = ref(1)
  const sizeShare = computed(
    () =>
      (stampSize.value - STAMP_SIZE.min) / (STAMP_SIZE.max - STAMP_SIZE.min),
  )

  const sizeTrack = useTemplateRef<HTMLElement>('sizeTrack')
  function sizeAt(clientX: number) {
    const share = placeOn(sizeTrack.value, clientX)
    stampSize.value =
      Math.round(
        (STAMP_SIZE.min + share * (STAMP_SIZE.max - STAMP_SIZE.min)) * 100,
      ) / 100
  }

  function onSizeDown(event: PointerEvent) {
    drag(event, sizeAt)
  }

  // Arrow keys step it by a twentieth; Home and End go to either end.
  // A tenth of the slider a click, from the small and large stamp icons.
  function stepSize(direction: 1 | -1) {
    const step = (STAMP_SIZE.max - STAMP_SIZE.min) / 10
    stampSize.value =
      Math.round(
        Math.min(
          Math.max(stampSize.value + step * direction, STAMP_SIZE.min),
          STAMP_SIZE.max,
        ) * 100,
      ) / 100
  }

  function onSizeKey(event: KeyboardEvent) {
    const step = (STAMP_SIZE.max - STAMP_SIZE.min) / 20
    const next = {
      ArrowUp: stampSize.value + step,
      ArrowRight: stampSize.value + step,
      ArrowDown: stampSize.value - step,
      ArrowLeft: stampSize.value - step,
      Home: STAMP_SIZE.min,
      End: STAMP_SIZE.max,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    stampSize.value =
      Math.round(
        Math.min(Math.max(next, STAMP_SIZE.min), STAMP_SIZE.max) * 100,
      ) / 100
  }
  const selected = computed(() => postmark(selectedId.value))

  // Stamped since the window opened: these press in; the rest are just
  // there.
  const stampedHere = reactive(new Set<number>())

  // What the next stamp would say: here, now, and the next number.
  const now = ref(Date.now())
  const preview = computed(() => ({
    id: (sheet.value?.total ?? 0) + 1,
    at: now.value,
    seed: 0,
    city: sheet.value?.here.city ?? null,
    region: sheet.value?.here.region ?? null,
    country: sheet.value?.here.country ?? null,
  }))


  // The dots' tooltip: 1.5k stamps across 436 cities.
  const compact = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  })
  const countText = computed(() => {
    if (unavailable.value) return 'Closed right now'
    const data = sheet.value
    if (!data) return ''
    const plural = (n: number, one: string, many: string) =>
      `${compact.format(n).toLowerCase()} ${n === 1 ? one : many}`
    return `${plural(data.total, 'stamp', 'stamps')} across ${plural(data.cities, 'city', 'cities')}`
  })

  // How each sticker stands: tilted (STICKER_TILT, as in Figma), lifted a
  // little under the pointer, and further when it's the one in hand (px).
  const STICKER_TILT = -15
  // Extra room before some (px): more after the triangle than in Figma,
  // so the burgee doesn't cover it.
  // The hand pulled left (6px on screen at lg), the burgee after it
  // taking that back so it and the rest stay put.
  const STICKER_ROOM: Partial<Record<PostmarkType, number>> = {
    hand: -3.31,
    burgee: 21.5 + 3.31,
  }
  // How far along each one's centre is from the last (px), as in Figma.
  const STICKER_SLOTS: Record<PostmarkType, number> = {
    stars: 40,
    dashed: 40,
    house: 40,
    classic: 42,
    banner: 29,
    triangle: 42,
    hand: 30,
    burgee: 31,
    meter: 33,
    hello: 33,
    cancel: 40,
  }
  const STICKER_HOVER = -8
  const STICKER_PICKED = -18
  const hovered = ref<PostmarkType | null>(null)

  // Small screens zoom the dock further, so the one in hand lifts less to
  // stand as high as in Figma (2469:20592) and clear the row's top.
  const PHONE_LIFT = 0.72

  function stickerPose(id: PostmarkType) {
    if (id === selected.value.id) {
      return {
        y: slidesUp.value ? STICKER_PICKED : STICKER_PICKED * PHONE_LIFT,
        rotate: STICKER_TILT,
      }
    }
    if (id === hovered.value) return { y: STICKER_HOVER, rotate: STICKER_TILT }
    return { y: 0, rotate: STICKER_TILT }
  }

  function onSticker(event: PointerEvent, id: PostmarkType) {
    if (event.pointerType === 'mouse') hovered.value = id
  }

  let mdQuery: MediaQueryList | undefined
  function onBreakpoint() {
    slidesUp.value = !!mdQuery?.matches
    nextTick(onTrayScroll)
  }

  // Whether the stickers scroll on past either edge, for the fades.
  const trayList = useTemplateRef<HTMLElement>('trayList')
  const moreBefore = ref(false)
  const moreAfter = ref(false)
  function onTrayScroll() {
    const list = trayList.value
    if (!list) return
    moreBefore.value = list.scrollLeft > 1
    moreAfter.value = list.scrollLeft + list.clientWidth < list.scrollWidth - 1
  }
  watch(trayList, (list) => {
    if (list) nextTick(onTrayScroll)
  })

  // The tooltip at the pointer, over anything with a data-tip.
  const TIP_ROOM = 220
  // How much room below the pointer it needs, or it opens above instead.
  const TIP_ROOM_BELOW = 56
  const tip = ref<{
    text: string
    x: number
    y: number
    flip: boolean
    up: boolean
  } | null>(null)
  function onTip(event: PointerEvent) {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-tip]',
    )
    const text = event.pointerType === 'mouse' ? target?.dataset.tip : ''
    if (!text) {
      tip.value = null
      return
    }
    const shell = (event.currentTarget as HTMLElement).getBoundingClientRect()
    tip.value = {
      text,
      x: event.clientX - shell.left,
      y: event.clientY - shell.top,
      // Near the right edge (the sheet dots), it goes to the pointer's left.
      flip: shell.right - event.clientX < TIP_ROOM,
      // Near the bottom (the menu under the dock), above the pointer.
      up: shell.bottom - event.clientY < TIP_ROOM_BELOW,
    }
  }

  function onLeave() {
    aim.value = null
    tip.value = null
  }

  // Placed as a share of the sheet, sized against its width (cqw), tilted
  // by its seed.
  function markStyle(
    mark: Pick<Mark, 'type' | 'x' | 'y' | 'seed'> & { size?: number },
    tilted = true,
  ) {
    const type = postmark(mark.type)
    const width =
      ((type.width * SHEET_SCALE) / SHEET_WIDTH) * 100 * (mark.size ?? 1)
    return {
      left: `${mark.x * 100}%`,
      top: `${mark.y * 100}%`,
      width: `calc(${width}cqw * var(--mark-scale, 1))`,
      rotate: `${tilted ? tiltOf(mark.seed) : 0}deg`,
    }
  }

  // The seed's second draw (its first sets which way the ink fades, in
  // PostmarkArt): a side, then how far.
  function tiltOf(seed: number) {
    const random = seeded(seed)
    random()
    const draw = random()
    const side = draw < 0.5 ? -1 : 1
    const amount = (draw % 0.5) * 2
    return side * (TILT_MIN + amount * (TILT_MAX - TILT_MIN))
  }

  const sheetEl = useTemplateRef<HTMLElement>('sheetEl')
  const aim = ref<{ x: number; y: number } | null>(null)

  function pointOf(event: PointerEvent) {
    const rect = sheetEl.value!.getBoundingClientRect()
    return {
      x: Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1),
      y: Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1),
    }
  }

  // Close and the tools, with a margin round each (px): coming near one,
  // the stamp is put away and the pointer is the site's again, so nothing
  // gets stamped on the way to a button. Close's is wider, being where
  // you'd head to leave.
  const CLOSE_MARGIN = 28
  const TOOLS_MARGIN = 16
  const near = ref(false)

  const ZONES: [string, number][] = [
    ['.post-office__close', CLOSE_MARGIN],
    ['.post-office__toolbar', TOOLS_MARGIN],
    ['.post-office__dots', TOOLS_MARGIN],
    ['.post-office__menu', TOOLS_MARGIN],
  ]

  // A fingertip's give: taps this close to Close or the controls are
  // misses for them, not stamps.
  const TOUCH_MARGIN = 32

  function isNear(event: PointerEvent, touch = false) {
    const shell = sheetEl.value?.parentElement
    if (!shell) return false
    // Right over one of them, or over the dock itself: its bar or a
    // sticker, not the clear room above them (see .post-office__tray).
    const target = event.target
    const over = [...ZONES.map(([selector]) => selector), '.post-office__tray']
    if (target instanceof Element && target.closest(over.join(','))) return true
    return ZONES.some(([selector, own]) => {
      const rect = shell.querySelector(selector)?.getBoundingClientRect()
      const margin = touch ? Math.max(own, TOUCH_MARGIN) : own
      return (
        // Not one that's hidden, measuring nothing at the corner.
        !!rect?.width &&
        event.clientX > rect.left - margin &&
        event.clientX < rect.right + margin &&
        event.clientY > rect.top - margin &&
        event.clientY < rect.bottom + margin
      )
    })
  }

  // The preview's place on the sheet (px), sprung after the pointer with
  // the tooltips' spring (TooltipLabel). It starts where the pointer comes
  // in rather than flying there.
  const AIM_SPRING = { stiffness: 220, damping: 22, mass: 0.6 }
  const aimTargetX = useMotionValue(0)
  const aimTargetY = useMotionValue(0)
  const aimX = useSpring(aimTargetX, AIM_SPRING)
  const aimY = useSpring(aimTargetY, AIM_SPRING)

  function onAim(event: PointerEvent) {
    onTip(event)
    const rect = sheetEl.value?.getBoundingClientRect()
    const x = event.clientX - (rect?.left ?? 0)
    const y = event.clientY - (rect?.top ?? 0)
    // Off the sheet (the tools below it on small screens) or not a mouse.
    if (
      !rect ||
      event.pointerType !== 'mouse' ||
      x < 0 ||
      y < 0 ||
      x > rect.width ||
      y > rect.height
    ) {
      aim.value = null
      return
    }
    near.value = isNear(event)
    aimTargetX.set(x)
    aimTargetY.set(y)
    if (!aim.value || reduceMotion.value) {
      aimX.jump(x)
      aimY.jump(y)
    }
    now.value = Date.now()
    aim.value = pointOf(event)
  }

  // Held down on the sheet: the cursor presses in (see .is-pressing).
  const pressing = ref(false)
  function letGo() {
    pressing.value = false
  }

  // A touch stamps only as a tap: one finger, let go quickly where it
  // went down. A drag, a pinch or a long press is the browser's, not a
  // stamp.
  const TAP_SLOP = 10
  const TAP_MS = 500
  let tap: { id: number; x: number; y: number; at: number } | null = null
  let fingers = 0

  function onTouchDown(event: PointerEvent) {
    fingers += 1
    const target = event.currentTarget as HTMLElement
    const lift = (up: PointerEvent) => {
      if (up.pointerId !== event.pointerId) return
      window.removeEventListener('pointerup', lift)
      window.removeEventListener('pointercancel', lift)
      fingers = Math.max(0, fingers - 1)
      const down = tap
      if (up.type !== 'pointerup' || down?.id !== up.pointerId) return
      tap = null
      const moved = Math.hypot(up.clientX - down.x, up.clientY - down.y)
      if (moved > TAP_SLOP || up.timeStamp - down.at > TAP_MS) return
      if (!target.isConnected || !sheet.value || !onLast.value) return
      if (isNear(up, true)) return
      const { x, y } = pointOf(up)
      placeAim(x, y)
      press(x, y)
    }
    window.addEventListener('pointerup', lift)
    window.addEventListener('pointercancel', lift)
    // A second finger makes it a pinch: neither is a tap.
    tap =
      fingers === 1
        ? {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            at: event.timeStamp,
          }
        : null
  }

  function onStamp(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return onTouchDown(event)
    if (event.button !== 0 || !sheet.value || !onLast.value) return
    if (isNear(event)) return
    pressing.value = true
    window.addEventListener('pointerup', letGo, { once: true })
    window.addEventListener('pointercancel', letGo, { once: true })
    const { x, y } = pointOf(event)
    press(x, y)
  }

  // From the keyboard: somewhere on the sheet, clear of the tools.
  function stampSomewhere() {
    if (!sheet.value || !onLast.value) return
    const x = 0.1 + Math.random() * 0.8
    const y = 0.12 + Math.random() * 0.6
    if (full.value) placeAim(0.5, 0.5)
    press(x, y)
  }

  // Straight to a spot on the sheet (0–1), for a press with no pointer to
  // follow: a tap, or the keyboard.
  function placeAim(x: number, y: number) {
    const rect = sheetEl.value?.getBoundingClientRect()
    if (!rect) return
    aimX.jump(x * rect.width)
    aimY.jump(y * rect.height)
  }

  // Past STAMPS_MAX in STAMPS_WINDOW_MS (the Worker's limit, see
  // usePostOffice), or once the Worker says so: a word to pause instead of
  // a stamp, for a moment or until the pointer leaves the sheet.
  const REST_MS = 2400
  const full = computed(() => inkDryAt(now.value) > now.value)
  const resting = ref(false)
  let restTimer: ReturnType<typeof setTimeout> | undefined
  function rest() {
    resting.value = true
    clearTimeout(restTimer)
    restTimer = setTimeout(() => (resting.value = false), REST_MS)
  }
  watch(aim, (point) => {
    if (!point) resting.value = false
  })

  function press(x: number, y: number) {
    now.value = Date.now()
    if (full.value) return rest()
    const before = sheet.value?.marks.length ?? 0
    stamp(selected.value.id, x, y, stampSize.value, ink.value).then(
      (result) => {
        if (result !== 'dry') return
        now.value = Date.now()
        rest()
      },
    )
    const added = sheet.value?.marks[before]
    if (added) stampedHere.add(added.seed)
    // That about covers it: on to a blank sheet, once it's landed.
    if (turnIfCovered()) {
      aim.value = null
      clearTimeout(turnTimer)
      turnTimer = setTimeout(
        () => {
          direction.value = 1
          viewing.value = pages.value - 1
        },
        reduceMotion.value ? 0 : TURN_DELAY_MS,
      )
    }
  }

  // The page behind stays put while it's open (as with DeskDialog), which
  // matters on phones, where the page itself scrolls.
  useHead({
    htmlAttrs: {
      class: computed(() => (open.value ? 'is-scroll-locked' : undefined)),
    },
  })

  // Esc closes; focus goes to Close on the way in and back to the icon on
  // the way out.
  const closeButton = useTemplateRef<HTMLElement>('closeButton')
  let returnFocus: HTMLElement | null = null
  function onKeydown(event: KeyboardEvent) {
    if (open.value && event.key === 'Escape') open.value = false
  }

  // FLIP, as DeskDialog's: the transform that maps the window's resting
  // box onto the icon it opened from (`transform-origin: 0 0`), measured
  // live since the icon can be dragged while it's open.
  const shell = useTemplateRef<ComponentPublicInstance>('shell')
  const phase = ref<'hidden' | 'visible'>('hidden')
  const identity = { x: 0, y: 0, scaleX: 1, scaleY: 1 }
  let from = identity
  // Vue nulls the template ref as the leave starts, before `exit` runs.
  let windowEl: HTMLElement | null = null

  function invert(): typeof identity {
    const icon = origin.value
    if (reduceMotion.value || !windowEl || !icon?.isConnected) return identity
    const last = windowEl.getBoundingClientRect()
    const first = icon.getBoundingClientRect()
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
      return
    }
    windowEl = instance.$el as HTMLElement
    from = invert()
    phase.value = 'visible'
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
    hidden: () => ({ opacity: 0, filter: blur(10) }),
    visible: () => ({
      opacity: 1,
      filter: blur(0),
      // A leftover filter would make this box the stamps' containing block
      // for good, and blur nothing.
      transitionEnd: { filter: 'none' },
      transition: {
        duration: reduceMotion.value ? 0.01 : 0.35,
        delay: reduceMotion.value ? 0 : 0.2,
        ease,
      },
    }),
    exit: () => ({
      opacity: 0,
      filter: blur(10),
      transition: { duration: reduceMotion.value ? 0.01 : 0.15, ease },
    }),
  }

  // Its own address, /greetings (pages/index/greetings.vue), as a post's
  // panel has /work/[slug]: the URL opens it, and opening or closing it
  // goes there or back.
  const ROUTE = '/greetings'
  const route = useRoute()
  const router = useRouter()
  watch(
    () => route.path,
    (path) => (open.value = path === ROUTE),
    { immediate: true },
  )
  watch(open, (isOpen) => {
    if (import.meta.server) return
    if (isOpen && route.path !== ROUTE) router.push(ROUTE)
    else if (!isOpen && route.path === ROUTE) {
      // Back when it was opened from the desk; a direct link has nothing
      // behind it on this site, so replace instead.
      if (window.history.state?.back === '/') router.back()
      else router.replace('/')
    }
  })

  watch(open, (isOpen) => opened(isOpen))

  // A different postmark in hand (never the same one twice running), a
  // colour anywhere along the gradient, and a size in `range`: on opening
  // a little either side of the usual (OPEN_SIZE), so every visit's stamp
  // is its own; from the shuffle button, anywhere on the slider.
  function shuffle(range: { min: number; max: number } = STAMP_SIZE) {
    const others = POSTMARKS.filter((type) => type.id !== selectedId.value)
    selectedId.value = others[Math.floor(Math.random() * others.length)]!.id
    ink.value = Math.round(Math.random() * 1000) / 1000
    stampSize.value =
      Math.round(
        (range.min + Math.random() * (range.max - range.min)) * 100,
      ) / 100
  }

  async function opened(isOpen: boolean) {
    if (import.meta.server) return
    if (isOpen) {
      shuffle(OPEN_SIZE)
      returnFocus = document.activeElement as HTMLElement | null
      now.value = Date.now()
      // Opens on the sheet stamps go on.
      load().then(() => (viewing.value = pages.value - 1))
      viewing.value = pages.value - 1
      await nextTick()
      closeButton.value?.focus({ preventScroll: true })
    } else {
      aim.value = null
      stampedHere.clear()
      resting.value = false
      clearTimeout(restTimer)
      clearTimeout(turnTimer)
      returnFocus?.focus({ preventScroll: true })
      returnFocus = null
    }
  }

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    window.addEventListener('keydown', onKeydown)
    mdQuery = window.matchMedia('(min-width: 700px)')
    mdQuery.addEventListener('change', onBreakpoint)
    onBreakpoint()
    // A direct link to /greetings renders it open on the server: no icon
    // to grow from, so it fades in where it is.
    if (open.value) {
      if (shell.value && phase.value === 'hidden') {
        windowEl = shell.value.$el as HTMLElement
        from = identity
        phase.value = 'visible'
      }
      opened(true)
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    mdQuery?.removeEventListener('change', onBreakpoint)
  })
</script>
