import { baseUrl } from "@/utils/env";

// export const fetchComments = (topicId) => {
//     return new Promise((resolve, reject) => {
//         uni.request({
//             url: `${baseUrl}/student/get/comments/${topicId}`,
//             method: 'GET',
//             header: {
//                 'Content-Type': 'application/json',
//                 'token': uni.getStorageSync('token'),
//             },
//             success: (res) => {
//                 if (res.data.code === 1) {
//                     resolve(res.data.data);
//                 } else {
//                     reject(res.data.msg);
//                 }
//             },
//             fail: (err) => reject(err),
//         });
//     });
// };

/**
 * 获取评论列表
 */
export const fetchComments = (topicId, page, pageSize) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/comments/${topicId}?page=${page}&pageSize=${pageSize}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data.list);
                } else {
                    reject(res.data.msg);
                }
            },
            fail: (err) => reject(err),
        });
    });
};

/**
 * 提交评论
 */
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

/**
 * 删除评论
 */
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

/**
 * 点赞评论
 */
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

/**
 * 取消点赞评论
 */
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
