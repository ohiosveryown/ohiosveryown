<template>
  <!-- A postmark as a die-cut sticker (Figma 2457:17681): its shape in its
       sticker colour, darkening down, with a white border cut round it,
       and the postmark itself in white on top. The wide ones are cut down to a
       part of themselves (`clip`). -->
  <svg
    class="postmark-sticker"
    :viewBox="`${view.x} ${view.y} ${view.width} ${view.height}`"
    :width="view.width * sticker.scale"
    :height="view.height * sticker.scale"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="`${uid}-ink`"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          :offset="colors.from"
          :stop-color="colors.light"
        />
        <stop
          offset="1"
          :stop-color="colors.dark"
        />
      </linearGradient>
      <clipPath
        v-if="sticker.clip"
        :id="`${uid}-cut`"
      >
        <path :d="sticker.clip" />
      </clipPath>
    </defs>

    <!-- The die cut: the shape grown by its padding and the border, round
         at the corners. -->
    <path
      :d="sticker.shape"
      fill="#fff"
      stroke="#fff"
      :stroke-width="(sticker.pad + border) * 2"
      stroke-linejoin="round"
    />
    <path
      :d="sticker.shape"
      :fill="`url(#${uid}-ink)`"
      :stroke="`url(#${uid}-ink)`"
      :stroke-width="sticker.pad * 2"
      stroke-linejoin="round"
    />
    <g :clip-path="sticker.clip ? `url(#${uid}-cut)` : undefined">
      <PostmarkArt
        :type="type.id"
        :mark="mark"
        :serial="serial"
        :x="type.x ?? 0"
        :y="type.y ?? 0"
        ink="#fff"
        even
      />
    </g>
  </svg>
</template>

<style scoped lang="scss">
  .postmark-sticker {
    display: block;
    overflow: visible;
    // Close and crisp, like FigJam's stickers: a tight edge shadow, and a
    // soft one just under it.
    filter: drop-shadow(0 0.1rem 0.1rem rgba(0, 0, 0, 0.28))
      drop-shadow(0 0.2rem 0.4rem rgba(0, 0, 0, 0.16));
  }
</style>

<script setup lang="ts">
  import {
    inkAt,
    inkDarker,
    postmark,
    type Mark,
    type PostmarkType,
  } from '~/data/postmarks'

  const props = defineProps<{
    type: PostmarkType
    mark: Pick<Mark, 'at' | 'city' | 'region' | 'country' | 'seed'>
    serial: number
    // In the ink picked (a place along the gradient), rather than its own
    // colour.
    ink?: number
  }>()

  // The white border round the cut (px), whatever the sticker's scale.
  const BORDER_PX = 3

  // Each sticker's shape in the art's own units (PostmarkArt), how far its
  // ink runs past it (`pad`), how big it's drawn (`scale`, px per unit),
  // and the shape grown by that padding to cut the art down to (`clip`):
  // the circle with waves to its circle, the meter to its box, the
  // hello-from and the line cancel to their left-hand ends.
  type Sticker = {
    shape: string
    pad: number
    scale: number
    clip?: string
    // The shape's bounds, before padding and border.
    box: [number, number, number, number]
  }

  // Drawn clockwise, as the banner's ribbon is: two shapes winding
  // opposite ways would cancel out where they overlap.
  const circle = (cx: number, cy: number, r: number) =>
    `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${r * 2} 0a${r} ${r} 0 1 1 ${-r * 2} 0Z`
  const rect = (x: number, y: number, width: number, height: number) =>
    `M${x} ${y}h${width}v${height}h${-width}Z`

  const STICKERS: Record<PostmarkType, Sticker> = {
    stars: {
      shape: circle(23.97, 23.97, 21.76),
      pad: 2.6,
      scale: 1.15,
      box: [2.21, 2.21, 43.52, 43.52],
    },
    dashed: {
      shape: circle(23.98, 23.97, 21.36),
      pad: 2.6,
      scale: 1.15,
      box: [2.62, 2.61, 42.72, 42.72],
    },
    house: {
      shape: circle(23.97, 23.97, 21.65),
      pad: 2.6,
      scale: 1.15,
      box: [2.32, 2.32, 43.3, 43.3],
    },
    classic: {
      shape: circle(22.87, 23.97, 21.32),
      pad: 2.6,
      scale: 1.15,
      // Just past the ring, so none of the waves show.
      clip: circle(22.87, 23.97, 21.32 + 0.6),
      box: [1.55, 2.65, 42.64, 42.64],
    },
    banner: {
      shape: `${circle(27.66, 24.34, 22.5)}M1.48 37.25L6.64 32.46H48.69L53.85 37.25L48.69 42.05H6.64Z`,
      pad: 2.2,
      scale: 1.08,
      box: [1.48, 1.84, 52.37, 45],
    },
    triangle: {
      shape: 'M31.35 2.21L60.49 49.42H2.21Z',
      pad: 2.6,
      scale: 1.1,
      box: [2.21, 2.21, 58.28, 47.21],
    },
    meter: {
      shape: rect(27.66, 1.84, 33.2, 36.15),
      pad: 1.6,
      scale: 1.15,
      clip: rect(27.66 - 1.6, 1.84 - 1.6, 33.2 + 3.2, 36.15 + 3.2),
      box: [27.66, 1.84, 33.2, 36.15],
    },
    hello: {
      shape: rect(1.29, 1.29, 48.8, 35.78),
      pad: 1.4,
      scale: 0.834,
      clip: rect(1.29 - 1.4, 1.29 - 1.4, 48.8 + 2.8, 35.78 + 2.8),
      box: [1.29, 1.29, 48.8, 35.78],
    },
    cancel: {
      shape: rect(0, -0.5, 23, 16),
      pad: 1.2,
      scale: 1.68,
      clip: rect(-1.2, -1.7, 25.4, 18.4),
      box: [0, -0.5, 23, 16],
    },
    burgee: {
      shape: 'M51.73 6.96L37.51 17.31L36.9 17.76L37.51 18.21L51.73 28.56L1.01 34.47V1.04Z',
      pad: 2.6,
      scale: 1.1,
      box: [1.01, 1.04, 50.72, 33.43],
    },
  }

  // The stickers' colours, as in Figma: light (the ink they stamp in,
  // POSTMARKS) from `from` down to dark at the bottom.
  const RED = { light: '#a8322d', dark: '#8d0c06', from: 0.24 }
  const BLUE = { light: '#2c4a9a', dark: '#0f2d7c', from: 0.38 }
  const PURPLE = { light: '#4a3f7a', dark: '#260f8b', from: 0.38 }
  const GREEN = { light: '#2f5d46', dark: '#1b432f', from: 0.38 }
  const NAVY = { light: '#1f2a44', dark: '#051231', from: 0.38 }
  const COLORS: Record<PostmarkType, typeof RED> = {
    stars: RED,
    dashed: BLUE,
    house: PURPLE,
    classic: GREEN,
    banner: NAVY,
    triangle: RED,
    burgee: BLUE,
    meter: PURPLE,
    hello: GREEN,
    cancel: NAVY,
  }

  const uid = useId()
  const type = computed(() => postmark(props.type))
  const sticker = computed(() => STICKERS[props.type])
  const border = computed(() => BORDER_PX / sticker.value.scale)
  const colors = computed(() => {
    if (typeof props.ink !== 'number') return COLORS[props.type]
    const light = inkAt(props.ink)
    return { light, dark: inkDarker(light), from: COLORS[props.type].from }
  })

  // Room for the padding and the border round the shape.
  const view = computed(() => {
    const [x, y, width, height] = sticker.value.box
    const out = sticker.value.pad + border.value
    return {
      x: x - out,
      y: y - out,
      width: width + out * 2,
      height: height + out * 2,
    }
  })
</script>
