import request from '../service'
export default {
  async getNotice (fileds, cb) {
    const data = await request.post('/papi/user/getNoticeList', fileds)
    cb(data)
  },
  async getTotal (cb) {
    const data = await request.get('/papi/index/turnover')
    cb(data)
  },
  async messageList (fileds, cb) {
    const { data } = await request.post('/papi/user/getMessageList', fileds)
    cb(data)
  },
  async getBuyerOrderInfo (cb) {
    const data = await request.get('/papi/user/getBuyerOrderInfo')
    cb(data)
  },
  async getSupplierOrderInfo (cb) {
    const data = await request.get('/papi/user/getSupplierOrderInfo')
    cb(data)
  },
  async getDeskList (fileds, cb) {
    const data = await request.get('/papi/order/getDeskList', fileds)
    cb(data)
  }
}
