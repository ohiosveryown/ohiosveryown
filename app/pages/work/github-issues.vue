<template>
  <article class="work-github-issues">
    <header>
      <h1>{{ meta.title }}</h1>
      <p class="description">{{ meta.description }}</p>
      <ul class="tags">
        <li
          v-for="tag in meta.tags"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
    </header>
  </article>
</template>

<style scoped lang="scss">
  .work-github-issues {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .description {
    color: #7b7b7b;
    max-width: 60rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tags li {
    padding: 0.4rem 1rem;
    border-radius: 100px;
    background: #f2f2f2;
    font-size: 1.2rem;
    font-weight: 500;
  }
</style>

<script setup lang="ts">
  definePageMeta({
    title: 'GitHub Issues',
    description:
      'Tracking work with GitHub. Nested tasks, rolled-up progress, and cross-repo planning.',
    tags: ['Human Interface Design', 'Product Strategy'],
    cover:
      'https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/folder--issues@3x.webp',
    coverColor: 'transparent',
    video:
      'https://res.cloudinary.com/dskbwusdb/video/upload/v1779311020/github-copilot-agent-mode_saecbe.mp4#t=0.1',
    folder:
      'https://ik.imagekit.io/ohiosveryown/ovo--3.7/index/folder--notch@3x.webp',
  })

  const { meta } = useRoute()
</script>
