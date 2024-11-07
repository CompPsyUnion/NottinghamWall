import { baseUrl } from "@/utils/env";

export const fetchComments = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/comments/${topicId}`,
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

export const submitComment = (topicId, content) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/comment/topic/${topicId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            data: { content },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '评论失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

export const deleteComment = (commentId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/delete/comment/${commentId}`,
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '删除评论失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

export const reportComment = (commentId) => {
    // TODO: 实现举报评论的接口
    return Promise.reject('举报功能暂未开放');
};

export const likeComment = (commentId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/like/comment/${commentId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '点赞评论失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

export const unlikeComment = (commentId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/unlike/comment/${commentId}`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.msg);
                } else {
                    reject(res.data.msg || '取消点赞评论失败');
                }
            },
            fail: (err) => reject(err),
        });
    });
};

export const checkIfCommentLiked = (commentId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/islike/comment/${commentId}`,
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
                console.error("检查评论点赞状态失败:", err);
                resolve(false);
            },
        });
    });
};

export const fetchCommentCount = (topicId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/comment/count/${topicId}`,
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
                console.error("获取评论计数失败:", err);
                resolve(0);
            },
        });
    });
};