// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image"],

  // global styles
  css: ["~/assets/style/reset.scss", "~/assets/style/type.scss"],

  //imagekit
  image: {
    imagekit: {
      baseURL: "https://ik.imagekit.io/ohiosveryown/",
    },
  },
})
