package cn.yiming1234.service;

import cn.yiming1234.dto.CommentDTO;
import cn.yiming1234.dto.TopicDTO;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.result.PageResult;

import java.util.List;

public interface TopicService {
    /**
     * 添加话题
     * @param topicDTO
     */
    void addTopic(TopicDTO topicDTO);

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
     * @param s
     */
    void unlikeTopic(String id, String s);

    /**
     * 判断是否点赞话题
     * @param id
     * @param s
     * @return
     */
    Boolean isLikeTopic(String id, String s);

    /**
     * 评论话题
     * @param commentDTO
     * @return
     */
    void commentTopic(CommentDTO commentDTO);

    /**
     * 获取评论
     * @param topicId
     * @return
     */
    List<CommentDTO> getComments(String topicId);

}
