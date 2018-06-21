import request from '../service'

export default {
  async orderList (successCb, fileds) {
    const { data, status } = await request.post('/papi/order/getList', fileds)
    if (status !== 0) {
      // errorCb(msg)
      return
    }
    successCb(data)
  }
}
