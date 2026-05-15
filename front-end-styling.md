# Nuxt Vue Code Style Rules

## `.vue` File Structure

Always use this block order in `.vue` files — no exceptions:

1. `<template>`
2. `<style>`
3. `<script>`

```vue
<template>
  <!-- markup -->
</template>

<style scoped lang="scss">
  /* styles */
</style>

<script lang="ts">
  // logic
</script>
```

## Style Rules

### Always Scoped

All `<style>` blocks must use the `scoped` attribute:

```vue
<!-- ✅ correct -->
<style scoped lang="scss">

<!-- ❌ wrong -->
<style lang="scss">
```

### Prefer Flexbox Over CSS Grid

Use flexbox as the default layout tool. Only reach for CSS grid when flexbox genuinely cannot solve the layout problem.

```scss
// ✅ correct
.container {
  display: flex;
  gap: 16px;
}

// ❌ avoid unless flexbox can't do it
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

### Use Breakpoint Mixins

Always use the project's breakpoint mixins for responsive styles. Never write raw media queries.

Available breakpoints: `xs`, `sm`, `md`, `mdl`, `lg`, `xl`

```scss
// ✅ correct
.card {
  font-size: 14px;

  @include breakpoint(md) {
    font-size: 16px;
  }
}

// ❌ wrong — no raw media queries
.card {
  @media (min-width: 768px) {
    font-size: 16px;
  }
}
```

### Avoid Style Nesting

Keep styles as flat as possible. Nesting should only be used for breakpoint mixins, pseudo-classes (`:hover`, `::before`, etc.), and direct state variants — not for descendant selectors.

```scss
// ✅ correct — flat with minimal nesting
.card {
  display: flex;
}

.card-title {
  font-size: 18px;

  &:hover {
    color: var(--color-accent);
  }

  @include breakpoint(lg) {
    font-size: 22px;
  }
}

// ❌ wrong — unnecessary nesting
.card {
  display: flex;

  .card-title {
    font-size: 18px;

    span {
      color: red;
    }
  }
}
```

### Property Order

Order CSS properties from broad layout impact to finer details. When in doubt, ask: "does this property affect how surrounding elements are positioned?" — if yes, it goes near the top.

We should use rem units for box model values.

```scss
.example {
  // Layout
  display: flex;
  position: relative;
  z-index: 1;

  // Box model
  margin: 0 auto;
  padding: 1.6rem;
  width: 100%;
  height: 4.8rem;

  // Visual
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background: var(--color-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  // Typography
  font-size: 14px;
  font-family: var(--font-base);
  text-align: left;
  text-transform: uppercase;

  // Misc
  transform: translateY(0);
  transition: opacity 0.2s ease;
  overflow: hidden;
  cursor: pointer;
}
```

Full ordering reference:

| Group      | Properties                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Layout     | `display`, `flex-direction`, `flex-wrap`, `align-items`, `justify-content`, `align-self`, `gap`, `position`, `z-index` |
| Box model  | `margin`, `padding`, `width`, `height`                                                                                 |
| Visual     | `border`, `color`, `background`, `box-shadow`                                                                          |
| Typography | `font-size`, `font-family`, `text-align`, `text-transform`                                                             |
| Misc       | `transform`, `transition`, `overflow`, `cursor`                                                                        |

### Flex Sub-properties

When `display: flex` is used, flex-related properties follow immediately after `display`, before `position` and `z-index`:

```scss
// ✅ correct
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  gap: 16px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 16px;
}

// ❌ wrong — flex properties scattered
.container {
  display: flex;
  margin: 0 auto;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
}
```

This order should be maintained inside every rule block including inside breakpoint mixins.

## Script Rules

### Always Use TypeScript

All `<script>` blocks must use `lang="ts"`:

```vue
<!-- ✅ correct -->
<script lang="ts">

<!-- ❌ wrong -->
<script>
```

Use `<script setup lang="ts">` when using the Composition API:

```vue
<!-- ✅ preferred for Composition API -->
<script setup lang="ts">
```

## Typography Rules

### Use the Typography System

Always use the project's typography system defined in `style/type.scss`. Never write custom `font-size`, `line-height`, `letter-spacing`, or `font-family` values directly.

**Available typography tokens:**

- `TEXT-600`: Large display (56px)
- `TEXT-400`: Medium display (36px)
- `TEXT-300`: Small display / large heading (24px)
- `TEXT-200`: Body large (16px)
- `TEXT-100`: Body (14px)
- `TEXT-EYEBROW`: Labels, tags (12px, uppercase, mono)
- `TEXT-FOOTNOTE`: Small text (10px)

**Font family tokens:**

- `--font-sans`: Cash Sans Regular (default)
- `--font-sans-medium`: Cash Sans Medium
- `--font-mono`: Cash Mono Regular
- `--font-block`: Exact Block Regular

### How to Apply Typography

Use CSS variables from the typography system:

```scss
// ✅ correct — using typography tokens
.card-title {
  font-size: var(--text-300-size);
  font-family: var(--font-sans);
  line-height: var(--text-300-line-height);
  letter-spacing: var(--text-300-tracking);
}

// ✅ also correct — using utility class
<span class="text-100">Body text</span>

// ❌ wrong — custom typography values
.card-title {
  font-size: 18px;
  font-family: sans-serif;
  line-height: 1.4;
}
```

### Typography in Vue Components

When styling text in components, apply the appropriate typography scale:

```vue
<template>
  <div class="card">
    <span class="card__title">Heading</span>
    <p class="card__body">Body text</p>
  </div>
</template>

<style scoped lang="scss">
  .card__title {
    font-size: var(--text-300-size);
    font-family: var(--font-sans-medium);
    line-height: var(--text-300-line-height);
    letter-spacing: var(--text-300-tracking);
  }

  .card__body {
    font-size: var(--text-100-size);
    font-family: var(--font-sans);
    line-height: var(--text-100-line-height);
    letter-spacing: var(--text-100-tracking);
  }
</style>
```
