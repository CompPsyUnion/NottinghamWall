import { baseUrl } from "@/utils/env";

/**
 * 点赞话题
 */
export const likeTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/like/topic/${topicId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '点赞失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

/**
 * 取消点赞话题
 */
export const unlikeTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/unlike/topic/${topicId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '取消点赞失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

/**
 * 检查是否已点赞
 */
export const checkIfLiked = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/islike/topic/${topicId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    resolve(false);
                }
            },
            fail: (err) => {
                console.error("检查是否已点赞失败:", err);
                resolve(false);
            },
        });
    });
};

/**
 * 获取点赞计数
 */
export const fetchLikeCount = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/like/count/${topicId}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data || 0);
                } else {
                    resolve(0);
                }
            },
            fail: (err) => {
                console.error("获取点赞计数失败:", err);
                resolve(0);
            },
        });
    });
};
