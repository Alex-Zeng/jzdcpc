import request from '../service'
export default {
  async suggestion (fileds, cb) {
    const { data } = await request.post('/papi/suggestion/add', fileds)
    cb(data)
  }
}
