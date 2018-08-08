import Vue from 'vue'
import Vuex from 'vuex'
import cert from './modules/cert'
import auth from './modules/auth'
import orders from './modules/orders'
import favorite from './modules/favorite'
import message from './modules/message'
import notice from './modules/notice'
// import createLogger from '../helper/logger'
import category from './modules/category'
import {getUserFromReqCookie, getTokenFromReqCookie} from '../helper/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' && !process.server
// todo: 删除test
const store = () =>
  new Vuex.Store({
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        const user = getUserFromReqCookie(req)
        const token = getTokenFromReqCookie(req)
        if (user) {
          commit('SETUSER', JSON.parse(decodeURIComponent(user)))
        } else {
          commit('SETUSER', {})
        }
        if (token) {
          commit('SETTOKEN', token)
        } else {
          commit('SETTOKEN', '')
        }
      }
    },
    modules: {
      cert,
      auth,
      orders,
      favorite,
      message,
      notice,
      category
    },
    strict: debug
    // plugins: debug ? [createLogger()] : []
  })

export default store
