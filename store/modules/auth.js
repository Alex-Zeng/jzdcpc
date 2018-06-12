
const state = {
  user: null,
  token: null
}

const getters = {
  loggedUser: (state) => {
    return state.user
  }
}

const actions = {
//   loggedUser (state) {
//     return state.user
//   }
}

const mutations = {
  SETUSER (state, user) {
    state.user = user
  },
  SETTOKEN (state, token) {
    state.token = token
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}
