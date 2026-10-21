// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Matthew Pence',
      titleTemplate: '%s · ohiosveryown',
      htmlAttrs: {
        lang: 'en',
      },
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { charset: "utf-8" },
        { name: 'theme-color', content: '#ffffff' },
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
      script: [
        {
          src: 'https://plausible.io/js/script.js',
          defer: true,
          'data-domain': 'ohiosveryown.co',
        },
      ],
    },
  },
  routeRules: {
    '/callback': { ssr: true },
    '/api/**': { cors: true },
  },
  // ISR on Vercel: served from the CDN like a static page, regenerated in the
  // background after `expiration` seconds, so Craft edits show up within a
  // minute without a deploy (or right away via the refresh link in Craft).
  // Production only: in dev, Nuxt's payload cache writes `/` as a file and
  // then can't create `/work/*` beneath it (ENOTDIR).
  // `allowQuery: []` ignores query strings, so `?anything` can't skip the
  // cache and hit Craft per request.
  $production: {
    routeRules: {
      '/': { isr: { expiration: 60, allowQuery: [] } },
      '/work/**': { isr: { expiration: 60, allowQuery: [] } },
      '/api/case-studies': { isr: { expiration: 60, allowQuery: [] } },
    },
  },
  // Lets /api/refresh regenerate ISR pages on demand (Vercel on-demand
  // revalidation via the `x-prerender-revalidate` header). Read at build.
  nitro: {
    vercel: {
      config: { bypassToken: process.env.NUXT_ISR_BYPASS_TOKEN },
    },
  },
  runtimeConfig: {
    spotifyClientId: '',
    spotifyClientSecret: '',
    spotifyRefreshToken: '',
    craftApiUrl: '',
    craftApiKey: '',
    craftCollectionId: '',
    r2AccountId: '',
    r2AccessKeyId: '',
    r2SecretAccessKey: '',
    r2Bucket: '',
    r2PublicUrl: '',
    isrBypassToken: '',
    refreshKey: '',
    // Mallow's chat (server/api/ask.post.ts). The key is read from
    // OPENAI_API_KEY too.
    openaiApiKey: '',
    openaiModel: 'gpt-6.1-sol',
    // Its lowest; a little thinking makes for a livelier reply. ('none'
    // works on models that allow it, like gpt-6-luna.)
    openaiReasoningEffort: 'low',
    // Shared with the counter Worker's ASK_LIMIT_SECRET.
    askLimitSecret: '',
    public: {
      // Open-counter Worker (worker/); the browser calls it directly.
      counterUrl: '',
      // Dev shares the real database, so it only reads counts unless this is
      // set (NUXT_PUBLIC_COUNTER_IN_DEV=true) for debugging.
      counterInDev: false,
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
