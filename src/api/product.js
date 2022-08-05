import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
 export const findGoodsCommentInfo = (id) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // axios碰见http https 开头的地址，不会添加基础地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 * @param {Object} params - 参数
 */
 export const findGoodsCommentList = (id, params) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // axios碰见http https 开头的地址，不会添加基础地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}

