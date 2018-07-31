import apiNotice from '../../api/apiNotice'

const state = {
  noticeList: [],
  noticeNumber: 0,
  noticeTotal: 0
}

const getters = {
  noticeList: (state, getters, rootState) => {
    return state.noticeList
  },
  noticeTotal: (state) => {
    return state.noticeTotal
  },
  noticeNumber: (state, getters, rootState) => {
    return state.noticeNumber
  }
}

const actions = {
  getNoticeList ({commit}, {fileds, cb}) {
    apiNotice.noticeList(data => {
      const {list, total} = data
      commit('updateNoticeList', list)
      commit('updateNoticeTotal', total)
      commit('updateNoticeNumber', 0)
      cb()
    }, fileds)
  },
  getNoticeNumber ({ commit }) {
    apiNotice.noticeNumber(data => {
      const {total} = data
      commit('updateNoticeNumber', total)
    })
  }
}

const mutations = {
  updateNoticeList (state, data) {
    state.noticeList = data
  },
  updateNoticeTotal (state, total) {
    state.noticeTotal = total
  },
  updateNoticeNumber (state, number) {
    state.noticeNumber = number
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
