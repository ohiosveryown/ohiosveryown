# Project Guidelines

Nuxt 4 + Vue 3 + TypeScript + SCSS. Styles live in `app/style/`. Long-form rationale is in `front-end-styling.md` (note: that doc's "Typography Rules" section describes a system that does **not** exist in this codebase — trust this file and `app/style/type.scss` instead).

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

Order properties from broad layout impact to finer details. Maintain this order inside breakpoint blocks too.

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

## Style file map

| File                       | Purpose                                                       | Loading                                      |
| -------------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| `app/style/reset.scss`     | Root CSS variables, element resets, a11y `prefers-reduced-motion` | Global, loaded in `nuxt.config.ts` `css[]`   |
| `app/style/type.scss`      | `@font-face`s, font mixins, heading/body scale, text utilities    | Global, loaded in `nuxt.config.ts` `css[]`   |
| `app/style/grid.scss`      | `breakpoint()` mixin, `grid-width()` fn, `$columns`, `$gutter`    | Auto-injected into every SCSS module via Vite `additionalData` |
