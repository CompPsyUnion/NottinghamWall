// 定制请求的实例
import axios from 'axios';
import { useTokenStore } from '@/store/token';

const instance = axios.create({
    baseURL: '/api',
    timeout: 600000
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        console.log('Sending request:', config); // 添加日志
        const tokenStore = useTokenStore();
        if (tokenStore.token) {
            config.headers.token = tokenStore.token;
        } else if (!tokenStore.token && config.url !== '/student/manage/login') {
            uni.navigateTo({
                url: '/pages/transition/Login'
            });
            return Promise.reject(new Error('No token'));
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        console.log('Received response:', result); // 添加日志
        // 判断业务状态码
        if (result.data.code === 1) {
            return result.data;
        }
        // 操作失败
        ElMessage.error(result.data.msg ? result.data.msg : '服务异常');
        // 异步操作的状态转换为失败
        return Promise.reject(result.data);
    },
    err => {
        // 判断响应状态码, 如果为401, 则证明未登录, 提示请登录, 并跳转到登录页面
        if (err.response.status === 401) {
            ElMessage.error('请先登录');
            uni.navigateTo({
                url: '/pages/transition/Login'
            });
        } else {
            ElMessage.error('服务异常');
        }
        return Promise.reject(err); // 异步的状态转化成失败的状态
    }
);

export default instance;
