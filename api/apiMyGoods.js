import request from '../service'
export default {
  async getProductList (cb, fileds) {
    const { data } = await request.post('/papi/seller/getProductList', fileds)
    cb(data)
  }
}
