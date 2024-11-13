package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;

public interface TopicService {

    /**
     * 添加话题
     */
    void addTopic(TopicDTO topicDTO);

    /**
     * 删除话题
     */
    void deleteTopic(Integer id);

    /**
     * 新建草稿
     */
    void saveDraft(TopicDTO topicDTO);


    /**
     * 获取草稿
     */
    Topic getDraft(Integer userId);

    /**
     * 删除草稿
     */
    void deleteDraft(Integer id);

    /**
     * 检查是否存在草稿
     */
    Boolean isExistDraft(Integer authorID);

    /**
     * 分页查询话题
     */
    PageResult pageQuery(PageQueryDTO pageQueryDTO);

    /**
     * 根据id获取话题
     */
    Topic getTopicById(Integer id);

    /**
     * 点赞话题
     */
    void likeTopic(Integer id, Integer userId);

    /**
     * 取消点赞话题
     */
    void unlikeTopic(Integer id, Integer userId);

    /**
     * 判断是否点赞话题
     */
    Boolean isLikeTopic(Integer id, Integer userId);

    /**
     * 获取点赞计数
     */
    int getLikeCount(Integer id);

    /**
     * 收藏话题
     */
    void collectTopic(Integer id, Integer userId);

    /**
     * 取消收藏话题
     */
    void uncollectTopic(Integer id, Integer userId);

    /**
     * 判断是否收藏话题
     */
    Boolean isCollectTopic(Integer id, Integer userId);

    /**
     * 获取收藏计数
     */
    int getCollectCount(Integer id);

    // TODO 邮箱功能（获赞评论提醒）
}
