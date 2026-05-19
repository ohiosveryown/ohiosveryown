---
name: site-header
description: API reference for the SiteHeader Vue component in this Nuxt project (app/components/SiteHeader.vue). Use when adding a SiteHeader to a page, customizing its greeting or h1 content, or asking about its slot vocabulary (.row, .has-tooltip, .icon-square).
disable-model-invocation: true
---

# SiteHeader API

`app/components/SiteHeader.vue` is the site-wide page header (greeting + multi-row `<h1>`). Nuxt auto-imports it — no `import` statement needed.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `greeting` | `string` | `'Welcome traveler'` | Plain text shown above the h1. Override per page or omit for the default. |

## Slots

| Slot | Required in practice | Purpose |
|---|---|---|
| default (no name) | Yes | h1 content — typically one or more `<span class="row">` lines |
| `greeting` (named) | No | Use only when the greeting needs rich markup; otherwise prefer the `greeting` prop |

The default slot has no fallback content — passing no children renders an empty `<h1>`. Always provide content.

## Slot content vocabulary

`SiteHeader` owns visual rules for these class names via `:deep()` selectors, so the parent authors markup using them and the component styles them:

| Class | Applied to | Effect |
|---|---|---|
| `.row` | a `<span>` wrapping a single line of the h1 | Forces `display: block` so the line breaks onto its own row |
| `.has-tooltip` | a `<span>` around a word/phrase | Hover-tooltip behavior; **must** include `data-tooltip="…"` and optionally `data-tooltip-image="…"`. Rendered globally by `app/components/TooltipLabel.vue`. |
| `.icon-square` | the `<IconSquare />` component | Sizes and aligns the inline Square logo to the text baseline |

**Do not** add scoped styles for these classes in the parent — `SiteHeader` owns them.

## Gotcha: reset.scss + slotted typography

`app/style/reset.scss` applies `font-weight: normal` globally to many tag selectors (including `span`, `h1`, `p`, etc.). When a property is zeroed by the reset on the slotted element type, **inheritance from the parent is not enough** — the parent's value loses to the reset's direct rule on the child.

Pattern: when a typography property (or any reset-zeroed property) needs to apply to slot content, target the slotted descendant directly via `:deep()`:

```scss
h1,
h1 :deep(span) {
  font-family: 'italic', Courier, monospace;
  font-weight: 100;
  /* …other typography */
}
```

This is exactly how `SiteHeader`'s h1 styles reach its slotted spans. Any future component that takes rich slot content will need the same pattern.

## Examples

### Minimal (default greeting)

```vue
<template>
  <SiteHeader>
    <span class="row">Some intro line.</span>
    <span class="row">Another line.</span>
  </SiteHeader>
</template>
```

### Home page (multi-row + inline tooltips + inline icon)

```vue
<template>
  <SiteHeader>
    <span class="row">
      I'm
      <span
        class="has-tooltip"
        data-tooltip="Hey there 👋"
        data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp"
        >Matt</span
      >, a principal designer at
      <span
        class="has-tooltip"
        data-tooltip="$XYZ"
        data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/hero.webp"
        >Square</span
      >
      <IconSquare class="icon-square" />
      ,
    </span>
    <span class="row">
      living in always peachy,
      <span
        class="has-tooltip"
        data-tooltip="The city in a forest"
        data-tooltip-image="https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/atlanta@3x.webp"
        >Atlanta, Ga</span
      >
      🍑.
    </span>
  </SiteHeader>
</template>
```

### Custom greeting via prop

```vue
<SiteHeader greeting="Hey hey">
  <span class="row">…</span>
</SiteHeader>
```

### Rich greeting via named slot

```vue
<SiteHeader>
  <template #greeting>
    <em>Welcome,</em> friend
  </template>
  <span class="row">…</span>
</SiteHeader>
```

## Don't

- Don't rename the slot vocabulary classes — they are exactly `.row`, `.has-tooltip`, `.icon-square`.
- Don't add scoped styles for `.row`, `.has-tooltip`, or `.icon-square` in the consuming page — `SiteHeader` styles them via `h1 :deep(.row)` etc.
- Don't replace `<SiteHeader>` with a hand-rolled `<header>` block; reuse the component for visual consistency across pages.
- Don't use `<Transition>` to animate header content — follow the project's `motion-v` convention if entrance animations are needed.
