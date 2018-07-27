import apiOrders from '../../api/apiOrders'

const state = {
  orderList: {},
  total: 0,
  orderDetail: {},
  statusList: []
}

const getters = {
  orderList: (state, getters, rootState) => {
    return state.orderList
  },
  orderTotal: (state, getters, rootState) => {
    return state.total
  },
  orderDetail: (state, getters, rootState) => {
    return state.orderDetail
  },
  statusList: (state, getters, rootState) => {
    return state.statusList
  }
}

const actions = {
  getOrderList ({ commit }, {data, cb}) {
    apiOrders.orderList(data => {
      const {list, total} = data
      commit('updateList', list)
      commit('updateTotal', total)
      cb()
    }, data)
  },
  getOrderDetail ({ commit }, {fileds, cb}) {
    apiOrders.detail((result) => {
      const {data} = result
      commit('updateDetail', data)
      cb()
    }, fileds)
  },
  doDelivery ({ commit }, {fileds, cb}) {
    apiOrders.delivery((result) => {
      cb(result)
    }, fileds)
  },
  getStatusList ({ commit }) {
    apiOrders.statusList((data) => {
      let arr = []
      let keys = Object.keys(data)
      let values = Object.values(data)
      for (let i = 0; i < keys.length; i++) {
        arr.push({key: keys[i], value: values[i]})
      }
      commit('updateStatusList', arr)
    })
  },
  orderReceipt ({ commit }, {cb, fileds}) {
    apiOrders.receipt((data) => {
      cb(data)
    }, fileds)
  },
  orderCancel ({ commit }, {cb, fileds}) {
    apiOrders.cancel((data) => {
      cb(data)
    }, fileds)
  },
  orderService ({ commit }, {cb, fileds}) {
    apiOrders.service((data) => {
      cb(data)
    }, fileds)
  }
}

const mutations = {
  updateList (state, data) {
    state.orderList = data
  },
  updateTotal (state, total) {
    state.total = total
  },
  updateDetail (state, data) {
    state.orderDetail = data
  },
  updateStatusList (state, data) {
    state.statusList = data
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
