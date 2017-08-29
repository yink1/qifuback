import axios from 'axios'
import store from '@/store/store'
import router from '@/router/router'
import qs from 'qs'
// import {showAlert} from '@/common/noticeAlertFun'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = process.env.BASE_API
// axios.defaults.baseURL = 'http://localhost:60447'

// http request 拦截器
axios.interceptors.request.use(
  config => {
//  console.log('config.data')
//  console.log(store.getters)
    const token = store.getters.getUserToken
    if (store.getters.getUserLogin === true) {
      config.headers.Authorization = `bearer ${token}`
    }
//  console.log('config.data')
//  console.log(config.headers.Authorization)
    console.log('config.url')
    console.log(config.url.toString())
    if (config.method === 'post' && config.url.toString().indexOf('UploadDoc') < 0 && config.url.toString().indexOf('qiniu') < 0) {
      console.log('setqs')
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.SET_USER_LOGOUT)
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
//  console.log('response error')
//  console.log(error.response)
//  console.log(qs.stringify(error))
    return Promise.reject(error)
  })
export default axios
