// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Matthew Pence',
      titleTemplate: '%s · ohiosveryown',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga." },
        { name: "author", content: "Matthew Pence" },
        { property: "og:title", content: "ohiosveryown" },
        { property: "og:description", content: "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga" },
        { property: "og:image", content: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722309441/ovo-3.7/readme__sm_xqkrgi.webp" },
        { property: "og:url", content: "https://ohiosveryown.co" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "ohiosveryown" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@cmykw_" },
        { name: "twitter:title", content: "ohiosveryown" },
        { name: "twitter:description", content: "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga" },
        { name: "twitter:image", content: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722309441/ovo-3.7/readme__sm_xqkrgi.webp" },
        { name: "twitter:creator", content: "@cmykw_" },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        { rel: "canonical", href: "https://ohiosveryown.co" },
      ],
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/work/**': { prerender: true },
    '/callback': { ssr: true },
    '/api/**': { cors: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/callback', '/api/**'],
    },
  },
  runtimeConfig: {
    spotifyClientId: '',
    spotifyClientSecret: '',
    spotifyRefreshToken: '',
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@webgpu/types'],
      },
    },
  },
  css: [
    '~/style/type.scss',
    '~/style/reset.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/style/grid.scss" as *;`,
        },
      },
    },
  },
})
