import request from '../service'

export default {
  async loginIndex (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/login/index', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  },
  async getPermission (successCb, fileds) {
    const { data, status } = await request.post('/papi/company_audit/getPermission', fileds)
    if (status !== 0) {
      return
    }
    successCb(data)
  },
  async loginPhone (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/login/phone', fileds)
    if (status === -3) {
      // 用户未注册
      successCb({data, status})
      return
    }
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb({data, status})
  },
  async registerPhone (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/register/phone', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  },
  async registerSendCode (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/code/registerSend', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  },
  async loginSendCode (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/code/loginSend', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  },
  async validRegisterCode (successCb, errorCb, fileds) {
    const { data, status, msg } = await request.post('/papi/code/registerValid', fileds)
    if (status !== 0) {
      errorCb(msg)
      return
    }
    successCb(data)
  },
  async logout () {
    await request.post('/napi/logout')
  }
}
