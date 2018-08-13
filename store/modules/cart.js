import apiMallCart from '../../api/apiMallCart'

const state = {
  cartNum: 0
}

const getters = {
  cartNum: (state, getters, rootState) => {
    return state.cartNum
  }
}

const actions = {
  getCartNum ({ commit }) {
    apiMallCart.getNum(data => {
      const {data: {total}} = data
      commit('updateCartNum', total)
    })
  }
}

const mutations = {
  updateCartNum (state, data) {
    state.cartNum = data
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
