package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.TopicPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;

import java.util.List;

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

    /**
     * 评论话题
     * @param commentDTO
     * @return
     */
    void commentTopic(CommentDTO commentDTO);

    /**
     * 获取评论列表
     * @param topicId
     * @return
     */
    List<CommentDTO> getComments(String topicId);

    /**
     * 分页查询评论
     *
     */

    /**
     * 获取评论计数
     * @param id
     * @return
     */
    int getCommentCount(String id);

    /**
     * 点赞评论
     * @param commentId
     * @param userId
     */
    void likeComment(String commentId, String userId);

    /**
     * 取消点赞评论
     * @param id
     * @param s
     */
    void unlikeComment(String id, String s);

    /**
     * 判断是否点赞评论
     * @param id
     * @param s
     */
    Boolean isLikeComment(String id, String s);

    /**
     * 回复评论
     * @param commentDTO
     */
    void replyComment(CommentDTO commentDTO);

    /**
     * 删除评论
     * @param commentId
     * @param userId
     */
    void deleteComment(String commentId, String userId);

    /**
     * 获取评论
     * @param id
     * @return
     */
    CommentDTO getCommentById(String id);

}
