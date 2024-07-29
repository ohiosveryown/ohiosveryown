// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
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
