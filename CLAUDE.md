# Project Guidelines

Nuxt 4 + Vue 3 + TypeScript + SCSS. Styles live in `app/style/`.

---

## Vue SFC structure

Always use this block order — no exceptions:

1. `<template>`
2. `<style scoped lang="scss">` — must be scoped, must be SCSS
3. `<script lang="ts">` or `<script setup lang="ts">` — never plain JS

```vue
<template>
  <!-- markup -->
</template>

<style scoped lang="scss">
  /* styles */
</style>

<script setup lang="ts">
  // logic
</script>
```

---

## SCSS conventions

### Layout

- Use **flexbox** as the default. Only reach for CSS Grid when flexbox cannot solve the layout.

### Units

- The reset sets `html { font-size: 62.5% }`, so `1rem === 10px`.
- Use **rem** for box-model values (`margin`, `padding`, `width`, `height`).
- Use `px` only for hairline borders and similar fine details.

### Breakpoints

`grid.scss` is auto-injected via Vite `additionalData`, so `breakpoint()` is globally available — **no `@use` needed**. Never write raw `@media` queries.

| name  | min-width |
| ----- | --------- |
| `xs`  | 360px     |
| `sm`  | 600px     |
| `md`  | 700px     |
| `mdl` | 1000px    |
| `lg`  | 1200px    |
| `xl`  | 2000px    |

```scss
.card {
  font-size: 1.4rem;

  @include breakpoint(md) {
    font-size: 1.6rem;
  }
}
```

### Nesting

Keep selectors flat. Only nest for:

- Pseudo-classes / pseudo-elements (`:hover`, `::before`)
- State variants (`&.is-active`)
- Breakpoint mixins

Do **not** nest descendant selectors — use a flat BEM-style class on the child.

### Property order

Order properties from broad layout impact to finer details. Maintain this order inside breakpoint blocks too. When in doubt, ask: "does this property affect how surrounding elements are positioned?" — if yes, it goes near the top.

1. **Layout** — `display`, then flex sub-props (`flex-direction`, `flex-wrap`, `align-items`, `justify-content`, `align-self`, `gap`), then `position`, `z-index`
2. **Box model** — `margin`, `padding`, `width`, `height`
3. **Visual** — `border`, `color`, `background`, `box-shadow`
4. **Typography** — `font-size`, `font-family`, `text-align`, `text-transform`
5. **Misc** — `transform`, `transition`, `overflow`, `cursor`

---

## Typography

Defined in `app/style/type.scss` (auto-loaded via `nuxt.config.ts`).

### Font families

Three custom local fonts. Apply via mixins or utility classes — never raw `font-family` strings.

| Mixin             | Class     | Font file        |
| ----------------- | --------- | ---------------- |
| `@include sans`   | `.sans`   | `sans.woff2` (variable 1–999)   |
| `@include thin`   | `.thin`   | `thin.woff2`                    |
| `@include italic` | `.italic` | `italic.woff2` (variable 1–999) |

`--system-font` is also available for system-font fallbacks.

### Headings and body

`h1`–`h6`, `p`, and `small` are pre-styled with fluid `clamp()` sizing. Use the semantic tag; do not override `font-size` / `line-height` / `font-family` without a strong reason.

### Text utility classes (global)

`.sans` / `.thin` / `.italic`, `.uc` (uppercase), `.tac` / `.tar` / `.taj` (align), `.underline`.

---

## Global CSS variables (from `reset.scss`)

- Spacing & layout: `--unit` (1.2rem), `--max-width` (200rem)
- Easing: `--ease`, `--ease-qubic`, `--spring`
- Z-index: `--zmax`, `--z5`…`--z1`, `--z0`, `--zmin`
- Fonts: `--system-font`

Prefer these tokens over hard-coded values where they fit.

---

## Animation: `motion-v`

This project uses [`motion-v`](https://motion.unovue.com/) for animation work. **Do not** use Vue's built-in `<Transition>` / `<TransitionGroup>` — `AnimatePresence` already wraps them.

### When to use what

- **CSS `transition`** (with `--ease`, `--ease-qubic`, `--spring` tokens) — trivial single-property hover/focus changes (`color`, `opacity`, `transform`).
- **motion-v** — entrance/exit, choreographed sequences, viewport-triggered, gestures, anything across `v-if` / `v-show`, variant-driven subtrees.

### API conventions

- Prefer the namespace API (`<motion.div>`) over `<Motion as="div">`.
- Bind object props with `:` and use kebab-case for multi-word props (`:in-view`, `:in-view-options`, `:while-hover`, `:while-press`).
- Use `:initial="false"` to skip the first animation (e.g. SSR-hydrated content).
- `motion.create(MyComponent)` wraps a custom Vue component.

### Enter/exit

Wrap conditional elements in `<AnimatePresence>`:

```vue
<AnimatePresence>
  <motion.div
    v-if="isOpen"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
  />
</AnimatePresence>
```

- `:multiple="true"` for animating lists (uses `TransitionGroup`).
- `mode="wait" | "sync" | "popLayout"` to control overlap.
- `:unwrap-element="true"` for Radix-style wrapper components.

### Viewport & gestures

- `:in-view` + `:in-view-options="{ once, amount, margin, root }"` for scroll-triggered entry.
- `:while-hover` / `:while-press` for gesture-driven motion (prefer over CSS `:hover` when the animation needs spring physics or multiple properties).

### Accessibility

`reset.scss` handles `prefers-reduced-motion` for CSS, but motion-v animations are JS-driven and are **not** affected — gate or shorten meaningful motion manually when reduced motion is preferred.

---

## Style file map

| File                       | Purpose                                                       | Loading                                      |
| -------------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| `app/style/reset.scss`     | Root CSS variables, element resets, a11y `prefers-reduced-motion` | Global, loaded in `nuxt.config.ts` `css[]`   |
| `app/style/type.scss`      | `@font-face`s, font mixins, heading/body scale, text utilities    | Global, loaded in `nuxt.config.ts` `css[]`   |
| `app/style/grid.scss`      | `breakpoint()` mixin, `grid-width()` fn, `$columns`, `$gutter`    | Auto-injected into every SCSS module via Vite `additionalData` |
