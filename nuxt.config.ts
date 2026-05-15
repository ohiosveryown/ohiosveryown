// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  experimental: {
    // Workaround for https://github.com/nuxt/nuxt/issues/34957
    // Remove once a Nuxt release ships the fix from PR #34959.
    viteEnvironmentApi: true,
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
