import { baseUrl } from "@/utils/env";

export const fetchTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/topic/${topicId}`,
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

export const deleteTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/delete/topic/${topicId}`,
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '删除失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

export const reportTopic = (topicId) => {
    // TODO: 实现举报话题的接口
    return Promise.reject('举报功能暂未开放');
};