import {getUserFromCookie} from '../helper/auth'

export default function ({store}) {
  // 取Cookie中保存的token
  const loggedUser = getUserFromCookie()
  store.commit('SETUSER', loggedUser)
}
