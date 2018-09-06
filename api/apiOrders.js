import request from '../service'

export default {
  async orderList (successCb, fileds) {
    const { data, status } = await request.post('/papi/order/getList', fileds)
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
  async detail (cb, fileds) {
    const data = await request.post('/papi/order/detail', fileds)
    cb(data)
  },
  async delivery (cb, fileds) {
    const data = await request.post('/papi/order/delivery', fileds)
    cb(data)
  },
  async statusList (cb) {
    const {data} = await request.get('/papi/order/showStatusList')
    cb(data)
  },
  async receipt (cb, fileds) {
    const data = await request.post('/papi/order/receipt', fileds)
    cb(data)
  },
  async cancel (cb, fileds) {
    const data = await request.post('/papi/order/cancel', fileds)
    cb(data)
  },
  async service (cb, fileds) {
    const data = await request.post('/papi/order/service', fileds)
    cb(data)
  },
  async addSpecification (cb, fileds) {
    const data = await request.post('/papi/goods/addSpecification', fileds)
    cb(data)
  }
}
