import request from '../service'
export default {
  async getMallCart (cb, fileds) {
    const { data } = await request.post('/papi/mall_cart/index', fileds)
    cb(data)
  },
  async delete (cb, fileds) {
    const data = await request.post('/papi/mall_cart/delete', fileds)
    cb(data)
  },
  async add (cb, fileds) {
    const data = await request.post('/papi/mall_cart/add', fileds)
    cb(data)
  },
  async update (cb, fileds) {
    const data = await request.post('/papi/mall_cart/update', fileds)
    cb(data)
  },
  async getNum (cb) {
    const data = await request.get('/papi/mall_cart/getNumber')
    cb(data)
  }
}
