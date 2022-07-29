import { createRouter, createWebHashHistory } from 'vue-router'
// 路由规则
const routes = [
]

const router = createRouter({
  // 所有hash路由模式
  history: createWebHashHistory(),
  routes
})

export default router
