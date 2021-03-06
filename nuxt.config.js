/**
 * 本文件为nuxt.js的配置文件，可覆盖webpack配置
 */
module.exports = {
  /*
  ** 配置鉴权中间件
  */
  router: {
    middleware: 'checkAuth'
    // mode: 'hash'
  },
  // dev配置
  dev: (process.env.NODE_ENV !== 'production'),
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
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { hid: 'description', name: 'description', content: '集众电采-打造家电产业链整合服务平台' }
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
      // target: 'http://192.168.3.135:80/api',
      // target: 'http://jwapi-uat.jizhongdiancai.com/api',
      target: 'http://scm.jizhongdiancai.com/api',
      pathRewrite: { '^/papi': '' }
    }
  }
}
