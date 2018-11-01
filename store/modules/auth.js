import apiAuth from '../../api/apiAuth'
import Cookie from 'js-cookie'

const state = {
  user: {},
  token: Cookie.get('_token') || null,
  role: Cookie.get('_role') || null,
  groupId: 4
}

const getters = {
  loggedUser: (state) => {
    return state.user
  },
  loggedToken: (state) => {
    return state.token
  },
  loggedRole: (state) => {
    return state.role
  },
  groupId: (state) => {
    return state.groupId
  }
}

const actions = {
  logout ({ commit }) {
    // apiAuth.logout()
    commit('SETTOKEN', null)
    commit('SETUSER', null)
    commit('SETROLE', null)
    Cookie.set('_token', '')
    Cookie.set('_user', '')
    Cookie.set('_role', '')
  },
  doLoginIndex ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.loginIndex(data => {
      successCb('登录成功')
      const {token} = data
      Cookie.set('_token', token, {expires: 30})
      Cookie.set('_user', JSON.stringify(data), {expires: 30})
      commit('SETTOKEN', token)
      commit('SETUSER', data)
    }, errorCb, fileds)
  },
  getRole ({commit}) {
    apiAuth.getRole(data => {
      let role = data.roleId
      Cookie.set('_role', role, {expires: 30})
      commit('SETROLE', role)
    })
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
      Cookie.set('_token', token, {expires: 30})
      Cookie.set('_user', JSON.stringify(data), {expires: 30})
      commit('SETTOKEN', token)
      commit('SETUSER', data)
    }, errorCb, fileds)
  },
  doRegisterPhone ({ commit }, {successCb, errorCb, fileds}) {
    apiAuth.registerPhone(data => {
      successCb('登录成功')
      const {token} = data
      // 存入cookie与 stroe state
      Cookie.set('_token', token, {expires: 30})
      Cookie.set('_user', JSON.stringify(data), {expires: 30})
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
  },
  SETROLE (state, role) {
    state.role = role
  },
  SETGROUPID (state, groupId) {
    state.groupId = groupId
  },
  buyer (state) {
    state.groupId = 4
  },
  supplier (state) {
    state.groupId = 5
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
