<template>
  <!-- Blush to type with, in a post (Craft: a line that's only
       "[[type tester]]"), as in Figma (2482:21665): one line, sized to fill
       the box's width, with a slider for each of its axes along the
       bottom. -->
  <figure
    class="blush-tester"
    aria-label="Try Blush"
  >
    <div
      ref="box"
      class="blush-tester__box"
    >
      <div class="blush-tester__line">
        <input
          v-model="text"
          class="blush-tester__text"
          :class="{ 'is-empty': !text }"
          :style="{ fontSize: `${size}px`, fontVariationSettings: axes }"
          type="text"
          :placeholder="PLACEHOLDER"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          aria-label="Type something in Blush"
          @focus="focused = true"
          @blur="focused = false"
        />
        <!-- A caret, blinking, at the start of the words, until you type
             (then the field's own). -->
        <span
          v-if="!focused"
          class="blush-tester__caret"
          :style="{ fontSize: `${size}px`, left: `${start}px` }"
          aria-hidden="true"
        />
        <!-- The same words, unseen, at a set size: how wide they set, to
             scale the field's size from. -->
        <span
          ref="measure"
          class="blush-tester__measure"
          :style="{ fontSize: `${MEASURE_PX}px`, fontVariationSettings: axes }"
          aria-hidden="true"
          >{{ text || PLACEHOLDER }}</span
        >
      </div>

      <div class="blush-tester__controls">
        <label
          v-for="axis in AXES"
          :key="axis.key"
          class="blush-tester__control"
        >
          <span class="blush-tester__label">{{ axis.name }}</span>
          <input
            v-model.number="values[axis.key].value"
            class="blush-tester__slider"
            type="range"
            :min="axis.min"
            :max="axis.max"
            :step="axis.step"
            :style="{
              '--fill': (values[axis.key].value - axis.min) / (axis.max - axis.min),
            }"
          />
        </label>
      </div>
    </div>

    <figcaption class="blush-tester__caption">Type to try Blush.</figcaption>
  </figure>
</template>

<style scoped lang="scss">
  .blush-tester {
    margin: var(--around-image, 1.6rem) 0;
  }

  .blush-tester__box {
    position: relative;
    aspect-ratio: 817 / 510;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  // The line, across the middle, in from the sides: above the sliders'
  // two rows when narrow.
  .blush-tester__line {
    display: flex;
    align-items: center;
    position: absolute;
    inset: 0 2rem 7.2rem;

    @include breakpoint(md) {
      inset: 0 4rem;
    }
  }

  .blush-tester__text {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    color: #fff;
    background: none;
    font-family: 'blush', var(--system-font);
    letter-spacing: -0.015em;
    line-height: 1.2;
    text-align: center;
    outline: none;
    caret-color: #fff;

    // Nothing typed: from the left, where the caret waits.
    &.is-empty {
      text-align: left;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  // Taller than the capitals, centred on them (Figma's caret), just left
  // of the first letter.
  .blush-tester__caret {
    position: absolute;
    top: 50%;
    width: 0.2rem;
    height: 1.17em;
    margin-left: -0.04em;
    background: #fff;
    transform: translate(-50%, -50%);
    animation: blush-tester-blink 1.06s steps(1) infinite;
    pointer-events: none;
  }

  @keyframes blush-tester-blink {
    50% {
      opacity: 0;
    }
  }

  .blush-tester__measure {
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'blush', var(--system-font);
    letter-spacing: -0.015em;
    white-space: pre;
    visibility: hidden;
    pointer-events: none;
  }

  // Along the bottom: two by two when narrow, then in a row.
  .blush-tester__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.2rem 2rem;
    position: absolute;
    right: 2rem;
    bottom: 1.6rem;
    left: 2rem;

    @include breakpoint(md) {
      flex-wrap: nowrap;
      bottom: 4.85rem;
    }
  }

  .blush-tester__control {
    display: flex;
    flex: 1 1 40%;
    align-items: center;
    gap: 0.8rem;

    @include breakpoint(md) {
      flex: 0 1 auto;
      min-width: 0;
    }
  }

  .blush-tester__label {
    flex-shrink: 0;
    width: 4.4rem;
    color: rgba(255, 255, 255, 0.6);
    font-family: var(--system-font);
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: -0.013rem;

    @include breakpoint(md) {
      width: auto;
    }
  }

  // White up to the thumb's middle, dark grey past it (Figma's slider).
  .blush-tester__slider {
    flex: 1 1 auto;
    min-width: 0;
    height: 1.6rem;
    margin: 0;
    background: none;
    appearance: none;
    cursor: var(--cursor);

    // Figma's 13.5rem, shorter where the box is narrower than its.
    @include breakpoint(md) {
      flex: 0 1 13.5rem;
    }

    &::-webkit-slider-runnable-track {
      height: 0.4rem;
      border-radius: 0.2rem;
      background: linear-gradient(
        to right,
        #fff calc(0.8rem + (100% - 1.6rem) * var(--fill)),
        #3a3a3a 0
      );
    }

    &::-moz-range-track {
      height: 0.4rem;
      border-radius: 0.2rem;
      background: linear-gradient(
        to right,
        #fff calc(0.8rem + (100% - 1.6rem) * var(--fill)),
        #3a3a3a 0
      );
    }

    &::-webkit-slider-thumb {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: -0.6rem;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.24);
      appearance: none;
    }

    &::-moz-range-thumb {
      width: 1.6rem;
      height: 1.6rem;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.24);
    }

    &:focus-visible {
      outline: 1px solid rgba(255, 255, 255, 0.5);
      outline-offset: 0.2rem;
      border-radius: 0.4rem;
    }
  }

  // As the post's captions under its images.
  .blush-tester__caption {
    display: block;
    margin: 1.6rem auto 0;
    opacity: 0.8;
    font-family: var(--text-font);
    font-size: 1.2rem;
    letter-spacing: -0.014rem;
    line-height: 1.5;
    text-align: center;
    text-box-edge: cap alphabetic;
    text-box-trim: trim-both;

    @include breakpoint(md) {
      font-size: 1.4rem;
    }
  }
</style>

<script setup lang="ts">
  const SAMPLE = 'Blush is nice...'
  const PLACEHOLDER = 'Type something'

  // Blush's axes (from the font's fvar table), in Figma's order.
  const AXES = [
    { key: 'width', name: 'Width', min: 75, max: 100, step: 0.5, start: 87.5 },
    { key: 'weight', name: 'Weight', min: 200, max: 900, step: 1, start: 400 },
    { key: 'height', name: 'Height', min: 100, max: 125, step: 1, start: 100 },
    // Upright at the left, leaning further right along it: the slider's
    // 0–10 is slnt 0 to −10.
    { key: 'slant', name: 'Slant', min: 0, max: 10, step: 1, start: 0 },
  ] as const
  type Axis = (typeof AXES)[number]['key']

  const text = ref(SAMPLE)
  const values = Object.fromEntries(
    AXES.map((axis) => [axis.key, ref<number>(axis.start)]),
  ) as Record<Axis, Ref<number>>
  const axes = computed(
    () =>
      `'wght' ${values.weight.value}, 'wdth' ${values.width.value}, 'HGHT' ${values.height.value}, 'slnt' ${-values.slant.value}`,
  )

  // The words set as wide as the line, but no taller than about half the
  // box (a word or two would be enormous) and no smaller than reads.
  const MEASURE_PX = 100
  const MAX_SHARE = 0.36
  const MIN_PX = 16
  const box = useTemplateRef<HTMLElement>('box')
  const measure = useTemplateRef<HTMLElement>('measure')
  const size = ref(MEASURE_PX)
  // Where the words start in the line (px), for the caret.
  const start = ref(0)
  const focused = ref(false)

  function fit() {
    const line = measure.value?.parentElement
    if (!box.value || !line || !measure.value) return
    const wide = measure.value.getBoundingClientRect().width
    if (!wide) return
    const fill = (line.clientWidth / wide) * MEASURE_PX
    size.value = Math.max(
      MIN_PX,
      Math.min(fill, box.value.clientHeight * MAX_SHARE),
    )
    // Centred, so in by half of what's left; at the left with nothing
    // typed, before the placeholder (sized to fit the same way).
    const set = (wide * size.value) / MEASURE_PX
    start.value = text.value ? Math.max(0, (line.clientWidth - set) / 2) : 0
  }

  // Once the words or the axes have changed and been drawn.
  watch([text, axes], () => nextTick(fit))

  let resized: ResizeObserver | undefined
  onMounted(() => {
    fit()
    // Again once Blush has loaded, as the fallback sets wider or narrower.
    document.fonts?.ready.then(fit)
    resized = new ResizeObserver(fit)
    if (box.value) resized.observe(box.value)
  })
  onBeforeUnmount(() => resized?.disconnect())
</script>
