<template>
  <section class="link-columns">
    <ul
      v-for="column in columns"
      :key="column.title"
      class="link-column"
    >
      <li class="link-column__title thin">{{ column.title }}</li>

      <li
        v-for="item in column.items"
        :key="item.label"
        class="link-row"
      >
        <component
          :is="item.href ? 'a' : 'span'"
          class="link-row__link"
          :class="{ 'link-row__link--external': item.external }"
          v-bind="
            item.href
              ? { href: item.href, target: '_blank', rel: 'noopener' }
              : {}
          "
        >
          <span
            class="link-row__icon"
            :class="{ 'link-row__icon--rounded': item.icon.rounded }"
          >
            <img
              v-if="item.icon.src"
              :src="item.icon.src"
              alt=""
              class="link-row__img"
              :class="{ 'link-row__img--pad': item.icon.pad }"
              :style="
                item.icon.scale
                  ? { transform: `scale(${item.icon.scale})` }
                  : undefined
              "
            />
            <span
              v-else-if="item.icon.sprite"
              class="link-row__sprite"
              :class="`link-row__sprite--${item.icon.sprite}`"
            />
          </span>

          <span class="link-row__label">
            {{ item.label }}
            <span
              v-if="item.external"
              class="link-row__arrow"
              >↗</span
            >
          </span>
        </component>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
  .link-columns {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    margin-top: 2.4rem;
    width: 100%;
    max-width: 56.6rem;

    @include breakpoint(sm) {
      flex-direction: row;
      gap: 4.4rem;
    }
    @include breakpoint(md) {
      transform: translateX(0.6rem);
    }
  }

  .link-column {
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    gap: 1.2rem;
    min-width: 0;
  }

  .link-column__title {
    font-size: 1.5rem;
    letter-spacing: 0.025rem;
  }

  .link-row {
    display: flex;
  }

  .link-row__link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  a.link-row__link {
    cursor: var(--cursor);
  }

  .link-row__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
  }

  .link-row__icon--rounded {
    overflow: hidden;
    border-radius: 100px;
  }

  .link-row__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform-origin: center;
  }

  .link-row__icon--rounded .link-row__img {
    object-fit: cover;
  }

  .link-row__img--pad {
    width: 80%;
    height: 80%;
  }

  .link-row__sprite {
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('/icons/link-icons.webp');
    background-repeat: no-repeat;
    background-size: 600% 100%;
  }

  .link-row__sprite--github {
    background-position: 0% 50%;
  }

  .link-row__sprite--mailchimp {
    background-position: 20% 50%;
  }

  .link-row__sprite--elevenwarriors {
    background-position: 40% 50%;
  }

  .link-row__sprite--proportional {
    background-position: 60% 50%;
  }

  .link-row__sprite--notch {
    background-position: 80% 50%;
  }

  .link-row__sprite--supersymmetry {
    background-position: 100% 50%;
  }

  .link-row__label {
    color: #000;
    font-size: 1.7rem;
    font-family: var(--system-font);
    letter-spacing: -0.025rem;
    line-height: 1.1;
  }

  .link-row__arrow {
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.4rem;
  }

  a.link-row__link--external:hover .link-row__label {
    text-decoration: underline;
    text-decoration-thickness: 0.064rem;
    text-underline-offset: 0.4rem;
  }
</style>

<script setup lang="ts">
  type SpriteIcon = 'github' | 'mailchimp' | 'elevenwarriors' | 'proportional' | 'notch' | 'supersymmetry'

  type IconSpec = {
    src?: string
    sprite?: SpriteIcon
    // Clip the asset into a circle (logos that ship as a filled square/circle).
    rounded?: boolean
    // Inset the asset within its 2rem box (transparent marks that need padding).
    pad?: boolean
    // Zoom the asset within the box (logo art with excess padding in the file).
    scale?: number
  }

  type LinkItem = {
    label: string
    href?: string
    external?: boolean
    icon: IconSpec
  }

  type LinkColumn = {
    title: string
    items: readonly LinkItem[]
  }

  const columns: readonly LinkColumn[] = [
    {
      title: 'Erstwhile',
      items: [
        {
          label: 'Slack',
          href: 'https://slack.com/blog/news/today-daily-briefing',
          external: true,
          icon: { src: '/icons/slack.svg', pad: true },
        },
        {
          label: 'GitHub',
          href: 'https://github.com/features/copilot',
          external: true,
          icon: { sprite: 'github', rounded: true },
        },
        {
          label: 'Mailchimp',
          href: 'https://mailchimp.com',
          external: true,
          icon: { sprite: 'mailchimp', rounded: true },
        },
        {
          label: 'Eleven Warriors',
          href: 'https://www.elevenwarriors.com/data-viz/2016/09/74352/statagram-ohio-state-45-oklahoma-24',
          external: true,
          icon: { sprite: 'elevenwarriors', rounded: true },
        },
      ],
    },
    {
      title: 'Tools & Side Projects',
      items: [
        {
          label: 'proportional.design',
          href: 'https://proportional.design',
          external: true,
          icon: { sprite: 'proportional' },
        },
        {
          label: 'Bookmarks',
          icon: { src: '/icons/bookmarks.svg' },
        },
        {
          label: 'Notch',
          icon: { sprite: 'notch' },
        },
        {
          label: 'Supersymmetry',
          icon: { sprite: 'supersymmetry' },
        },
      ],
    },
  ]
</script>
