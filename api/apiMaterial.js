import request from '../service'
export default {
  async getWebList (cb, fileds) {
    const data = await request.post('/papi/material/getWebList', fileds)
    cb(data)
  },
  async cancel (cb, fileds) {
    const data = await request.post('/papi/material/delete', fileds)
    cb(data)
  },
  async editor (cb, fileds) {
    const data = await request.post('/papi/material/edit', fileds)
    cb(data)
  },
  async addMore (cb, fileds) {
    const data = await request.post('/papi/mall_cart/addMore', fileds)
    cb(data)
  }
}
