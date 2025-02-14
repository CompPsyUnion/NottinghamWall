import { baseUrl } from "@/utils/env";

/**
 * 获取当前用户信息
 */
export const getCurrentUserInfo = () => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/currentUserInfo`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    reject(res.data.msg);
                }
            },
            fail: (err) => reject(err),
        });
    });
};
