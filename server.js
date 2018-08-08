const { Nuxt, Builder } = require('nuxt')
const app = require('express')()

// 加载nuxt配置
let config = require('./nuxt.config')
/*
** server配置
*/
let serverConfig = {
  // axios与代理
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/papi': {
      target: 'http://192.168.3.135/api',
      pathRewrite: { '^/papi': '' }
    }
  }
}
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({...config, ...serverConfig})
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3333)