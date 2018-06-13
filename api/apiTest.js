import request from '../service'
export default {
  async getFavoriteList (cb, fileds) {
    const { data } = await request.post('/papi/user/getFavoriteList', fileds)
    cb(data)
  }
}
