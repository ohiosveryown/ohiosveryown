<template>
  <!-- Blush to type with, in a post (Craft: a line that's only
       "[[type tester]]"): a phone book listing to start, and a slider for
       the size and each of its axes. -->
  <section
    class="blush-tester"
    aria-label="Try Blush"
  >
    <textarea
      ref="field"
      v-model="text"
      class="blush-tester__text"
      :style="{
        fontSize: `${size / 10}rem`,
        fontVariationSettings: `'wght' ${weight}, 'wdth' ${width}, 'HGHT' ${height}, 'slnt' ${slant}`,
      }"
      rows="1"
      spellcheck="false"
      autocomplete="off"
      autocapitalize="off"
      aria-label="Type something in Blush"
      @input="fit"
    />

    <div class="blush-tester__controls">
      <label
        v-for="axis in AXES"
        :key="axis.key"
        class="blush-tester__control"
      >
        <span class="blush-tester__label">
          {{ axis.name }}
          <span class="blush-tester__value">{{ values[axis.key].value }}</span>
        </span>
        <input
          v-model.number="values[axis.key].value"
          class="blush-tester__slider"
          type="range"
          :min="axis.min"
          :max="axis.max"
          :step="axis.step"
          :style="{
            '--fill': `${((values[axis.key].value - axis.min) / (axis.max - axis.min)) * 100}%`,
          }"
          @input="fit"
        />
      </label>
      <button
        class="blush-tester__reset"
        type="button"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .blush-tester {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin: var(--around-image, 1.6rem) 0;
    padding: 2rem;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.06);
  }

  // Grows with what's typed (field-sizing, or fit() where that's missing).
  .blush-tester__text {
    display: block;
    width: 100%;
    min-height: 1.2em;
    padding: 0;
    border: none;
    color: #fff;
    background: none;
    font-family: 'blush', var(--system-font);
    line-height: 1.05;
    field-sizing: content;
    resize: none;
    overflow: hidden;
    outline: none;
    caret-color: #fff;
  }

  .blush-tester__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 1.2rem 2rem;
  }

  .blush-tester__control {
    display: flex;
    flex: 1 1 12rem;
    flex-direction: column;
    gap: 0.6rem;
  }

  .blush-tester__label {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.6);
    font-family: var(--system-font);
    font-size: 1.3rem;
  }

  .blush-tester__value {
    color: rgba(255, 255, 255, 0.9);
    font-variant-numeric: tabular-nums;
  }

  // A thin track filled up to the thumb (--fill), as the site's dark UI.
  .blush-tester__slider {
    width: 100%;
    height: 2rem;
    margin: 0;
    background: none;
    appearance: none;
    cursor: var(--cursor);

    &::-webkit-slider-runnable-track {
      height: 0.4rem;
      border-radius: 100rem;
      background: linear-gradient(
        to right,
        #fff var(--fill),
        rgba(255, 255, 255, 0.18) var(--fill)
      );
    }

    &::-moz-range-track {
      height: 0.4rem;
      border-radius: 100rem;
      background: linear-gradient(
        to right,
        #fff var(--fill),
        rgba(255, 255, 255, 0.18) var(--fill)
      );
    }

    &::-webkit-slider-thumb {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: -0.6rem;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
      appearance: none;
    }

    &::-moz-range-thumb {
      width: 1.6rem;
      height: 1.6rem;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
    }

    &:focus-visible {
      outline: 1px solid rgba(255, 255, 255, 0.5);
      outline-offset: 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .blush-tester__reset {
    padding: 0.6rem 1.4rem;
    border-radius: 100rem;
    color: #fff;
    background: #323232;
    font-size: 1.3rem;
    font-weight: 500;
    transition: background var(--ease);
    cursor: var(--cursor);

    &:hover,
    &:focus-visible {
      background: #404040;
    }
  }
</style>

<script setup lang="ts">
  // A listing as the phone book set it, in the face made for it.
  const SAMPLE = 'Pence Matthew 112 Peachtree St · · · 404 555-0123'

  // Blush's axes (from the font's fvar table), and the size.
  const AXES = [
    { key: 'size', name: 'Size', min: 24, max: 120, step: 1, start: 56 },
    { key: 'weight', name: 'Weight', min: 200, max: 900, step: 1, start: 400 },
    { key: 'width', name: 'Width', min: 75, max: 100, step: 1, start: 100 },
    { key: 'height', name: 'Height', min: 100, max: 125, step: 1, start: 100 },
    { key: 'slant', name: 'Slant', min: -10, max: 0, step: 1, start: 0 },
  ] as const
  type Axis = (typeof AXES)[number]['key']

  const text = ref(SAMPLE)
  const values = Object.fromEntries(
    AXES.map((axis) => [axis.key, ref<number>(axis.start)]),
  ) as Record<Axis, Ref<number>>
  const { size, weight, width, height, slant } = values

  const field = useTemplateRef<HTMLTextAreaElement>('field')

  // Where the browser can't size the field to its text (field-sizing),
  // grow it to fit, after the text or the type has changed.
  function fit() {
    const el = field.value
    if (!el || CSS.supports('field-sizing', 'content')) return
    nextTick(() => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    })
  }

  function reset() {
    text.value = SAMPLE
    for (const axis of AXES) values[axis.key].value = axis.start
    fit()
  }

  onMounted(fit)
</script>
