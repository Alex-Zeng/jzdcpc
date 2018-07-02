import request from '../service'
export default {
  async getAddressList (cb) {
    const { data } = await request.post('/papi/user/getAddressList')
    cb(data)
  },
  async setDefaultAddress (fileds, cb) {
    const data = await request.post('/papi/user/setDefaultAddress', fileds)
    cb(data)
  },
  async removeAddress (fileds, cb) {
    const data = await request.post('/papi/user/removeAddress', fileds)
    cb(data)
  },
  async getLevelArea (fileds, cb) {
    const data = await request.post('/papi/index/getLevelArea', fileds)
    cb(data)
  },
  async getAddressTags (cb) {
    const data = await request.get('/papi/user/getAddressTag')
    cb(data)
  },
  async addAddressTag (fileds, cb) {
    const data = await request.post('/papi/user/addAddressTag', fileds)
    cb(data)
  },
  async removeAddressTag (fileds, cb) {
    const data = await request.post('/papi/user/removeAddressTag', fileds)
    cb(data)
  },
  async editAddress (fileds, cb) {
    const data = await request.post('/papi/user/editAddress', fileds)
    cb(data)
  },
  async addAddress (fileds, cb) {
    const data = await request.post('/papi/user/addAddress', fileds)
    cb(data)
  }
}
