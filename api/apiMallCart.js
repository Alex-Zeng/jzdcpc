import request from '../service'
export default {
  async getMallCart (cb, fileds) {
    const { data } = await request.post('/papi/mall_cart/index', fileds)
    cb(data)
  }
}
