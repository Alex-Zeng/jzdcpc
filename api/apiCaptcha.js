import request from '../service'

export default {
  async img (successCb, errorCb) {
    const { data, status, msg } = await request.post('/papi/captcha/img')
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  }
}
