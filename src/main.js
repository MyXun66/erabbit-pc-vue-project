import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入ui组件库
import UI from '@/components/library'

// 1.重置样式库
import 'normalize.css'
// 2.自己样式的重置样式
import '@/assets/styles/common.less'

// mockjs
import '@/mock/index'

createApp(App).use(store).use(router).use(UI).mount('#app')
