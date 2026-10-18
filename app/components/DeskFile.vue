<template>
  <DeskItem :delay="delay">
    <component
      :is="href ? 'a' : 'button'"
      class="desk-file"
      :class="{ 'has-tooltip': tooltip }"
      v-bind="
        href
          ? { href, target: '_blank', rel: 'noopener' }
          : {
              type: 'button',
              'aria-haspopup': 'dialog',
              'aria-expanded': expanded,
            }
      "
      :data-tooltip="tooltip"
      :data-tooltip-image="tooltipImage"
      :aria-label="label"
      @mousedown="onMouseDown"
      @click="onClick"
    >
      <span
        ref="art"
        class="desk-file__art"
      >
        <img
          v-if="image"
          class="desk-file__image"
          :src="image"
          alt=""
        />
      </span>
      <span class="desk-file__meta">
        <span class="desk-file__name blush">{{ name }}</span>
      </span>
    </component>
  </DeskItem>
</template>

<style scoped lang="scss">
  .desk-file {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    color: #fff;
    text-decoration: none;
  }

  button.desk-file {
    font: inherit;
    text-align: left;
  }

  .desk-file[href],
  button.desk-file {
    cursor: var(--cursor);
  }

  .desk-file__art {
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

  .desk-file__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: cover;
  }

  .desk-file__meta {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    min-width: 0;
    padding-top: 0.6rem;
  }

  .desk-file__name {
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
  const props = withDefaults(
    defineProps<{
      name: string
      image?: string | null
      href?: string | null
      tooltip?: string
      tooltipImage?: string
      label?: string
      expanded?: boolean
      delay?: number
    }>(),
    {
      image: null,
      href: null,
      tooltip: undefined,
      tooltipImage: undefined,
      label: undefined,
      expanded: false,
      delay: 0,
    },
  )

  const emit = defineEmits<{ open: [origin: HTMLElement | null] }>()

  const art = useTemplateRef<HTMLElement>('art')

  // A mousedown moves focus (Safari drops it to <body>), which would steal it
  // back from the dialog we open, especially on double-click.
  function onMouseDown(event: MouseEvent) {
    if (!props.href) event.preventDefault()
  }

  function onClick(event: MouseEvent) {
    if (props.href || event.detail > 1) return
    emit('open', art.value)
  }
</script>
