<template>
  <DeskFile
    v-if="track"
    class="last-played"
    :name="fileName"
    :image="track.cover"
    :href="track.url"
    :tooltip="tooltipText"
    :tooltip-image="tooltipImage"
    :label="`${tooltipText}: ${track.title} by ${track.artist}`"
    :delay="0.6"
    :sort="{
      name: fileName,
      date: track.playedAt ? Date.parse(track.playedAt) : Date.now(),
    }"
    :ask="{
      label: fileName,
      image: track.cover,
      kind: 'track',
      name: track.title,
      // An easter egg: he puts on headphones.
      trick: 'headphones',
      prompt: `Matt's been listening to “${track.title}” by ${track.artist}. What do you make of it?`,
    }"
  />
</template>

<style scoped lang="scss">
  // Small screens: last in the page's list, after the posts (see
  // .home__desk).
  .last-played {
    order: 999;
    width: calc(50% - 0.8rem);

    @include breakpoint(md) {
      position: absolute;
      top: 29.33%;
      left: calc(50% + 4.5rem);
      width: 22rem;
      max-width: calc(50% - 4.5rem - 3.2rem);
    }
  }
</style>

<script setup lang="ts">
  import type { LastPlayed } from '~~/server/api/last-played.get'

  const { data } = useFetch<LastPlayed | null>('/api/last-played', {
    server: false,
  })

  const tooltipImage =
    'https://res.cloudinary.com/dn1q8h2ga/image/upload/v1783431537/ovo-3.7/misc/tqfS3mgQU28ko_xxafcw.webp'

  const track = computed(() => data.value ?? null)

  const fileName = computed(() => {
    const slug = (track.value?.title ?? '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s*[([].*?[)\]]\s*/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    return `${slug || 'untitled'}.mp3`
  })

  const tooltipText = computed(() =>
    track.value?.source === 'now-playing' ? 'Now playing' : 'Last played',
  )
</script>
