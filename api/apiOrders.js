import request from '../service'

export default {
  async orderList (url, successCb, fileds) {
    const { data, status } = await request.post(url, fileds)
    if (status !== 0) {
      // errorCb(msg)
      return
    }
    successCb(data)
  },
  async make (cb, fileds) {
    const data = await request.post('/papi/order/make', fileds)
    cb(data)
  },
  async detail (url, cb, fileds) {
    const data = await request.post(url, fileds)
    cb(data)
  },
  async delivery (cb, fileds) {
    const data = await request.post('/papi/seller/delivery', fileds)
    cb(data)
  },
  async statusList (cb) {
    const {data} = await request.get('/papi/order/showStatusList')
    cb(data)
  },
  async receipt (url, cb, fileds) {
    const data = await request.post(url, fileds)
    cb(data)
  },
  async cancel (url, cb, fileds) {
    const data = await request.post(url, fileds)
    cb(data)
  },
  async service (url, cb, fileds) {
    const data = await request.post(url, fileds)
    cb(data)
  },
  async addSpecification (cb, fileds) {
    const data = await request.post('/papi/goods/addSpecification', fileds)
    cb(data)
  }
}
