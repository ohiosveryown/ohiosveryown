
export default {
  mode: 'spa',
  // headers
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: false,
  // global styles
  css: [
    '~/style/reset.scss',
    '~/style/type.scss',
    '~/style/util.scss',
  ],
  plugins: [],
  devModules: [],
  modules: [
    '@nuxtjs/pwa',
  ],
  build: {
    extend (config, ctx) {
    }
  }
}
