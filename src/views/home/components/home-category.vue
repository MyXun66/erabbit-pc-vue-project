<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in item.children" :key="sub.id">{{sub.name}}</RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeCategory',
  setup () {
    // 1. 获取vuex的一级分类，并且只需要两个二级分类
    // 2. 需要在组件内部，定义一个品牌数据
     const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }]
    })
    const store = useStore()
    const menuList = computed(() => {
    // 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
      const list = store.state.category.list.map( item => {
        return {
            // 只需要两个二级分类
            id: item.id,
            name: item.name,
            children: item.children && item.children.slice(0,2),
            goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    // 4. 进行渲染即可
    return { menuList }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
