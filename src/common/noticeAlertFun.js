import * as types from '@/store/types'
import store from '@/store/store'

// showNotice公共方法
export function showNotice (msg) {
  console.log('showNotice' + msg)
  store.commit(types.SHOW_NOTICE, msg)
}

// showNotice公共方法
export function showAlert (title, msg) {
  console.log(msg)
  // store.commit(types.SHOW_ALERT, {body: '', title: ''})
  store.commit(types.SHOW_ALERT, {body: msg, title: title})
}
