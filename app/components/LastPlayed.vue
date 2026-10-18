<template>
  <DeskItem
    v-if="track"
    class="last-played"
    :delay="0.6"
  >
    <a
      class="last-played__link has-tooltip"
      v-bind="
        track.url ? { href: track.url, target: '_blank', rel: 'noopener' } : {}
      "
      :data-tooltip="tooltipText"
      :data-tooltip-image="tooltipImage"
      :aria-label="`${tooltipText}: ${track.title} by ${track.artist}`"
    >
      <span class="last-played__art">
        <img
          v-if="track.cover"
          class="last-played__cover"
          :src="track.cover"
          alt=""
        />
      </span>
      <span class="last-played__meta">
        <span class="last-played__file blush">{{ fileName }}</span>
      </span>
    </a>
  </DeskItem>
</template>

<style scoped lang="scss">
  .last-played {
    position: absolute;
    top: 24%;
    left: 50%;
    margin-left: -3.9rem;
    width: 22rem;
    max-width: calc(50% + 3.9rem - 2.4rem);

    @include breakpoint(md) {
      top: 29.33%;
      left: calc(50% + 4.5rem);
      margin-left: 0;
      max-width: calc(50% - 4.5rem - 3.2rem);
    }
  }

  .last-played__link {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    color: #fff;
    text-decoration: none;
  }

  .last-played__link[href] {
    cursor: var(--cursor);
  }

  .last-played__art {
    display: block;
    flex-shrink: 0;
    position: relative;
    width: 7.8rem;
    height: 5.6rem;
    border: 3px solid #fff;
    border-radius: 2px;
    background: #d2f976;
    box-shadow: 0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.19);
    overflow: hidden;
  }

  .last-played__cover {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 7.2rem;
    height: 7.2rem;
    max-width: none;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }

  .last-played__meta {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    min-width: 0;
    padding-top: 0.6rem;
  }

  .last-played__file {
    display: block;
    margin: -0.8rem 0;
    padding: 0.8rem 0;
    text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
    font-size: 1.3rem;
    font-weight: 550;
    letter-spacing: 0.07em;
    line-height: 1.11;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-variation-settings:
      'wdth' 94,
      'HGHT' 100;
    overflow: hidden;
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
