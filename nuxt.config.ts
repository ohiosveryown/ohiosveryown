// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
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
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@cmykw_" },
        { name: "twitter:title", content: "ohiosveryown" },
        { name: "twitter:description", content: "ohiosveryown is the web presence and portfolio of work for Matthew Pence – a designer living in Atlanta, Ga" },
        { name: "twitter:image", content: "https://res.cloudinary.com/dn1q8h2ga/image/upload/v1722309441/ovo-3.7/readme__sm_xqkrgi.webp" }
      ],
        script: [
        {
          defer: true,
          'data-domain': "ohiosveryown.co",
          src: "https://plausible.io/js/script.js"
        }
      ]
    },
    pageTransition: { name: 'blur', mode: 'out-in' }
  },

  // global styles
  css: ["~/assets/style/reset.scss", "~/assets/style/type.scss", "~/assets/style/util.scss"],

  // content
  content: {
    documentDriven: true,
    markdown: {
      anchorLinks: false,
    },
  },
})
