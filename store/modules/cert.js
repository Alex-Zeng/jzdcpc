import apiCert from '../../api/apiCert'

const state = {
  certification: {}
}

const getters = {
  certification: (state, getters, rootState) => {
    return state.certification
  }
}

const actions = {
  getCert ({ commit }, cb) {
    apiCert.getCertification(data => {
      commit('updateCert', data)
      cb(data)
    })
  },
  doCert ({commit, dispath}, {successCb, errorCb, fileds}) {
    apiCert.certification(fileds, (msg) => {
      commit('updateCert', msg)
      successCb(msg)
    }, (msg) => {
      errorCb(msg)
    })
  }
}

const mutations = {
  updateCert (state, data) {
    state.certification = data
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
