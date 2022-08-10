<template>
  <div class="member-order">
    <XtxTabs @tab-click="changeTab" v-model="activeName">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{item.label}}</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import { orderStatus } from '@/api/constants'
export default {
    name: "MemberOrder",
    setup () {
      const activeName = ref('all')
      const changeTab = (tab) => {
        console.log(tab)
      }
      return { activeName, changeTab, orderStatus }
    }
}
</script>

<style scoped lang="less">
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>