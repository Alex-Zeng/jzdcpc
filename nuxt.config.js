/**
 * 本文件为nuxt.js的配置文件，可覆盖webpack配置
 */

module.exports = {
  mode: 'spa',
  /*
  ** 配置鉴权中间件
  */
  router: {
    middleware: 'checkAuth'
  },

  /*
  ** 全局 CSS
  */

  css: [
    '~/assets/stylus/main.styl'
  ],

  /*
  ** 增加element-ui，详见plugins/element-ui.js
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: '集众电采',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'jzdc web project that base on Nuxt.js Framework' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /**
     * babel：element-ui配置
     */
    babel: {
      plugins: [['component', [
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        },
        'transform-async-to-generator',
        'transform-runtime'
      ]]],
      comments: false
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** 配置axios
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/papi': {
      target: 'http://192.168.3.135:80/?s=api',
      // target: 'http://dev.jizhongdiancai.com/api',
      pathRewrite: { '^/papi': '' }
    }
  }
}
