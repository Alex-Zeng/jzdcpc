import apiAuth from '../../api/apiAuth'
import Cookie from 'js-cookie'

const state = {
  user: null,
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
  doLoginIndex ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.loginIndex(data => {
      successCb('登录成功')
      const {token} = data
      // 存入cookie与 stroe state
      Cookie.set('_token', token)
      commit('SETTOKEN', token)
    }, errorCb, fileds)
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
