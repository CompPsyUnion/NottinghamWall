import request from '@/utils/request';

/**
 * 提供调用获取话题列表接口的函数
 */
export const getTopicList = (params) => {
    console.log('Fetching topic list');
    return request.get('/admin/topic/page', {params}).then(response => {
        console.log('Topic list response received', response);
        return response;
    }).catch(error => {
        console.error('Fetching topic list failed', error);
        throw error;
    });
};
