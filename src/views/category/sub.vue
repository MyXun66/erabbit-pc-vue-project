<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread/>
      <!-- 筛选区 -->
      <SubFilter/>
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort/>
        <!-- 列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SubBread from './components/sub-bread.vue';
import SubFilter from './components/sub-filter.vue';
import SubSort from './components/sub-sort.vue';
export default {
    name: "SubCategory",
    components: { SubBread, SubFilter, SubSort },
    setup () {
      const isAllChecked = ref(true)

      return { isAllChecked }

    }
}
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>