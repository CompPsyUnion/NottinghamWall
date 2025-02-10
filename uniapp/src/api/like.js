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
