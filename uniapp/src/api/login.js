import {baseUrl} from "@/utils/env";

/**
 * token校验与续签
 */
// TODO 当前token失效采用每次登录清除上次token的方式，后续可考虑使用refreshToken
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
                    console.log('token is valid', res.data);
                    console.log('-=-=-=-=checkTokenRes-=-=-=');
                } else if (res.data.newToken) {
                    console.log('token已续签:', res.data.newToken);
                    uni.setStorageSync('token', res.data.newToken);
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
