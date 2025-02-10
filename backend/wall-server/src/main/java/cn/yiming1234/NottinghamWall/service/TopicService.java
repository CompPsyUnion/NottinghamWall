package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;

public interface TopicService {

    /**
     * 添加话题
     * @param topicDTO 话题DTO
     */
    void addTopic(TopicDTO topicDTO) throws Exception;

    /**
     * 删除话题
     * @param id 话题id
     */
    void deleteTopic(Integer id);

    /**
     * 新建草稿
     * @param topicDTO 话题DTO
     */
    void saveDraft(TopicDTO topicDTO);

    /**
     * 获取草稿
     * @param userId 用户id
     */
    Topic getDraft(Integer userId);

    /**
     * 删除草稿
     * @param id 话题id
     */
    void deleteDraft(Integer id);

    /**
     * 检查是否存在草稿
     * @param authorID 作者id
     */
    Boolean isExistDraft(Integer authorID);

    /**
     * 管理端分页查询话题
     */
    PageResult<Topic> pageQuery(PageQueryDTO pageQueryDTO);

    /**
     * 用户端分页查询话题
     * @param pageQueryDTO 分页查询DTO
     */
    PageResult<Topic> pageQuery(PageQueryDTO pageQueryDTO, Integer userId);

    /**
     * 根据id获取话题
     * @param id 话题id
     */
    Topic getTopicById(Integer id);

    /**
     * 根据id获取话题
     * @param id 话题id
     */
    Topic getTopicById(Integer id, Integer userId);

    /**
     * 点赞话题
     * @param id 话题id
     * @param userId 用户id
     */
    void likeTopic(Integer id, Integer userId);

    /**
     * 取消点赞话题
     * @param id 话题id
     * @param userId 用户id
     */
    void unlikeTopic(Integer id, Integer userId);

    /**
     * 收藏话题
     * @param id 话题id
     * @param userId 用户id
     */
    void collectTopic(Integer id, Integer userId);

    /**
     * 取消收藏话题
     * @param id 话题id
     * @param userId 用户id
     */
    void uncollectTopic(Integer id, Integer userId);

    // TODO 邮箱功能（获赞评论提醒）
}
