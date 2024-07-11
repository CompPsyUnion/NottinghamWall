import request from '@/utils/request'
/**
 *
 * 学生管理
 *
 */
// 分页查询
export const getUserList = (params: any) =>
  request({
    'url': `/student/page`,
    'method': 'get',
    'params': params
  })

//根据id查询管理员
export const getUserById = (id: number) =>
  request({
    'url': `/manage/${id}`,
    'method': 'get'
  })

//根据学号查询学生
export const getUserByStudentId = (id: number) =>
  request({
    'url': `/manage/${id}`,
    'method': 'get'
  })
