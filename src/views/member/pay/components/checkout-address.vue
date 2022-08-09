<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')}}{{showAddress.address}}</li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton  @click="openDialog()" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit({})" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
      <div @click="selectedAddress=item" :class="{active:selectedAddress && selectedAddress.id===item.id}" class="text item" v-for="item in list" :key="item.id">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')}}{{item.address}}</li>
        </ul>
      </div>
      <!-- vue3.0 仅支持v-slot+template写法 -->  
      <template v-slot:footer>
        <XtxButton @click="visibleDialog=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="confirmAddressFn" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <!-- 添加修改地址 -->
    <AddressEdit @on-success="successHandler" ref="addressEditCom"/>
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './address-edit.vue'
export default {
  name: 'CheckoutAddress',
  components:{ AddressEdit },
  emits: ['change'], // 若代码片段无根元素：则最好在emits中声名触发自定义事件名称，或者用根元素包裹
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
   setup (props, { emit }) {
    // 1. 找到默认收货地址
    // 2. 没有默认收货地址，使用第一条收货地址
    // 3. 如果没有数据，提示添加
    const showAddress = ref(null)
    const defaultAddress = props.list.find(item => item.isDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      if (props.list.length) {
        // 加上一个注释：忽略下面代码的检查eslint
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }

    // 默认通知父组件一个收货地址id
    emit('change', showAddress.value && showAddress.value.id)
    // 切换地址对话框显示隐藏
    const visibleDialog = ref(false)
    // 记录当前选择地址id
    const selectedAddress = ref(null)
    // 点击确定
    const confirmAddressFn = () => {
      // 显示的地址换成呢选中的地址
      showAddress.value = selectedAddress.value
      // 把选中的地址ID通知结算组件
      emit('change', selectedAddress.value?.id)
      visibleDialog.value = false
    }

    const openDialog = () => {
      selectedAddress.value = null
      visibleDialog.value = true

    }

    // 打开添加编辑收货地址组件
    const addressEditCom = ref(null)
    const openAddressEdit = (address) => {
      // 添加 {}  修改 {数据}
      addressEditCom.value.open(address)
    }
    // 修改添加地址触发事件
    const successHandler = (formData) => {
      // 根据formData中的ID去当前地址列表中查找，有就是修改，否则是添加
      const address = props.list.find(item => item.id === formData.id)
      if (address) {
        for (const key in address) {
          address[key] = formData[key]
        }
      } else {
        // 若是添加，则在list中添加数据
        // 当你在修改formData的时候，数组中的数据也会更新，因为是同一引用地址。
        // 啥时候修改formData，当你打开对话框需要清空之前的输入信息
        // 克隆formData数据
        const jsonStr = JSON.stringify(formData)
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(jsonStr))
        // 若是修改，则在list中修改对应数据
        }
    }


    return { showAddress, visibleDialog, selectedAddress, confirmAddressFn, openDialog, openAddressEdit, addressEditCom, successHandler }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}

.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

</style>