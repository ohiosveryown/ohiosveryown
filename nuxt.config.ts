// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, viewport-fit=cover',
        },
      ],
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
