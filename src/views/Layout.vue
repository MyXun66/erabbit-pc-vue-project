<template>
  <!-- 顶部通栏 -->
  <AppNavbar/>
  <!-- 头部组件 -->
  <AppHeader/>
    <!-- 吸顶头部 -->
  <AppHeaderSticky/>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部组件 -->
  <AppFooter/>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
import { useStore } from 'vuex'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
export default {
  components: { AppNavbar, AppHeader, AppFooter, AppHeaderSticky },
  setup () {
    // 获取分类数据
    const store = useStore()
    store.dispatch('category/getList')
  }

}
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
