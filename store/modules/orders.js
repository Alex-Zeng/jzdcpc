import apiTest from '../../api/apiOrders'

const state = {
  orderList: {},
  total: 0
}

const getters = {
  orderList: (state, getters, rootState) => {
    return state.orderList
  },
  orderTotal: (state, getters, rootState) => {
    return state.total
  }
}

const actions = {
  getOrderList ({ commit }, {data, cb}) {
    apiTest.orderList(data => {
      const {list, total} = data
      commit('updateList', list)
      commit('updateTotal', total)
      cb()
    }, data)
  }
}

const mutations = {
  updateList (state, data) {
    state.orderList = data
  },
  updateTotal (state, total) {
    state.total = total
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
