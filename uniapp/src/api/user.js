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

/**
 * 获取用户信息
 */
export const getUserInfo = (authorID) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/info/${authorID}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    resolve({ nickname: "匿名用户", avatar: "" });
                }
            },
            fail: (err) => {
                console.error(`获取用户信息失败 authorID: ${authorID}`, err);
                resolve({ nickname: "匿名用户", avatar: "" });
            },
        });
    });
};
