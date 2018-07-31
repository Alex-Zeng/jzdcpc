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
import {getUserFromReqCookie, getTokenFromReqCookie, getLogoutFromReqCookie} from '../helper/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' && !process.server
// todo: 删除test
const store = () =>
  new Vuex.Store({
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        const user = getUserFromReqCookie(req)
        const token = getTokenFromReqCookie(req)
        const logout = Boolean(getLogoutFromReqCookie(req))
        console.log(logout, logout === false)
        if (user && logout === false) {
          commit('SETUSER', JSON.parse(decodeURIComponent(user)))
          console.log(user)
        }
        if (token && logout === false) {
          commit('SETTOKEN', token)
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
