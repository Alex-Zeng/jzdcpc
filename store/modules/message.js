import apiMessage from '../../api/apiMessage'

const state = {
  messageList: [],
  messageNumber: 0,
  messageTotal: 0
}

const getters = {
  messageList: (state, getters, rootState) => {
    return state.messageList
  },
  messageTotal: (state) => {
    return state.messageTotal
  },
  messageNumber: (state, getters, rootState) => {
    return state.messageNumber
  }
}

const actions = {
  getMessageList ({commit}, {fileds, cb}) {
    apiMessage.messageList(data => {
      const {list, total} = data
      commit('updateMessageList', list)
      commit('updateMessageTotal', total)
      commit('updateMessageNumber', 0)
      cb()
    }, fileds)
  },
  getMessageNumber ({ commit }) {
    apiMessage.messageNumber(data => {
      const {total} = data
      commit('updateMessageNumber', total)
    })
  }
}

const mutations = {
  updateMessageList (state, data) {
    state.messageList = data
  },
  updateMessageTotal (state, total) {
    state.messageTotal = total
  },
  updateMessageNumber (state, number) {
    state.messageNumber = number
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
