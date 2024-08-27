import {baseUrl} from "@/utils/env";

// 提供调用登录接口的函数
export const userLoginService = (LoginData) => {
    console.log('Login request initiated'); // 添加日志
    // 发送 JSON 格式的请求体
    return new Promise(() => {
        uni.request({
            url: baseUrl + '/student/login/login',
            method: 'POST',
            header: {
                'Content-Type': 'application/json' // 请求头部
            },
            data: JSON.stringify(LoginData),
            success: function (res) {
                // 请求成功的回调
                if (res.statusCode === 200) {
                    console.log('请求成功:', res.data);
                    uni.setStorageSync('token', res.data.data.token);
                    // store.setSessionId(store.sessionId);
                    // store.init();
                    console.log(uni.getStorageSync('token'));
                    console.log('-=-=-=-=loginRes-=-=-=');
                } else {
                    console.error('请求失败，状态码:', res.statusCode);
                }
            },
            fail: function (error) {
                // 请求失败的回调
                console.error('请求失败:', error);
            }
        });

    })
}
