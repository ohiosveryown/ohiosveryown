<template>
  <!-- The panel itself lives in pages/index.vue; this route only names it. -->
  <span hidden />
</template>

<script setup lang="ts">
  definePageMeta({ scrollToTop: false })

  const route = useRoute()
  const { data: caseStudies } = await useCaseStudies()

  const study = computed(() =>
    caseStudies.value.find((item) => item.slug === route.params.slug),
  )

  if (!study.value) {
    throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
  }

  const url = computed(() => `https://ohiosveryown.co/work/${study.value?.slug}`)

  useHead({
    title: computed(() => study.value?.title),
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { property: 'og:title', content: computed(() => study.value?.title) },
      { property: 'og:url', content: url },
    ],
  })
</script>
