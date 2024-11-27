import request from '@/utils/request';
import {useAdminStore} from '@/store/admin';
import {useTokenStore} from '@/store/token';

/**
 * 提供调用登录接口的函数
 */
export const userLoginService = (LoginData) => {
    console.log('Login request initiated');
    return request.post('/admin/manage/login', LoginData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Login response received', response);
        const tokenStore = useTokenStore();
        const adminStore = useAdminStore();
        tokenStore.setToken(response.data.token);
        adminStore.setAdmin(response.data.userName);
        return response;
    }).catch(error => {
        console.error('Login request failed', error);
        throw error;
    });
};

/**
 * 提供调用获取管理员列表接口的函数
 */
export const getAdminList = (params) => {
    console.log('Fetching admin list');
    return request.get('/admin/manage/page', {params}).then(response => {
        console.log('Admin list response received', response);
        return response;
    }).catch(error => {
        console.error('Fetching admin list failed', error);
        throw error;
    });
};

/**
 * 删除管理员
 */
export const statusChangeAdmin = (id, status) => {
    console.log('Start or stop admin');
    return request.post(`/admin/manage/status/${status}`, null, {
        params: {id},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Start or stop admin response received', response);
        return response;
    }).catch(error => {
        console.error('Start or stop admin failed', error);
        throw error;
    });
}

/**
 * 更新管理员信息
 */
export const updateAdmin = (adminData) => {
    console.log('Update admin info');
    return request.put('/admin/manage', adminData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Update admin info response received', response);
        return response;
    }).catch(error => {
        console.error('Update admin info failed', error);
        throw error;
    });
};

/**
 * 添加管理员
 */
export const addAdmin = (adminData) => {
    console.log('Add admin');
    return request.post('/admin/manage', adminData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Add admin response received', response);
        return response;
    }).catch(error => {
        console.error('Add admin failed', error);
        throw error;
    });
};

/**
 * 根据id获取管理员信息
 */
export const getAdminById = (id) => {
    console.log('Query admin by id'); // 添加日志
    return request.get(`/admin/manage/${id}`, {
        params: {id}
    }).then(response => {
        console.log('Query admin by id response received', response);
        return response;
    }).catch(error => {
        console.error('Query admin by id failed', error);
        throw error;
    });
}

/**
 * 提供调用登出接口的函数
 */
export const userLogoutService = () => {
    console.log('Logout request initiated'); // 添加日志
    return request.post('/admin/manage/logout', null, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Logout response received', response);
        const adminStore = useAdminStore();
        const tokenStore = useTokenStore();
        adminStore.clearAdmin();
        tokenStore.removeToken();
        return response;
    }).catch(error => {
        console.error('Logout request failed', error);
        throw error;
    });
}

/**
 * 管理员修改密码
 */
export const changePassword = (passwordData) => {
    console.log('Change password');
    return request.put('/admin/manage/password', passwordData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Change password response received', response);
        return response;
    }).catch(error => {
        console.error('Change password failed', error);
        throw error;
    });
}

// 提供调用删除员工接口的函数
// TODO: 添加删除员工接口函数
