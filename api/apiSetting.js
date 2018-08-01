import request from '../service'
export default {
  async getProfile (cb, fields) {
    const { data } = await request.post('/papi/user/getProfile', fields)
    cb(data)
  },
  async set (cb, fields) {
    const data = await request.post('/papi/user/profile', fields)
    cb(data)
  }
}
