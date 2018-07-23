import request from '../service'
export default {
  async getGoodsDetail (cb, fileds) {
    const { data } = await request.post('/papi/goods/get', fileds)
    cb(data)
  }
}
