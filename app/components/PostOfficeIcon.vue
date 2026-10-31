<template>
  <DeskFile
    class="post-office-icon"
    name="greetings.app"
    tooltip="Leave a postmark"
    label="Greetings: leave a postmark"
    bare
    :expanded="open"
    :count="sheet?.total ?? null"
    :count-tooltip="stampedSays"
    :delay="0.65"
    :sort="{ name: 'greetings.app' }"
    :ask="{
      label: 'greetings.app',
      kind: 'app',
      name: 'greetings.app',
      prompt: 'What is greetings.app, and how do I leave a postmark?',
    }"
    @open="toggle"
  >
    <!-- A stamp, perforated, with a few postmarks across it (Figma
         2429:6294). -->
    <template #art>
      <svg
        class="post-office-icon__edge"
        viewBox="0 0 78 56"
        aria-hidden="true"
      >
        <path :d="PERFORATED" />
      </svg>
      <span class="post-office-icon__paper">
        <span
          v-for="mark in MARKS"
          :key="mark.type"
          class="post-office-icon__mark"
          :style="mark.style"
        >
          <PostmarkArt
            :type="mark.type"
            :ink="mark.ink"
            :mark="{ ...SAMPLE, seed: mark.seed }"
            :serial="1"
          />
        </span>
      </span>
    </template>

    <!-- A stamp (Figma 2437:7492), for postmarks left. -->
    <template #count-icon>
      <svg
        class="post-office-icon__count-icon"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M10 9.98a.33.33 0 0 1-.33.33H2.33a.33.33 0 0 1 0-.67h7.34c.18 0 .33.15.33.34ZM9.33 5.98H6.98l.66-3.05a1.33 1.33 0 0 0-1.3-1.62h-.67a1.33 1.33 0 0 0-1.3 1.62l.65 3.05H2.67a.67.67 0 0 0-.67.67v1.66c0 .37.3.67.67.67h6.66c.37 0 .67-.3.67-.67V6.65a.67.67 0 0 0-.67-.67Z"
        />
      </svg>
    </template>
  </DeskFile>
</template>

<style scoped lang="scss">
  // Small screens: after the posts and the song, in the page's list.
  .post-office-icon {
    order: 1000;
    width: calc(50% - 0.8rem);

    // In the gap left of the song, above Blush.
    @include breakpoint(md) {
      position: absolute;
      top: 23%;
      left: calc(50% - 25rem);
      width: 22rem;
    }
  }

  .post-office-icon__edge {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    fill: #fff;
    filter: drop-shadow(0 0.2rem 0.4rem rgba(0, 0, 0, 0.22));
  }

  .post-office-icon__paper {
    display: block;
    position: absolute;
    top: 0.641rem;
    left: 0.617rem;
    width: 6.565rem;
    height: 4.319rem;
    background: #f3efe6;
    overflow: hidden;
  }

  // In the count's pill, where the opens arrow would be.
  .post-office-icon__count-icon {
    display: block;
    flex-shrink: 0;
    margin: -0.1rem 0 0;
    opacity: 0.8;
  }

  .post-office-icon__mark {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0;
  }
</style>

<script setup lang="ts">
  import type { PostmarkType } from '~/data/postmarks'

  // How many postmarks there are, in the pill like a post's opens. The
  // sheet loads once the page has, so it's ready when the window opens.
  const { open, origin, sheet, load } = usePostOffice()

  // The window grows out of this icon's art, and shrinks back into it.
  function toggle(from: HTMLElement | null) {
    origin.value = from
    open.value = !open.value
  }
  onMounted(() => {
    if (document.readyState === 'complete') load()
    else window.addEventListener('load', () => load(), { once: true })
  })
  const stampedSays = computed(() => {
    const total = sheet.value?.total ?? 0
    if (total === 0) return 'No postmarks yet'
    if (total === 1) return 'One postmark so far'
    return `${total.toLocaleString()} postmarks so far`
  })

  const PERFORATED =
    'M73.65 56H78v-2.83c-1.58 0-2.86-1.17-2.86-2.61s1.28-2.61 2.86-2.61v-2.32c-1.58 0-2.86-1.16-2.86-2.6s1.28-2.61 2.86-2.61v-2.32c-1.58 0-2.86-1.17-2.86-2.61s1.28-2.61 2.86-2.61v-2.32c-1.58 0-2.86-1.16-2.86-2.6s1.28-2.62 2.86-2.62v-2.31c-1.58 0-2.86-1.17-2.86-2.61s1.28-2.61 2.86-2.61V15.5c-1.58 0-2.86-1.17-2.86-2.61s1.28-2.61 2.86-2.61V7.97c-1.58 0-2.86-1.17-2.86-2.6S76.42 2.79 78 2.79V0h-4.35c0 1.44-1.28 2.61-2.86 2.61S67.94 1.44 67.94 0h-2.23c0 1.44-1.28 2.61-2.86 2.61S60 1.44 60 0h-2.22c0 1.44-1.28 2.61-2.86 2.61S52.06 1.44 52.06 0h-2.22c0 1.44-1.28 2.61-2.86 2.61S44.12 1.44 44.12 0H41.9c0 1.44-1.28 2.61-2.87 2.61S36.16 1.44 36.16 0h-2.22c0 1.44-1.28 2.61-2.87 2.61S28.21 1.44 28.21 0h-2.22c0 1.44-1.28 2.61-2.87 2.61S20.26 1.44 20.26 0h-2.23c0 1.44-1.28 2.61-2.86 2.61S12.3 1.44 12.3 0h-2.22c0 1.44-1.28 2.61-2.87 2.61S4.35 1.44 4.35 0H0v2.79c1.58 0 2.87 1.17 2.87 2.61S1.59 8 0 8v2.32c1.58 0 2.87 1.17 2.87 2.61S1.59 15.54 0 15.54v2.31c1.58 0 2.87 1.17 2.87 2.61S1.59 23.07 0 23.07v2.32c1.58 0 2.87 1.16 2.87 2.61S1.59 30.6 0 30.6v2.32c1.58 0 2.87 1.17 2.87 2.61S1.59 38.14 0 38.14v2.31c1.58 0 2.87 1.17 2.87 2.61S1.59 45.67 0 45.67v2.32c1.58 0 2.87 1.17 2.87 2.61S1.59 53.21 0 53.21V56h4.35c0-1.44 1.28-2.61 2.87-2.61S10.08 54.56 10.08 56h2.22c0-1.44 1.28-2.61 2.87-2.61S18.04 54.56 18.04 56h2.22c0-1.44 1.28-2.61 2.86-2.61S25.99 54.56 25.99 56h2.22c0-1.44 1.28-2.61 2.87-2.61S33.94 54.56 33.94 56h2.22c0-1.44 1.28-2.61 2.87-2.61S41.9 54.56 41.9 56h2.22c0-1.44 1.28-2.61 2.87-2.61s2.86 1.17 2.86 2.61h2.22c0-1.44 1.28-2.61 2.86-2.61s2.86 1.17 2.86 2.61H60c0-1.44 1.28-2.61 2.86-2.61s2.86 1.17 2.86 2.61h2.22c0-1.44 1.28-2.61 2.86-2.61S73.65 54.56 73.65 56z'

  // A sample stamp: the date Greetings opened, from Atlanta.
  const SAMPLE = {
    at: Date.UTC(2026, 9, 29, 12),
    city: 'Atlanta',
    region: 'GA',
    country: 'US',
  }

  // Where each sits on the paper: its art's transform in Figma (2440:10055,
  // px from the paper's top-left), then scaled from the art's own size.
  // The line cancel's box starts above and left of its art (see
  // POSTMARKS), hence its nudge back.
  const MARKS: {
    type: PostmarkType
    seed: number
    ink?: string
    style: Record<string, string>
  }[] = [
    {
      type: 'triangle',
      seed: 7,
      style: {
        transform:
          'matrix(0.9962, -0.0876, 0.0876, 0.9962, 27.3438, 13.8789) scale(0.5724)',
      },
    },
    {
      type: 'hello',
      seed: 3,
      style: {
        transform:
          'matrix(0.9948, -0.1019, 0.1019, 0.9948, -0.5488, 6.2578) scale(0.6183)',
      },
    },
    {
      type: 'stars',
      seed: 11,
      ink: '#2f5d46',
      style: {
        transform:
          'matrix(0.9782, 0.2075, -0.2075, 0.9782, 8.4238, 18.0703) scale(0.6778)',
      },
    },
    {
      type: 'cancel',
      seed: 5,
      style: {
        transform:
          'matrix(0.9865, 0.1637, -0.1637, 0.9865, 16.0332, 1.1719) scale(0.7456) translate(-4.6px, -4.6px)',
      },
    },
  ]
</script>
