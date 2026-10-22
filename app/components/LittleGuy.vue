<template>
  <div
    ref="root"
    class="little-guy"
    :style="{
      '--size': `${size}rem`,
      '--ratio': `${LITTLE_GUY.width} / ${LITTLE_GUY.height}`,
      '--rows': LITTLE_GUY.rows.length,
      '--row': row,
    }"
    role="img"
    :aria-label="label"
    @click="hop"
  >
    <!-- Turns toward the pointer (transform written by the springs). -->
    <div
      ref="turn"
      class="little-guy__turn"
    >
      <motion.div
        class="little-guy__body"
        :animate="bodyAnimation"
      >
        <!-- First frame: shown until the video plays, and on its own when
             motion is reduced. Hidden once he moves, or its edge would peek
             out around the video. -->
        <img
          v-show="!playing && !tricking"
          ref="stillFrame"
          class="little-guy__layer"
          :src="`/little-guy/rest${variant}.webp`"
          alt=""
          draggable="false"
        />
        <!-- One looping video, keyed to transparency, with every state
             stacked top to bottom. They share the same body motion frame for
             frame (only the face differs), so changing state is just showing
             another row: instant, and always in sync. -->
        <div
          v-if="ext"
          v-show="!tricking"
          class="little-guy__layer little-guy__window"
        >
          <video
            ref="video"
            class="little-guy__video"
            :src="`/little-guy/speak${variant}.${ext}`"
            muted
            loop
            playsinline
            preload="auto"
            aria-hidden="true"
            @playing="onPlaying"
          />
        </div>
        <!-- A one-off clip in place of his loop (see `trick`), framed to
             match it, with room around him for what he's holding. It starts
             and ends looking like his loop, so the swaps don't show. -->
        <video
          v-if="tricking && ext"
          class="little-guy__trick"
          :src="`/little-guy/${trick}.${ext}`"
          muted
          playsinline
          autoplay
          aria-hidden="true"
          @ended="endTrick"
          @error="endTrick"
        />
      </motion.div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .little-guy {
    display: block;
    position: relative;
    width: var(--size);
    aspect-ratio: var(--ratio);
    user-select: none;
    cursor: var(--cursor, pointer);
    -webkit-tap-highlight-color: transparent;
  }

  .little-guy__turn {
    position: absolute;
    inset: 0;
    transform-origin: 50% 70%;
    will-change: transform;
  }

  .little-guy__body {
    position: absolute;
    inset: 0;
    transform-origin: 50% 85%;
  }

  .little-guy__layer {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    pointer-events: none;
  }

  .little-guy__window {
    overflow: hidden;
  }

  // The trick clips are square, with him smaller in frame than in his loop:
  // sized and offset so his body lands exactly where it is in the loop.
  .little-guy__trick {
    display: block;
    position: absolute;
    top: -16.8%;
    left: -16.25%;
    width: 127.5%;
    height: 141.7%;
    max-width: none;
    // The headphones drop in from above the clip's frame (and are lifted
    // back out), cut off by its top edge. While they cross it, that edge
    // fades instead; while he's wearing them there's no fade, so the band
    // isn't touched. Timed to headphones.webm (10s: in by 3.5s, off from 8s).
    mask-image: linear-gradient(to bottom, transparent, #000 var(--trick-fade));
    animation: little-guy-trick-fade 10.04s linear forwards;
    pointer-events: none;
  }

  @property --trick-fade {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }

  @keyframes little-guy-trick-fade {
    0%,
    33% {
      --trick-fade: 20%;
    }

    36%,
    78% {
      --trick-fade: 0%;
    }

    82%,
    100% {
      --trick-fade: 20%;
    }
  }

  // As tall as all the rows; shifted up to show the current one.
  .little-guy__video {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% * var(--rows));
    max-width: none;
    object-fit: fill;
    transform: translateY(calc(-100% * var(--row) / var(--rows)));
  }
</style>

<script setup lang="ts">
  import { motion, useMotionValue, useSpring } from 'motion-v'
  import { LITTLE_GUY } from '~/data/littleGuy'

  type Mood = (typeof LITTLE_GUY.rows)[number]

  const props = withDefaults(
    defineProps<{
      // Width in rem.
      size?: number
      mood?: Mood
      label?: string
      // Which video to use; "auto" picks by size.
      files?: 'auto' | 'small' | 'full'
      // A one-off clip to play in place of his loop, once (public/little-guy/
      // <trick>.webm and .mp4). Emits "trick-done" when it's over.
      trick?: 'headphones' | null
    }>(),
    {
      size: 24,
      mood: 'idle',
      label: 'A small, fluffy white creature',
      files: 'auto',
      trick: null,
    },
  )

  const root = useTemplateRef<HTMLElement>('root')
  const turn = useTemplateRef<HTMLElement>('turn')
  const video = useTemplateRef<HTMLVideoElement>('video')
  const reduceMotion = ref(false)
  const playing = ref(false)
  const stillFrame = useTemplateRef<HTMLImageElement>('stillFrame')

  // "ready" once he can be seen as intended: the video is playing, or, when
  // it won't (reduced motion, or autoplay refused, as in iOS Low Power
  // Mode), the still frame has loaded. Lets a parent hold off showing him.
  const emit = defineEmits<{ ready: []; 'trick-done': [] }>()

  // Not with reduced motion, or before his own video is chosen.
  const tricking = computed(
    () => !!props.trick && !!ext.value && !reduceMotion.value,
  )
  function endTrick() {
    emit('trick-done')
  }
  // Skipped altogether, it's still over.
  watch(
    () => props.trick,
    (trick) => {
      if (trick && reduceMotion.value) endTrick()
    },
  )
  let announced = false
  function announce() {
    if (announced) return
    announced = true
    emit('ready')
  }
  function onPlaying() {
    playing.value = true
    announce()
  }
  function settleOnStill() {
    const img = stillFrame.value
    if (!img || (img.complete && img.naturalWidth > 0)) announce()
    else img.addEventListener('load', announce, { once: true })
  }
  // Safari only plays transparent video as HEVC; everyone else gets VP9.
  const ext = ref<'mp4' | 'webm' | null>(null)
  // Avatar sizes get the small video: decoding the full one to draw 40px
  // would waste download and battery.
  const variant = computed(() => {
    if (props.files !== 'auto') return props.files === 'small' ? '-sm' : ''
    return props.size * 10 <= LITTLE_GUY.smallUpTo ? '-sm' : ''
  })

  // A new source stops playback; start it again.
  watch(variant, async () => {
    await nextTick()
    if (!reduceMotion.value) video.value?.play().catch(() => {})
  })
  const row = computed(() => Math.max(LITTLE_GUY.rows.indexOf(props.mood), 0))

  // The whole body turns toward the pointer (a small 3D turn plus a lean),
  // on springs. Kept small: he's a flat render.
  const TURN_Y = 7 // degrees left/right
  const TURN_X = 4 // degrees up/down
  const LEAN = 2.5 // degrees of roll toward the pointer
  const lookX = useMotionValue(0)
  const lookY = useMotionValue(0)
  const springX = useSpring(lookX, { stiffness: 90, damping: 16, mass: 0.8 })
  const springY = useSpring(lookY, { stiffness: 90, damping: 16, mass: 0.8 })
  function applyTurn() {
    const el = turn.value
    if (!el) return
    if (reduceMotion.value) {
      el.style.transform = ''
      return
    }
    const x = springX.get()
    const y = springY.get()
    el.style.transform = `perspective(1100px) rotateY(${x * TURN_Y}deg) rotateX(${-y * TURN_X}deg) rotate(${x * LEAN}deg)`
  }
  springX.on('change', applyTurn)
  springY.on('change', applyTurn)

  function onPointerMove(event: PointerEvent) {
    if (props.mood !== 'idle') return
    const el = root.value
    if (!el) return
    const box = el.getBoundingClientRect()
    const reach = box.width / 2
    lookX.set(
      Math.max(
        -1,
        Math.min(1, (event.clientX - (box.left + box.width / 2)) / reach),
      ),
    )
    lookY.set(
      Math.max(
        -1,
        Math.min(1, (event.clientY - (box.top + box.height / 2)) / reach),
      ),
    )
  }

  // Busy states face forward.
  watch(
    () => props.mood,
    (mood) => {
      if (mood !== 'idle') {
        lookX.set(0)
        lookY.set(0)
      }
    },
  )

  // A click adds a squash-and-stretch hop on top of whatever state is showing.
  const hopping = ref(false)
  const hopKeyframes = {
    scaleY: [1, 0.86, 1.1, 0.96, 1],
    scaleX: [1, 1.1, 0.94, 1.03, 1],
    y: [0, 6, -38, 0, 0],
    transition: { duration: 0.62, times: [0, 0.18, 0.5, 0.82, 1] },
  }
  const still = { scaleX: 1, scaleY: 1, y: 0 }
  const bodyAnimation = computed(() =>
    hopping.value && !reduceMotion.value ? hopKeyframes : still,
  )
  function hop() {
    if (reduceMotion.value || hopping.value) return
    hopping.value = true
    setTimeout(() => (hopping.value = false), 640)
  }

  defineExpose({ hop })

  onMounted(async () => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    if (reduceMotion.value) {
      settleOnStill()
      return
    }

    // WebKit plays the WebM but drops its alpha (a black box), so it gets
    // the HEVC one. That's Safari, and every browser on iPhone and iPad:
    // Chrome, Firefox and Edge there are WebKit too. (iPads say Macintosh,
    // but have touch.)
    const ua = navigator.userAgent
    const ios =
      /iP(hone|ad|od)/.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
    const safari = /^((?!chrome|chromium|android|edg).)*safari/i.test(ua)
    // The video waits for the page to finish loading, so its few hundred KB
    // don't compete with what the page needs to show. The still stands in
    // until then.
    await pageLoaded()
    if (unmounted) return
    ext.value = ios || safari ? 'mp4' : 'webm'
    await nextTick()
    video.value?.play().catch(() => {
      // Autoplay refused: the still frame stays.
      settleOnStill()
    })
  })

  let unmounted = false
  onBeforeUnmount(() => {
    unmounted = true
    window.removeEventListener('pointermove', onPointerMove)
  })

  function pageLoaded() {
    if (document.readyState === 'complete') return Promise.resolve()
    return new Promise<void>((resolve) =>
      window.addEventListener('load', () => resolve(), { once: true }),
    )
  }
</script>
