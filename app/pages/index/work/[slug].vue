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
  const title = computed(() => study.value?.title)
  // The post's own summary for search results and link previews: its Intro
  // in Craft, or its tooltip; without either, the site's (nuxt.config).
  const description = computed(
    () => study.value?.intro ?? study.value?.tooltip?.text,
  )
  // Its cover as the preview image (see craft-images' OG), described by its
  // caption; without one, the site's Mallow card (nuxt.config).
  const image = computed(() => study.value?.hero?.og)
  const imageAlt = computed(
    () =>
      study.value?.hero?.caption?.replace(/<[^>]*>/g, '') ||
      study.value?.hero?.alt ||
      study.value?.title,
  )

  useHead({
    title,
    // The post as an article by Matt (utils/structuredData).
    script: computed(() =>
      study.value
        ? [jsonLd(postGraph(study.value, `${SITE_URL}/og.jpg`), 'ld-post')]
        : [],
    ),
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { property: 'og:title', content: title },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:title', content: title },
      ...(image.value
        ? [
            { property: 'og:image', content: image },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:image:alt', content: imageAlt },
            { name: 'twitter:image', content: image },
            { name: 'twitter:image:alt', content: imageAlt },
          ]
        : []),
      ...(description.value
        ? [
            { name: 'description', content: description },
            { property: 'og:description', content: description },
            { name: 'twitter:description', content: description },
          ]
        : []),
    ],
  })
</script>
