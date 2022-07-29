import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    // 持久化插件
    createPersistedstate({
      // 存储数据的名字
      key: 'erabbit-client-pc-store',
      // 指定要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
