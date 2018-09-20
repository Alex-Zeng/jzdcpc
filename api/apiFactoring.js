import request from '../service'
export default {
  async factoringAdd (fileds, cb) {
    const { data } = await request.post('/papi/Factoring/factoringAdd', fileds)
    cb(data)
  },
  async getOrderInfo (fileds, cb) {
    const data = await request.get('/papi/Factoring/getOrderInfo', fileds)
    cb(data)
  },
  async getFactoringList (cb) {
    const data = await request.get('/papi/Factoring/getFactoringList')
    cb(data)
  },
  async getFactoringDetail (fileds, cb) {
    const data = await request.post('/papi/Factoring/getFactoringDetail', fileds)
    cb(data)
  },
  async getProfile (cb) {
    const data = await request.get('/papi/user/getProfile')
    cb(data)
  }
}
