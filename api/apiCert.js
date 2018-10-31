import request from '../service'
export default {
  async getCertification (cb) {
    const { data } = await request.post('/papi/company_audit/get')
    cb(data)
  },
  async certification (fileds, successCb, errorCb) {
    const {status, msg} = await request.post('/papi/company_audit/submit', fileds)
    if (status !== 0) {
      errorCb(msg)
    } else {
      successCb(msg)
    }
  },
  async invitationVerify (fileds, cb) {
    const { data } = await request.post('/papi/company_audit/invitationVerify', fileds)
    cb(data)
  }
}
