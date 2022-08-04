<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
    <div v-if="loading" class="loading"></div>
    <template v-else>
      <span class="ellipsis"  @click="changeItem(item)" v-for="item in currList" :key="item.code">{{item.name}}</span>
    </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios' 
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
        type: String,
        default: ''
    }
  },
  setup (props,{ emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)

    // 所有省市区数据
    const allCityData = ref([])
    // 控制加载中图片显示(是否正在加载数据)
    const loading = ref(false)

    const openDialog = () => {
      active.value = true
      // 获取地区数据
      loading.value = true
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
      // 清空选择结果
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const closeDialog = () => {
      active.value = false
    }
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog()
      else openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      closeDialog()
    })

    // 实现计算属性：获取当前显示的地区列表数组
    const currList = computed(() => {
        // 默认省一级
        let list = allCityData.value
        // 城市
        if (changeResult.provinceCode) {
            list = list.find(p => p.code === changeResult.provinceCode).areaList
        }
        // 地区
        if (changeResult.cityCode) {
            list = list.find(c => c.code === changeResult.cityCode).areaList
        }
        return list
    })

    // 定义选择的省市区数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''  
    })
	
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 这是最后一级，关闭对话框，通知父组件数据
        closeDialog()
        emit('change', changeResult)
      }
    }

    
    return { active, toggleDialog, target, loading, currList, changeItem }
  }
}

// 获取省市区数据函数
//  数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
const getCityData = () => {
  // 1.本地没有缓存，发请求获取数据 {异步}
  // 2.本地有缓存，取本地数据  {同步}
  // 返回promise在then中获取数据，因为可能异步也可能同步
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    // 约定数据存储到window的cityDate字段
    if(window.cityData) {
        resolve(window.cityData)
    } else {
        // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })

}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;  
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
     .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>