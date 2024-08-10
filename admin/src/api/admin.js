// `src/api/admin.js` 文件
import request from '@/utils/request';
import {useAdminStore} from '@/store/admin';
import {useTokenStore} from '@/store/token';

// 提供调用登录接口的函数
export const userLoginService = (LoginData) => {
    console.log('Login request initiated'); // 添加日志
    // 发送 JSON 格式的请求体
    return request.post('/admin/manage/login', LoginData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Login response received', response); // 添加日志
        const tokenStore = useTokenStore();
        const adminStore = useAdminStore();
        tokenStore.setToken(response.data.token);
        adminStore.setAdmin(response.data.userName);
        return response;
    }).catch(error => {
        console.error('Login request failed', error); // 添加日志
        throw error;
    });
};

// 提供调用获取管理员列表接口的函数
export const getAdminList = (params) => {
    console.log('Fetching admin list'); // 添加日志
    // 发送 GET 请求，包含分页参数
    return request.get('/admin/manage/page', {params}).then(response => {
        console.log('Admin list response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Fetching admin list failed', error); // 添加日志
        throw error;
    });
};

// 提供调用调整管理员状态接口的函数
export const statusChangeAdmin = (id, status) => {
    console.log('Start or stop admin'); // 添加日志
    // 发送 GET 请求，包含分页参数
    return request.post(`/admin/manage/status/${status}`, null, {
        params: {id},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Start or stop admin response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Start or stop admin failed', error); // 添加日志
        throw error;
    });
}

// 提供调用更新员工信息接口的函数
export const updateAdmin = (adminData) => {
    console.log('Update admin info'); // 添加日志

    // 发送 PUT 请求，包含 JSON 格式的请求体
    return request.put('/admin/manage', adminData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Update admin info response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Update admin info failed', error); // 添加日志
        throw error;
    });
};

// 提供调用添加员工接口的函数
export const addAdmin = (adminData) => {
    console.log('Add admin'); // 添加日志

    // 发送 POST 请求，包含 JSON 格式的请求体
    return request.post('/admin/manage', adminData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Add admin response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Add admin failed', error); // 添加日志
        throw error;
    });
};

// 提供调用根据id查询员工接口的函数
export const getAdminById = (id) => {
    console.log('Query admin by id'); // 添加日志

    // 发送 GET 请求，包含 id 参数
    return request.get(`/admin/manage/${id}`, {
        params: {id}
    }).then(response => {
        console.log('Query admin by id response received', response); // 添加日志
        return response;
    }).catch(error => {
        console.error('Query admin by id failed', error); // 添加日志
        throw error;
    });
}

// 提供调用登出接口的函数
export const userLogoutService = () => {
    console.log('Logout request initiated'); // 添加日志

    // 发送 POST 请求
    return request.post('/admin/manage/logout', null, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Logout response received', response); // 添加日志
        const adminStore = useAdminStore();
        const tokenStore = useTokenStore();
        adminStore.clearAdmin();
        tokenStore.removeToken();
        return response;
    }).catch(error => {
        console.error('Logout request failed', error); // 添加日志
        throw error;
    });
}

// 提供调用删除员工接口的函数

// 提供调用修改密码接口的函数
// TODO: 添加修改密码接口函数
