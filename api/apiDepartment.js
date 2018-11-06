import request from '../service'
export default {
  async getOrganization (fileds, cb) {
    const data = await request.post('/papi/Company/getOrganization')
    cb(data)
  },
  async organizationAdd (fileds, cb) {
    const data = await request.post('/papi/Company/organizationAdd', fileds)
    cb(data)
  },
  async getOrganizationStaff (fileds, cb) {
    const data = await request.post('/papi/Company/getOrganizationStaff', fileds)
    cb(data)
  },
  async staffEdit (fileds, cb) {
    const data = await request.post('/papi/Company/staffEdit', fileds)
    cb(data)
  },
  async staffDelete (fileds, cb) {
    const data = await request.post('/papi/Company/staffDelete', fileds)
    cb(data)
  },
  async organizationEdit (fileds, cb) {
    const data = await request.post('/papi/Company/organizationEdit', fileds)
    cb(data)
  },
  async staffAdd (fileds, cb) {
    const data = await request.post('/papi/Company/staffAdd', fileds)
    cb(data)
  },
  async userAdd (fileds, cb) {
    const data = await request.post('/papi/Company/userAdd', fileds)
    cb(data)
  },
  async getContactList (fileds, cb) {
    const data = await request.post('/papi/Company/getContactList', fileds)
    cb(data)
  }
}
