// 首页相关api函数
 
import request from "@/utils/request"

// 获取品牌
/**
 * 
 * @param {Integer} limit 品牌个数
 * @returns 品牌数据
 */
export const findBrand = (limit = 6) => {
    return request('/home/brand', 'get', {limit})
}

/**
 * 获取广告图
 * @returns Promise
 */
 export const findBanner = () => {
    return request('/home/banner', 'get')
  }

  export const findNew = () => {
    return request('/home/new', 'get')
  }

  export const findHot = () => {
    return request('home/hot', 'get')
  }

  /**
   * 
   * @returns 返回商品
   */
  export const findGoods = () => {
    return request('home/goods', 'get')
  }

  /**
   * 
   * @returns 返回最新专题
   */
  export const findSpecial = () => {
    return request('home/special', 'get')
  }
  
