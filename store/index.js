import Vue from 'vue'
import Vuex from 'vuex'
// import test from './modules/test'
import auth from './modules/auth'
import orders from './modules/orders'
import favorite from './modules/favorite'
import createLogger from '../helper/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' && !process.server
// todo: 删除test
const store = () =>
  new Vuex.Store({
    modules: {
      // test,
      auth,
      orders,
      favorite
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })

export default store
