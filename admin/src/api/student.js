import request from '@/utils/request';
// import {useAdminStore} from '@/store/admin';
// import {useTokenStore} from '@/store/token';

// 提供调用获取学生列表接口的函数
export const getStudentList = (params) => {
    console.log('Fetching student list'); // 添加日志
    // 发送 GET 请求，包含分页参数
    return request.get('/admin/student/page', {params}).then(response => {
        console.log('Student list response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Fetching student list failed', error); // 添加日志
        throw error;
    });
};
