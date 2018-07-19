import request from '../service'
export default {
  async getCategoryList (cb) {
    const data = await await request.get('/papi/goods/getCategoryList')
    cb(data)
  }
}
