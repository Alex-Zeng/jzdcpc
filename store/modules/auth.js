import apiAuth from '../../api/apiAuth'
import Cookie from 'js-cookie'
import {getUserFromReqCookie} from '../../helper/auth'

const state = {
  user: {},
  token: Cookie.get('_token') || null
}

const getters = {
  loggedUser: (state) => {
    return state.user
  },
  loggedToken: (state) => {
    return state.token
  }
}

const actions = {
  nuxtServerInit ({ commit }, { req }) {
    const user = getUserFromReqCookie(req)
    if (user != null) {
      commit('SETUSER', JSON.parse(decodeURIComponent(user)))
    }
  },
  logout ({ commit }) {
    commit('SETTOKEN', null)
    commit('SETUSER', {})
    Cookie.remove('_token')
    Cookie.remove('_user')
  },
  doLoginIndex ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.loginIndex(data => {
      successCb('登录成功')
      const {token} = data
      Cookie.set('_token', token)
      Cookie.set('_user', JSON.stringify(data))
      commit('SETTOKEN', token)
      commit('SETUSER', data)
    }, errorCb, fileds)
  },
  doLoginPhone ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.loginPhone(({data, status}) => {
      if (status === -3) {
        successCb('用户首次登录，请设置用户名', status)
        return
      } else {
        successCb('登录成功', status)
      }
      const {token} = data
      Cookie.set('_token', token)
      Cookie.set('_user', JSON.stringify(data))
      commit('SETTOKEN', token)
      commit('SETUSER', data)
    }, errorCb, fileds)
  },
  doRegisterPhone ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.registerPhone(data => {
      successCb('登录成功')
      const {token} = data
      // 存入cookie与 stroe state
      Cookie.set('_token', token)
      Cookie.set('_user', JSON.stringify(data))
      commit('SETTOKEN', token)
      commit('SETUSER', data)
    }, errorCb, fileds)
  },
  doRegisterSendCode ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.registerSendCode(
      data => {
        successCb('发送验证码成功')
      }, errorCb, fileds
    )
  },
  doLoginSendCode ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.loginSendCode(
      data => {
        successCb('发送验证码成功')
      }, errorCb, fileds
    )
  },
  doRegisterValidCode ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.validRegisterCode(
      data => {
        successCb('验证成功')
      }, errorCb, fileds
    )
  }
}

const mutations = {
  SETUSER (state, user) {
    state.user = user
  },
  SETTOKEN (state, token) {
    state.token = token
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
