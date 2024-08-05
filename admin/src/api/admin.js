// `src/api/admin.js` 文件
import request from '@/utils/request';

// 提供调用登录接口的函数
export const userLoginService = (loginData) => {
    console.log('Login request initiated'); // 添加日志

    // 发送 JSON 格式的请求体
    return request.post('/admin/manage/login', loginData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Login response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Login request failed', error); // 添加日志
        throw error;
    });
};
