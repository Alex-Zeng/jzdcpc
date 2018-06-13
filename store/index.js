import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import auth from './modules/auth'
import createLogger from '../helper/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
// todo: 删除test
const store = () =>
  new Vuex.Store({
    modules: {
      test,
      auth
    },
    // actions: {
    //   nuxtServerInit ({ commit }, { req }) {
    //     console.log(req)
    //     if (req.session.user) {
    //       commit('SETTOKEN', req.session.user)
    //     }
    //   }
    // },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })

export default store
