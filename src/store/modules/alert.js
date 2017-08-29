import * as types from '../types'

// 使用添加了前缀的名称定义 getter、action 和 mutation
const notice = {
  state: {
    // 显示状态
    show: false,
    // 提示信息
    msg: '',
    // 标题
    title: ''
  },
  mutations: {
    [types.SHOW_ALERT] (state, msg) {
      console.log(msg)
      if (msg.body && msg.body !== '') {
        console.log(msg)
        state.show = true
        state.msg = msg.body
        state.title = msg.title
      } else {
        state.show = false
        state.msg = ''
        state.title = ''
      }
    }
  }
}
export default notice
