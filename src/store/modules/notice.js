import * as types from '../types'

// 使用添加了前缀的名称定义 getter、action 和 mutation
const notice = {
  state: {
    // 显示状态
    show: false,
    // 提示信息
    msg: '’'
  },
  mutations: {
    [types.SHOW_NOTICE] (state, notice) {
      console.log(notice)
      if (notice !== '') {
        state.show = true
        state.msg = notice
      } else {
        state.show = false
        state.msg = ''
      }
    }
  }
}
export default notice
