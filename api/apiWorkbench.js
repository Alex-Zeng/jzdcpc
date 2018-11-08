import request from '../service'
export default {
  async getNotice (fileds, cb) {
    const data = await request.post('/papi/user/getNoticeList', fileds)
    cb(data)
  },
  async messageList (fileds, cb) {
    const { data } = await request.post('/papi/user/getMessageList', fileds)
    cb(data)
  },
  async getBuyerOrderInfo (cb) {
    const data = await request.get('/papi/buyer/getOrderInfo')
    cb(data)
  },
  async getSupplierOrderInfo (cb) {
    const data = await request.get('/papi/seller/getOrderInfo')
    cb(data)
  },
  async getDeskList (url, fileds, cb) {
    const data = await request.get(url, fileds)
    cb(data)
  }
}
