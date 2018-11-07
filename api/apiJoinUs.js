import request from '../service'
export default {
  async merchant (successCb, errorCb, fileds) {
    const { msg, status } = await request.post('/papi/service/merchant', fileds)
    if (status === 0) {
      successCb()
      return
    }
    errorCb(msg)
  }
}
