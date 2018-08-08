import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  const { idToken, state } = getQueryParams()
  return {
    token: idToken,
    secret: state
  }
}

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
  Cookie.set('jwt', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  Cookie.remove('jwt')
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromCookie = () => {
  if (process.server) return
  const token = Cookie.get('_user')
  return token
}

export const getTokenFromCookie = () => {
  if (process.server) return
  const token = Cookie.get('_token')
  return token || null
}

export const getTokenFromReqCookie = (req) => {
  if (!req) {
    return null
  }
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('_token='))
  if (!jwtCookie) return null
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getUserFromReqCookie = (req) => {
  if (!req) {
    return null
  }
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('_user='))
  if (!jwtCookie) return null
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getUserFromLocalStorage = () => {
  if (process.SERVER_BUILD) return
  const json = localStorage.user
  return json ? JSON.parse(json) : undefined
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
