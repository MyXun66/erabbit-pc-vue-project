<template>
    <!-- 首页入口(分类+广告) -->
    <div class="home-entry">
      <div class="container">
          <!-- 左侧分类 -->
        <HomeCategory/>
        <!-- 轮播图 -->
        <HomeBanner/>
      </div> 
    </div>
    <!-- 新鲜好物 -->
    <HomeNew/>
    <!-- 热门推荐 -->
    <HomeHot/>
    <!-- 热门品牌 -->
    <HomeBrand/>
    <!-- 商品区块 -->
    <HomeProduct/>
    <!-- 最新专题 -->
    <HomeSpecial/>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
    name: "HomePage",
    components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct, HomeSpecial }
}
</script>

<style scoped lang="less">
// 使用tranistion组件实现动画，一个元素或组件的（显示|隐藏，创建|移除）

// 进入前 v-enter (v-enter-from)VUE3
// 进入中 v-enter-active
// 进入后 v-enter-to

// 离开前 v-leave (v-leave-from)VUE3
// 离开中 v-leave-active
// 离开后 v-leave-to


</style>
