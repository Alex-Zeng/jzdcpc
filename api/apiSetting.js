import request from '../service'
export default {
  async getProfile (cb, fields) {
    const { data } = await request.post('/papi/user/getProfile', fields)
    cb(data)
  },
  async set (cb, fields) {
    const data = await request.post('/papi/user/profile', fields)
    cb(data)
  },
  async oldPhoneValid (cb, fields) {
    const data = await request.post('/papi/code/oldPhoneValid', fields)
    cb(data)
  },
  async bindPhone (cb, fileds) {
    const data = await request.post('/papi/user/bind', fileds)
    cb(data)
  },
  async passwordStatus (cb) {
    const data = await request.get('/papi/user/getPasswordStatus')
    cb(data)
  },
  async passwordInit (cb, form) {
    const data = await request.post('/papi/user/initPassword', form)
    cb(data)
  },
  async passwordUpdate (cb, form) {
    const data = await request.post('/papi/user/updatePassword', form)
    cb(data)
  },
  async emailStatus (cb) {
    const data = await request.get('/papi/user/getEmailStatus')
    cb(data)
  },
  async emailInit (cb, form) {
    const data = await request.post('/papi/user/initEmail', form)
    cb(data)
  },
  async oldEmailValid (cb, fields) {
    const data = await request.post('/papi/email/valid', fields)
    cb(data)
  },
  async emailUpdate (cb, form) {
    const data = await request.post('/papi/user/updateEmail', form)
    cb(data)
  }
}
