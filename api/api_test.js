import request from '../service'
export default {
  async getGoodsRecommend (cb) {
    const { data } = await request.post('/papi/goods/getRecommend')
    cb(data)
  }
}
