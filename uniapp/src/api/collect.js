import { baseUrl } from "@/utils/env";

/**
 * 获取用户收藏的话题
 */
export const fetchCollectedTopics = (page = 1, pageSize = 5) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/collect?page=${page}&pageSize=${pageSize}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token')
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data);
                    console.log('获取收藏话题成功', res.data.data);
                } else {
                    reject(new Error('获取收藏话题失败'));
                }
            },
            fail: (err) => reject(err)
        });
    });
};

/**
 * 收藏话题
 */
export const collectTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/collect/topic/${topicId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '收藏失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

/**
 * 取消收藏话题
 */
export const uncollectTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/uncollect/topic/${topicId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '取消收藏失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};
