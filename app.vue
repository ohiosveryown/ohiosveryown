<template>
  <CmdMenu />
  <Navigation />
  <NuxtPage />
</template>

<script setup lang="ts">
  useSeoMeta({
    description:
      "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga.",

    // open graph
    ogType: "website",
    ogSiteName: "ohiosveryown",
    ogTitle: "ohiosveryown",
    ogDescription:
      "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga.",
    ogUrl: "https://ohiosveryown.com",
    ogImage:
      "https://ik.imagekit.io/ohiosveryown/ovo--3.7/readme__sm.webp?updatedAt=1718396522129",

    // twitter
    twitterCard: "summary_large_image",
    twitterTitle: "ohiosveryown",
    twitterUrl: "https://ohiosveryown.com",
    twitterDescription:
      "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga.",
    twitterImage:
      "https://ik.imagekit.io/ohiosveryown/ovo--3.7/readme__sm.webp?updatedAt=1718396522129",
  })
</script>
