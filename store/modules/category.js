import apiCategory from '../../api/apiCategory'

const state = {
  categoryList: {}
}

const getters = {
  categoryList: (state, getters, rootState) => {
    return state.categoryList
  }
}

const actions = {
  getCategoryList ({ commit }, cb) {
    apiCategory.getCategoryList((result) => {
      cb(result)
      commit('updateCategoryList', result)
    })
  }
}

const mutations = {
  updateCategoryList (state, data) {
    state.categoryList = data
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
