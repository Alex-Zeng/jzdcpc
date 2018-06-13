import request from '../service'

export default {
  async loginIndex (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/login/index', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  }
}
