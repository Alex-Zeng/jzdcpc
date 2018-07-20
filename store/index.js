import Vue from 'vue'
import Vuex from 'vuex'
import cert from './modules/cert'
import auth from './modules/auth'
import orders from './modules/orders'
import favorite from './modules/favorite'
import message from './modules/message'
import createLogger from '../helper/logger'
import category from './modules/category'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' && !process.server
// todo: 删除test
const store = () =>
  new Vuex.Store({
    modules: {
      cert,
      auth,
      orders,
      favorite,
      message,
      category
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })

export default store
