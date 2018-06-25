import request from '../service'

export default {
  async favoriteType (successCb, fileds) {
    const { data, status } = await request.post('/papi/goods/getFavoriteType', fileds)
    if (status !== 0) {
      // errorCb(msg)
      return
    }
    successCb(data)
  },
  async favoriteList (successCb, fileds) {
    const { data } = await request.post('/papi/goods/getFavoriteList', fileds)
    successCb(data)
  },
  async favoriteDelete (successCb, fileds, errorCb) {
    const { status, msg, data } = await request.post('/papi/goods/removeFavorite', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data, msg)
  }
}
