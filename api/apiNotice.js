import request from '../service'
export default {
  async noticeList (successCb, fileds) {
    const { data } = await request.post('/papi/user/getNoticeList', fileds)
    successCb(data)
  },
  async noticeNumber (successCb, errorCb) {
    const { status, msg, data } = await request.get('/papi/user/noticeNumber')
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data, msg)
  }
}
