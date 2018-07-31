import {getTokenFromCookie, getUserFromCookie} from '../helper/auth'

export default function ({store, req}) {
  // 取Cookie中保存的token
  const token = getTokenFromCookie()
  const user = getUserFromCookie()
  if (token) {
    store.commit('SETTOKEN', token)
  }
  if (user) {
    store.commit('SETUSER', JSON.parse(user))
  }
}
