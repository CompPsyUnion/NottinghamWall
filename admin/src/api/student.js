import request from '@/utils/request';
// import {useAdminStore} from '@/store/admin';
// import {useTokenStore} from '@/store/token';
/**
 * 提供调用获取学生列表接口的函数
 */
export const getStudentList = (params) => {
    console.log('Fetching student list');
    return request.get('/admin/student/page', {params}).then(response => {
        console.log('Student list response received', response);
        return response;
    }).catch(error => {
        console.error('Fetching student list failed', error);
        throw error;
    });
};

/**
 * 根据id获取学生信息
 */
export const getStudentById = (id) => {
    console.log('Fetching student info');
    return request.get(`/admin/student/${id}`).then(response => {
        console.log('Student info response received', response);
        return response;
    }).catch(error => {
        console.error('Fetching student info failed', error);
        throw error;
    });
}
