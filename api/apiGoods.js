import request from '../service'
export default {
  async getGoodsDetail (cb, fileds) {
    const { data } = await request.post('/papi/goods/get', fileds)
    cb(data)
  },
  async getPath (cb, fileds) {
    const { data } = await request.get('/papi/goods/getPath', fileds)
    cb(data)
  },
  async getSpecification (cb, fileds) {
    const { data } = await request.get('/papi/goods/getSpecification', fileds)
    cb(data)
  },
  async getSupplierHot (cb, fileds) {
    const { data } = await request.post('/papi/goods/getSupplierHot', fileds)
    cb(data)
  }
}
