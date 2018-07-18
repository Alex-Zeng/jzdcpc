import request from '../service'
export default {
  async getBanner (fileds, cb) {
    const { data } = await request.post('/papi/img/banner', fileds)
    cb(data)
  },
  async getFirstNotice (fileds, cb) {
    const data = await request.post('/papi/user/getNoticeList', fileds)
    cb(data)
  }
}
