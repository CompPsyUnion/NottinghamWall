import {baseUrl} from "@/utils/env";

/**
 * token校验与续签
 */
export const checkTokenService = () => {
    return new Promise(() => {
        uni.request({
            url: baseUrl + '/student/login/checkToken',
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token')
            },
            success: function (res) {
                if (res.statusCode === 200) {
                    console.log('请求成功:', res.data);
                    if (res.data.message === 'Token is valid') {
                        console.log('Token is valid');
                    } else {
                        uni.setStorageSync('token', res.data.newToken);
                    }
                    console.log('-=-=-=-=checkTokenRes-=-=-=');
                } else {
                    console.error('请求错误:');
                }
            },
            fail: function (error) {
                console.error('请求失败:', error);
            }
        });

    })
}

/**
 * 用户登录
 */
export const userLoginService = (LoginData) => {
    return new Promise(() => {
        uni.request({
            url: baseUrl + '/student/login/login',
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(LoginData),
            success: function (res) {
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
                console.error('请求失败:', error);
            }
        });

    })
}
