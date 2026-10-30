<template>
  <!-- The Post Office (Figma 2449:12259): a sheet everyone stamps. Pick a
       postmark in the tray, then click the sheet; it says where you are
       and when, and stays for every visitor after. -->
  <AnimatePresence>
    <motion.section
      v-if="open"
      ref="shell"
      class="post-office"
      role="dialog"
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
                :style="markStyle({ type: selected.id, x: 0, y: 0, seed: 0 }, false)"
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
          <div
            ref="trayEl"
            class="post-office__tray"
            @pointermove="onDock"
            @pointerleave="offDock"
          >
            <!-- The tiles, scrolling sideways when they don't fit, fading out
                 at an edge with more past it. Like the macOS Dock from md:
                 the tiles near the pointer grow, pushing their neighbours
                 aside. -->
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
              <button
                v-for="(type, index) in POSTMARKS"
                :key="type.id"
                class="post-office__type"
                :class="{ 'is-selected': type.id === selected.id }"
                :style="{
                  width: `${tileSizes[index]}px`,
                  height: `${tileSizes[index]}px`,
                  '--zoom': tileSizes[index]! / TILE,
                }"
                type="button"
                role="radio"
                :aria-checked="type.id === selected.id"
                :aria-label="type.name"
                @click="selectedId = type.id"
              >
                <span class="post-office__type-zoom">
                  <PostmarkArt
                    class="post-office__type-art"
                    :type="type.id"
                    :mark="preview"
                    :serial="preview.id"
                    :style="tileStyle(type)"
                    even
                  />
                </span>
              </button>
            </div>
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

  .post-office {
    --ink: #2e2f34;
    --postmark-paper: #f3efe6;

    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: calc(var(--zmax) - 1);
    top: 0.8rem;
    right: 0.8rem;
    left: 0.8rem;
    // Small screens: as tall and as round as a post's panel (DeskDialog),
    // so it sits in the screen's corners the same way.
    height: calc(100% - 1.2rem);
    border-radius: 3.5rem;
    color: var(--ink);
    background: var(--postmark-paper);
    box-shadow:
      0 0.113rem 0.363rem rgba(0, 0, 0, 0.05),
      0 0.9rem 2.9rem rgba(0, 0, 0, 0.09);
    // From the top-left, for the FLIP (motion owns the transform).
    transform-origin: 0 0;
    overflow: hidden;


    @include breakpoint(md) {
      top: 50%;
      left: 50%;
      right: auto;
      height: auto;
      border-radius: 2.3rem;
      // As drawn at 1440 × 900 (812 wide), growing with bigger screens in
      // proportion: 56.4vw, or 90.2svh (568 of 900 tall, at the sheet's
      // shape), whichever is smaller. Narrower screens keep 3.2rem a side.
      width: min(
        max(81.2rem, min(56.4vw, 90.2svh)),
        calc(100% - 6.4rem)
      );
      translate: -50% -50%;
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
    top: 5.5rem;
    left: 50%;
    padding: 0.4rem;
    border-radius: 100rem;
    background: #dcd8c8;
    translate: -50% 0;

    @include breakpoint(md) {
      top: 0.8rem;
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

  // Small screens: centred at the top, as a post's panel has it
  // (DeskDialog). From md, the top-right corner.
  .post-office__close {
    position: absolute;
    z-index: var(--z2);
    top: 2rem;
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

    @include breakpoint(md) {
      top: 0.8rem;
      right: 0.8rem;
      left: auto;
      translate: none;
    }

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
    container-type: inline-size;
    overflow: hidden;

    @include breakpoint(md) {
      --mark-scale: 1;

      flex: none;
      aspect-ratio: 812 / 568;
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
  }

  // The pause, on the sheet: placed by its x/y from the top-left.
  .post-office__tip--rest {
    top: 0;
    left: 0;
  }

  // A row of postmark tiles (Figma 2449:13077), scrolling sideways when it
  // doesn't fit: under the sheet on small screens, over its bottom edge
  // from md.
  .post-office__tools {
    display: flex;
    justify-content: center;
    padding: 0 0.8rem 0.8rem;

    @include breakpoint(md) {
      position: absolute;
      z-index: var(--z2);
      right: 0.8rem;
      bottom: 0.8rem;
      left: 0.8rem;
      padding: 0;
      pointer-events: none;
    }
  }

  // Small screens: the full width, scrolling sideways (centred, the start
  // would be cut off out of reach). From md, as wide as its tiles.
  // The bar itself; its list scrolls inside it.
  .post-office__tray {
    flex: 1 1 auto;
    min-width: 0;
    // Small screens: concentric with the window's corners (3.5rem, 0.8rem
    // in).
    border-radius: 2.7rem;
    background: #fff;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.22);
    overflow: hidden;
    pointer-events: auto;

    &:hover {
      --tile-dim: 1;
    }

    @include breakpoint(md) {
      flex: 0 1 auto;
      border-radius: 1.3rem;
      overflow: visible;
    }
  }

  // Faded at an edge while there's more to scroll to that way
  // (--fade-start / --fade-end), the tiles going to the bar's white.
  .post-office__tray-list {
    display: flex;
    gap: 0.8rem;
    padding: 0.4rem;
    overflow-x: auto;
    scrollbar-width: none;
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 var(--fade-start),
      #000 calc(100% - var(--fade-end)),
      transparent
    );

    // Fits the window from md: the bar stays its height while the tiles
    // grow up out of it.
    @include breakpoint(md) {
      align-items: flex-end;
      gap: 0.4rem;
      height: 4.8rem;
      overflow: visible;
      mask-image: none;
    }
  }

  // Each postmark close up, cropped to its tile.
  .post-office__type {
    flex-shrink: 0;
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: calc(0.9rem * var(--zoom, 1));
    background: #fff;
    // From md, dimmed but for the one in hand, and all at full strength
    // while the dock is hovered (--tile-dim, from .post-office__tray). Small
    // screens have no hover, so they're all at full strength.
    opacity: 1;
    transition: opacity var(--ease);
    overflow: hidden;
    cursor: inherit;

    @include breakpoint(md) {
      opacity: var(--tile-dim, 0.4);
    }

    &.is-selected {
      opacity: 1;
    }

    &:focus-visible {
      outline: 2px solid #285955;
      outline-offset: 0.2rem;
    }
  }

  // The tile's contents at its 40px size, scaled with the tile.
  .post-office__type-zoom {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 4rem;
    height: 4rem;
    transform: scale(var(--zoom, 1));
    transform-origin: 0 0;
  }

  .post-office__type-art {
    position: absolute;
    top: 0;
    left: 0;
    max-width: none;
    height: auto;
    transform-origin: 0 0;
  }

  // Figma 2449:12695: the top-left corner. Hidden on small screens for
  // now: the stamp is the only tool yet.
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

    @include breakpoint(md) {
      display: flex;
    }
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
    POSTMARKS,
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
  // soft spring (no bounce) so it glides rather than lurches.
  const SLIDE_S = 1
  const slide = computed(() => {
    const transition = reduceMotion.value
      ? { duration: 0.01 }
      : { type: 'spring', duration: SLIDE_S, bounce: 0 }
    return {
      enter: (to: number) => ({ x: to > 0 ? '100%' : '-100%' }),
      center: { x: 0, transition },
      exit: (to: number) => ({ x: to > 0 ? '-100%' : '100%', transition }),
    }
  })
  // A beat after the stamp that covers the sheet lands, before turning.
  const TURN_DELAY_MS = 700
  let turnTimer: ReturnType<typeof setTimeout> | undefined

  const selectedId = ref<PostmarkType>(POSTMARKS[0]!.id)
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

  // A postmark close up in its tile: scaled and moved as in Figma, from
  // the art's own origin (the line cancel's box starts before it).
  function tileStyle(type: (typeof POSTMARKS)[number]) {
    const { sx, sy, tx, ty } = type.tile
    return {
      width: `${type.width}px`,
      transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy}) translate(${type.x ?? 0}px, ${type.y ?? 0}px)`,
    }
  }

  // The Dock's magnification: each tile TILE px, up to TILE_MAX right
  // under the pointer, falling off over DOCK_REACH px either side. Measured
  // from the tray's centre in its resting layout (it stays centred as it
  // grows), with the pointer and the hover each on a spring so it eases in
  // and out like the real one.
  const TILE = 40
  const TILE_MAX = 64
  const TILE_GAP = 4
  const DOCK_REACH = 110
  const trayEl = useTemplateRef<HTMLElement>('trayEl')
  const dockX = useMotionValue(0)
  const dockHover = useMotionValue(0)
  const dockXSmooth = useSpring(dockX, { stiffness: 400, damping: 40 })
  const dockHoverSmooth = useSpring(dockHover, { stiffness: 300, damping: 30 })
  // Phones have no hover to magnify with, and a thumb to pick with: bigger
  // tiles there (TILE_PHONE), the Dock's from md.
  const TILE_PHONE = 56
  const tileBase = ref(TILE)
  const tileSizes = ref(POSTMARKS.map(() => TILE))
  let mdQuery: MediaQueryList | undefined
  function onBreakpoint() {
    tileBase.value = mdQuery?.matches ? TILE : TILE_PHONE
    tileSizes.value = POSTMARKS.map(() => tileBase.value)
    nextTick(onTrayScroll)
  }

  function sizeTiles() {
    const x = dockXSmooth.get()
    const amount = dockHoverSmooth.get()
    const middle = (POSTMARKS.length - 1) / 2
    tileSizes.value = POSTMARKS.map((_, index) => {
      const distance = Math.abs(x - (index - middle) * (TILE + TILE_GAP))
      const near =
        distance < DOCK_REACH ? Math.cos((distance / DOCK_REACH) * (Math.PI / 2)) : 0
      return tileBase.value + (TILE_MAX - tileBase.value) * near * amount
    })
  }
  dockXSmooth.on('change', sizeTiles)
  dockHoverSmooth.on('change', sizeTiles)

  function onDock(event: PointerEvent) {
    const tray = trayEl.value
    if (event.pointerType !== 'mouse' || reduceMotion.value || !tray) return
    if (!window.matchMedia('(min-width: 700px)').matches) return
    const rect = tray.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    // Coming in: straight to the pointer, then follow it.
    if (dockHover.get() === 0) dockXSmooth.jump(x)
    dockX.set(x)
    dockHover.set(1)
  }

  function offDock() {
    dockHover.set(0)
  }

  // Whether the tiles scroll on past either edge, for the fades.
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
    const tip = ref<{ text: string; x: number; y: number } | null>(null)
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
    }
  }

  function onLeave() {
    aim.value = null
    tip.value = null
  }

  // Placed as a share of the sheet, sized against its width (cqw), tilted
  // by its seed.
  function markStyle(
    mark: Pick<Mark, 'type' | 'x' | 'y' | 'seed'>,
    tilted = true,
  ) {
    const type = postmark(mark.type)
    return {
      left: `${mark.x * 100}%`,
      top: `${mark.y * 100}%`,
      width: `calc(${((type.width * SHEET_SCALE) / SHEET_WIDTH) * 100}cqw * var(--mark-scale, 1))`,
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

  function isNear(event: PointerEvent) {
    const shell = sheetEl.value?.parentElement
    if (!shell) return false
    const zones: [string, number][] = [
      ['.post-office__close', CLOSE_MARGIN],
      ['.post-office__tray', TOOLS_MARGIN],
      ['.post-office__toolbar', TOOLS_MARGIN],
      ['.post-office__dots', TOOLS_MARGIN],
    ]
    return zones.some(([selector, margin]) => {
      const rect = shell.querySelector(selector)?.getBoundingClientRect()
      return (
        !!rect &&
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

  function onStamp(event: PointerEvent) {
    if (event.button !== 0 || !sheet.value || !onLast.value) return
    if (event.pointerType === 'mouse' && isNear(event)) return
    pressing.value = true
    window.addEventListener('pointerup', letGo, { once: true })
    window.addEventListener('pointercancel', letGo, { once: true })
    const { x, y } = pointOf(event)
    if (event.pointerType !== 'mouse') placeAim(x, y)
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
    stamp(selected.value.id, x, y).then((result) => {
      if (result !== 'dry') return
      now.value = Date.now()
      rest()
    })
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

  async function opened(isOpen: boolean) {
    if (import.meta.server) return
    if (isOpen) {
      // A different postmark in hand each time it opens.
      selectedId.value =
        POSTMARKS[Math.floor(Math.random() * POSTMARKS.length)]!.id
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
