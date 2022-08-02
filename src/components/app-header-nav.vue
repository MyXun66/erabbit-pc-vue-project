<template>
    <ul class="app-header-nav">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <li v-for="item in list" :key="item.id" @mouseenter="show(item)" @mouseleave="hide(item)">
        <router-link @click="hide(item)" :to="`/category/${item.id}`">{{item.name}}</router-link>
        <div class="layer" :class="{open:item.open}">
         <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link @click="hide(item)" :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </router-link>
          </li>
         </ul>
        </div>
      </li>
    </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    // 获取分类列表数据
    const list = computed(() => {
        return store.state.category.list
    })

    // 跳转的时候不会关闭二级类目,通过数据控制
    // 1.vuex每个分类加上open属性
    // 2.vuex提供显示和隐藏的函数,修改open数据
    // 3.再组件中使用vuex中的函数,提供一个显示隐藏的类名
    const show = (item) => {
      store.commit('category/show', item.id)
    }
    const hide = (item) => {
      store.commit('category/hide', item.id)
    }
    return {list, show, hide}
  }
}
</script>

<style scoped lang="less">
.app-header-nav {
    width: 820px;
    display: flex;
    position: relative;
    justify-content: space-around;
    padding-left: 40px;
    > li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        // 鼠标经过显示二级类目
      //   > .layer {
      //   height: 132px;
      //   opacity: 1;
      //  }
      }
    }
}
// 二级类目弹层
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  z-index: 999;
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
   }
}
</style>