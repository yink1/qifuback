import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from '@/store/modules/user'
import notice from '@/store/modules/notice'
import alert from '@/store/modules/alert'
import createPersistedState from 'vuex-persistedstate'
const store = new Vuex.Store({
  modules: {
    user: user,
    notice: notice,
    alert: alert
  },
  plugins: [createPersistedState()]
})
export default store
