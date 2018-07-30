import {getTokenFromCookie, getTokenFromReqCookie, getUserFromCookie} from '../helper/auth'

export default function ({store, route, req}) {
  // 取Cookie中保存的token
  const token = getTokenFromReqCookie(req) || getTokenFromCookie()
  const user = getUserFromCookie()
  if (token) {
    store.commit('SETTOKEN', token)
  }
  // console.log(user)
  if (user) {
    store.commit('SETUSER', JSON.parse(user))
  }
}
