import apiTest from '../../api/apiTest'

const state = {
  favoriteList: {}
}

const getters = {
  favoriteList: (state, getters, rootState) => {
    return state.favoriteList
  }
}

const actions = {
  getFavoriteList ({ commit }, fileds) {
    apiTest.getFavoriteList(data => {
      commit('updateList', data)
    }, fileds)
  }
}

const mutations = {
  updateList (state, data) {
    state.favoriteList = data
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
