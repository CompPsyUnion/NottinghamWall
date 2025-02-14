import { baseUrl } from "@/utils/env";

/**
 * 获取帖子列表（分页）
 */
export const getRecords = (page, token) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/topic?page=${page}&pageSize=10`,
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'token': token
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    reject(res.data.message || '加载失败');
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

/**
 * 上传单个文件
 */
export const uploadSingleFile = (filePath) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: `${baseUrl}/student/common/upload`,
            filePath: filePath,
            name: 'files',
            header: {
                token: uni.getStorageSync('token')
            },
            success: (res) => {
                try {
                    const responseData = JSON.parse(res.data);
                    if (responseData.code === 1) {
                        resolve(responseData.data[0])
                    } else {
                        reject('上传失败: ' + responseData.message);
                    }
                } catch (e) {
                    reject('解析失败');
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

/**
 * 删除单个文件
 */
export const deleteSingleFile = (urlToDelete) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/common/delete`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                token: uni.getStorageSync('token')
            },
            data: JSON.stringify({ url: urlToDelete }),
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(urlToDelete);
                } else {
                    reject('删除失败: ' + res.data.message);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

/**
 * 上传帖子或草稿
 */
export const uploadTopic = (data) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/post/topic`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                token: uni.getStorageSync('token')
            },
            data: JSON.stringify(data),
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(res.data);
                } else {
                    reject(res.data.msg || '发布失败');
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

/**
 * 获取个人发布的帖子列表（分页）
 */
export const getPublishedPosts = (page = 1, pageSize = 5) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/publish?page=${page}&pageSize=${pageSize}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token')
            },
            success: (res) => {
                if (res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    reject(new Error('Failed to fetch published posts'));
                }
            },
            fail: (err) => reject(err)
        });
    });
};

/**
 * 获取帖子详情
 */
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
                if (res.statusCode === 200 && res.data.code === 1) {
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
 * 删除帖子
 */
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

/**
 * 检查是否存在草稿
 */
export const checkDraftExistence = () => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/isexist/draft`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                token: uni.getStorageSync('token')
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(res.data.data);
                    console.log(res.data.data);
                } else {
                    reject('检查草稿失败: ' + res.data.message);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

/**
 * 获取草稿
 */
export const getDraft = () => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/get/draft`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                token: uni.getStorageSync('token')
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    reject('获取草稿失败: ' + res.data.message);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

/**
 * 保存草稿
 */
export const saveDraft = (data) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}/student/save/draft`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                token: uni.getStorageSync('token')
            },
            data: JSON.stringify(data),
            success: (res) => {
                if (res.statusCode === 200 && res.data.code === 1) {
                    resolve(res.data.data);
                } else {
                    reject('保存草稿失败: ' + res.data.message);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};
