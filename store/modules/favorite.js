import apiFavorite from '../../api/apiFavorite'

const state = {
  favoriteList: [],
  favoriteType: [],
  favoriteTotal: 0
}

const getters = {
  favoriteType: (state, getters, rootState) => {
    return state.favoriteType
  },
  favoriteList: (state, getters, rootState) => {
    return state.favoriteList
  },
  favoriteTotal: (state, getters, rootState) => {
    return state.favoriteTotal
  }
}

const actions = {
  getFavoriteList ({ commit }, {fileds, cb}) {
    apiFavorite.favoriteList(data => {
      const {list, total, typeList} = data
      commit('updateFavoriteList', list)
      commit('updateFavoriteTotal', total)
      commit('updateTypeList', typeList)
      cb()
    }, fileds)
  },
  // getFavoriteType ({ commit }) {
  //   apiFavorite.favoriteType(data => {
  //     const {list} = data
  //     commit('updateTypeList', list)
  //   })
  // },
  deleteFavorite ({ commit, getters }, {fileds, successCb, errorCb}) {
    apiFavorite.favoriteDelete((data, msg) => {
      successCb(msg)
      commit('updateFavoriteTotal', getters.favoriteTotal - 1)
    }, fileds, errorCb)
  },
  addFavorite ({ commit, getters }, {fileds, scb, ecb}) {
    apiFavorite.favoriteAdd((data, msg) => {
      scb(msg)
      commit('updateFavoriteTotal', getters.favoriteTotal + 1)
    }, fileds, ecb)
  },
  getFavoriteNumber ({ commit }) {
    apiFavorite.favoriteNumber((number) => {
      commit('updateFavoriteTotal', number)
    })
  }
}

const mutations = {
  updateTypeList (state, data) {
    state.favoriteType = data
  },
  updateFavoriteList (state, data) {
    state.favoriteList = data
  },
  updateFavoriteTotal (state, total) {
    state.favoriteTotal = total
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
