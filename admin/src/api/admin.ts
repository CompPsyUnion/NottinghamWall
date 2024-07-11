import request from '@/utils/request'
/**
 *
 * 管理员管理
 *
 **/
// 登录
export const login = (data: any) =>
  request({
    'url': '/manage/login',
    'method': 'post',
    data: data
  })

// 退出
 export const adminLogout = (params: any) =>
 request({
   'url': `/manage/logout`,
   'method': 'post',
   params
 })

// 分页查询
export const getAdminList = (params: any) =>
  request({
    'url': `/manage/page`,
    'method': 'get',
    'params': params
  })

//  启用/禁用
export const startOrStopAdmin = (params: any) =>
  request({
    'url': `/manage/status/${params.status}`,
    'method': 'post',
    'params': {id: params.id}
  })

//新增管理员
export const addAdmin = (data: any) =>
  request({
    'url': '/manage',
    'method': 'post',
    data: data
  })

//根据id查询管理员
export const getAdminById = (id: number) =>
  request({
    'url': `/manage/${id}`,
    'method': 'get'
  })

//修改管理员
export const updateAdmin = (data: any) =>
  request({
    'url': '/manage',
    'method': 'put',
    data: data
  })
