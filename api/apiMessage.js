import request from '../service'

export default {
  async messageList (successCb, fileds) {
    const { data } = await request.post('/papi/user/getMessageList', fileds)
    successCb(data)
  },
  async messageNumber (successCb, errorCb) {
    const { status, msg, data } = await request.get('/papi/user/messageNumber')
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data, msg)
  }
}
