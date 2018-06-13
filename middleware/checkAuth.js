import {getTokenFromCookie, getTokenFromReqCookie} from '../helper/auth'

export default function ({store, route, req}) {
  // 取Cookie中保存的token
  const token = getTokenFromReqCookie(req) || getTokenFromCookie()
  store.commit('SETTOKEN', token)
}
