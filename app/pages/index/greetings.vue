<template>
  <!-- The window itself lives in pages/index.vue (PostOffice); this route
       only names it, so /greetings opens it. -->
  <span hidden />
</template>

<script setup lang="ts">
  definePageMeta({ scrollToTop: false })

  const url = `${SITE_URL}/greetings`
  const title = 'greetings.app'
  const description =
    'Leave a postmark from wherever you are, on a sheet everyone stamps.'

  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  })
</script>
