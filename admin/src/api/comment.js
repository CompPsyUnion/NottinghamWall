import request from '@/utils/request';

/**
 * 根据话题获取评论列表
 */
export function getCommentListByTopicId(topicId) {
    console.log('Fetching comment');
    return request({
        url: `/admin/topic/getcomment/${topicId}`,
        method: 'get'
    }).catch(error => {
            console.error('Fetching comment failed', error);
            throw error;
        }
    )
}
