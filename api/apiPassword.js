import request from '../service'
export default {
  async checkPhone (successCb, errorCb, fileds) {
    const { msg, status } = await request.post('/papi/password/checkPhone', fileds)
    if (status === 0) {
      successCb()
      return
    }
    errorCb(msg)
  },
  async passwordUpdate (successCb, errorCb, fileds) {
    const { msg, status } = await request.post('/papi/password/update', fileds)
    if (status === 0) {
      successCb(msg)
      return
    }
    errorCb(msg)
  }
}
