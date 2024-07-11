import request from '@/utils/request'
/**
 *
 * @param data
 */
// 修改密码
export const editPassword = (data: any) =>
  request({
    'url': '/admin/editPassword',
    'method': 'put',
    data
  })
// 获取营业状态
export const getStatus = () =>
request({
    'url': `/uniapp/status`,
    'method': 'get'
  })
// 设置营业状态
export const setStatus = (data:any) =>
request({
      'url': `/uniapp/`+data,
      'method': 'put',
      'data':data
  })
