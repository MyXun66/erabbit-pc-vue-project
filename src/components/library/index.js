// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png' // 默认图片
import XtxBread from './xtx-bread.vue'
import XtxBreadItem from './xtx-bread-item.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)
    // 定义指令 
    defineDirective(app)
  }
}

// 定义指令 
const defineDirective = (app) => {
  // 1 图片懒加载 使用时v-lazy
  // 原理：先存储图片地址，当图片进入可视区，将存储的图片地址设置给图片元素
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0的指令拥有的钩子函数和组件一样 使用指令的DOM是否创建好，钩子函数为：mounted
    mounted(el, binding) {
      // 2 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 3 将指令上的值，设置给el的src,binding.value就是指令的值
          // 4 处理图片加载失败 error是图片加载失败事件 load图片加载成功事件
          el.onerror = () => {
            // 设置默认图片
            el.src = defaultImg
          }
          el.src = binding.value
        }
      },{
        // 相交比例
        threshold:0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}