import axios from 'axios'
// import { Message } from 'element-ui'
import qs from 'qs'
import config from './config'
import Cookies from 'js-cookie'

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(

  config => {
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    const {status} = res.data
    if (parseInt(status) === -2) {
      const token = Cookies.get('token')
      // 存在token
      if (token) {
        window.$nuxt.$message({
          showClose: true,
          message: '用户未登录或登录已失效，请登录后继续操作',
          type: 'error'
        })
        window.$nuxt.$router.replace('/auth')
      }
    }
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    return service({
      method: 'post',
      url,
      data: data
    })
  },
  get (url, data) {
    return service({
      method: 'get',
      url,
      params: data
    })
  },
  delete (url, data) {
    return service({
      methods: 'delete',
      url,
      params: data
    })
  }
}
