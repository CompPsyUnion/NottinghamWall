import {baseUrl} from "@/utils/env";

/**
 * 获取用户手机号
 */
export const userGetPhoneService = (code) => {
    console.log('Request initiated');
    console.log(code);
    return new Promise(() => {
        uni.request({
            url: `${baseUrl}/student/login/getPhoneNumber?code=${code.code}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token')
            },
            success: function (res) {
                if (res.statusCode === 200) {
                    console.log('请求成功:', res.data);
                    return res.data.phone;
                } else {
                    console.error('请求失败，状态码:', res.statusCode);
                }
            },
        });
    })
}
