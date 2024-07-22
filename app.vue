<template>
  <CmdMenu />
  <Navigation />
  <NuxtPage />
</template>

<script setup lang="ts">
  useHead({
    meta: [
      {
        name: "description",
        content:
          "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga.",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ohiosveryown" },
      { property: "og:title", content: "ohiosveryown" },
      {
        property: "og:description",
        content:
          "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga.",
      },
      { property: "og:url", content: "https://ohiosveryown.com" },
      {
        property: "og:image",
        content:
          "https://ik.imagekit.io/ohiosveryown/ovo--3.7/readme__sm.webp?updatedAt=1718396522129",
      },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ohiosveryown" },
      { name: "twitter:url", content: "https://ohiosveryown.com" },
      {
        name: "twitter:description",
        content:
          "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga.",
      },
      {
        name: "twitter:image",
        content:
          "https://ik.imagekit.io/ohiosveryown/ovo--3.7/readme__sm.webp?updatedAt=1718396522129",
      },
      // Robots
      { name: "robots", content: "index,follow" },
    ],
    link: [{ rel: "canonical", href: "https://ohiosveryown.com" }],
  })
</script>
