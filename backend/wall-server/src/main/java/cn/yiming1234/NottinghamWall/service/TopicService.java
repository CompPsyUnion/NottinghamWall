package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.TopicPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;

public interface TopicService {
    /**
     * 添加话题
     * @param topicDTO
     */
    void addTopic(TopicDTO topicDTO);

    /**
     * 删除话题
     * @param id
     */
    void deleteTopic(String id);

    /**
     * 分页查询话题
     * @param topicPageQueryDTO
     * @return
     */
    PageResult pageQuery(TopicPageQueryDTO topicPageQueryDTO);

    /**
     * 根据id获取话题
     * @param id
     * @return
     */
    Topic getTopicById(String id);

    /**
     * 点赞话题
     * @param id
     */
    void likeTopic(String id, String userId);

    /**
     * 取消点赞话题
     * @param id
     * @param userId
     */
    void unlikeTopic(String id, String userId);

    /**
     * 判断是否点赞话题
     * @param id
     * @param userId
     * @return
     */
    Boolean isLikeTopic(String id, String userId);

    /**
     * 获取点赞计数
     * @param id
     * @return
     */
    int getLikeCount(String id);

    /**
     * 收藏话题
     * @param id
     * @param userId
     */
    void collectTopic(String id, String userId);

    /**
     * 取消收藏话题
     * @param id
     * @param userId
     */
    void uncollectTopic(String id, String userId);

    /**
     * 判断是否收藏话题
     * @param id
     * @param userId
     * @return
     */
    Boolean isCollectTopic(String id, String userId);

    /**
     * 获取收藏计数
     * @param id
     * @return
     */
    int getCollectCount(String id);
}
