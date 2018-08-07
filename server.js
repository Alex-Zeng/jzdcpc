const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let config = require('./nuxt.config')
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt(config)
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3333)