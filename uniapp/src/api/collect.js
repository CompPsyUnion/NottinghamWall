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
 * 收藏/取消收藏话题
 */
export const toggleCollect = (topicId, isCollected) => {
    const url = isCollected
        ? `${baseUrl}/student/uncollect/topic/${topicId}`
        : `${baseUrl}/student/collect/topic/${topicId}`;

    return new Promise((resolve, reject) => {
        uni.request({
            url: url,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '操作失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

/**
 * 检查是否已收藏
 */
export const checkIfCollected = (topicId) => {
    return new Promise((resolve) => {
        uni.request({
            url: `${baseUrl}/student/iscollect/topic/${topicId}`,
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
                console.error("检查是否已收藏失败:", err);
                resolve(false);
            },
        });
    });
};

/**
 * 获取收藏计数
 */
export const fetchCollectCount = (topicId) => {
    return new Promise((resolve) => {
        uni.request({
            url: `${baseUrl}/student/collect/count/${topicId}`,
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
                console.error("获取收藏计数失败:", err);
                resolve(0);
            },
        });
    });
};