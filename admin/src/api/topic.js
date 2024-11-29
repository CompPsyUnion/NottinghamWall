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

/**
 * 提供删除特定话题的函数
 */
export const deleteTopic = (id) => {
    console.log('Deleting topic', id);
    return request.delete(`/admin/topic/delete/${id}`).then(response => {
        console.log('Topic deleted', response);
        return response;
    }).catch(error => {
        console.error('Deleting topic failed', error);
        throw error;
    });
}
