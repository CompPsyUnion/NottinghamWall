import {baseUrl} from "@/utils/env";

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

export const checkIfCollected = (topicId) => {
    return new Promise((resolve, reject) => {
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

export const fetchCollectCount = (topicId) => {
    return new Promise((resolve, reject) => {
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