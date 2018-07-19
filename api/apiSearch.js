import request from '../service'
export default {
  async search (cb, fileds) {
    const { data } = await request.post('/papi/goods/search', fileds)
    cb(data)
  }
}
