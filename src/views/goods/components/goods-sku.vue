<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected: val.selected}" @click="changeSku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name" alt="">
          <span :class="{selected: val.selected}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'GoodsSku',
  props: {
    goods:{
        type: Object,
        default: () => ({})
    }
  },
  setup () {
    // 1.选中与取消中，约定每个按钮都有自己选中的状态数据：selected
    // 1.1点击的是已选中，只需要取消当前选中
    // 1.2点击的是未选中，把同一个规格的按钮改成未选中，当前点击改成选中
    const changeSku = (item,val) => {
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach( valItem => {
            valItem.selected = false
        })
        val.selected = true
      }
    }

    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>