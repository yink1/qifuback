import axios from './axiosConfig'
import {showNotice} from '@/common/noticeAlertFun'
import qs from 'qs'
export function axiosPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
//      console.log('response.data')
//      console.log(response.data)
        return resolve(response.data)
      }, err => {
//      console.log('err')
//      console.log(err.response.data)
        if (err.response.data.Message) {
          showNotice(err.response.data.Message)
        } else if (err.response.data.error_description) {
          showNotice(err.response.data.error_description)
        } else {
          reject(err)
        }
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
        showNotice('网络出现异常！')
        // reject(error)
      })
  })
}

export function axiosGet (url, params) {
  return new Promise((resolve, reject) => {
//  console.log('url')
//  console.log(params)
//  console.log(url)
    if (params != null) {
      url = url + '?' + qs.stringify(params)
    }
    axios.get(url)
      .then(response => {
        console.log('response.data')
        console.log(response.data)
        return resolve(response.data)
      }, err => {
//      console.log('err')
//      console.log(err)
        // showAlert('系统错误', err.response.data.Message)
        // reject(err)
        if (err.response.data.Message) {
          showNotice(err.response.data.Message)
        } else if (err.response.data.error_description) {
          showNotice(err.response.data.error_description)
        } else {
          reject(err)
        }
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
        showNotice('网络出现异常！')
        // reject(error)
      })
  })
}
