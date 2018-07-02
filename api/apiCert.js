import request from '../service'
export default {
  async getCertification (cb) {
    const { data } = await request.post('/papi/user/getCertification')
    cb(data)
  },
  async certification (fileds, successCb, errorCb) {
    const {status, msg} = await request.post('/papi/user/certification', fileds)
    if (status !== 0) {
      errorCb(msg)
    } else {
      successCb(msg)
    }
  }
}
