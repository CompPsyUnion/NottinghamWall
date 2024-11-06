package cn.yiming1234.mapper;

import cn.yiming1234.annotation.AutoFill;
import cn.yiming1234.dto.CommentDTO;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.enumeration.OperationType;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TopicMapper {

    /**
     * 新增话题
     *
     * @param topic
     */
    @AutoFill(value = OperationType.INSERT)
    void insert(Topic topic);

    /**
     * 分页查询话题
     *
     * @param topicPageQueryDTO
     * @return
     */
    Page<Topic> pageQuery(TopicPageQueryDTO topicPageQueryDTO);

    /**
     * 根据id获取话题
     *
     * @param id
     * @return
     */
    Topic getTopicById(String id);

    /**
     * 点赞话题
     *
     * @param params
     */
    void likeTopic(Map<String, Object> params);

    /**
     * 取消点赞话题
     *
     * @param params
     */
    void unlikeTopic(Map<String, Object> params);

    /**
     * 判断是否点赞话题
     *
     * @param params
     */
    Boolean isLikeTopic(Map<String, Object> params);

    /**
     * 获取点赞计数
     *
     * @param topicId
     * @return
     */
    int getLikeCount(@Param("topicId") String topicId);

    /**
     * 收藏话题
     *
     * @param params
     */
    void collectTopic(Map<String, Object> params);

    /**
     * 取消收藏话题
     *
     * @param params
     */
    void uncollectTopic(Map<String, Object> params);

    /**
     * 判断是否收藏话题
     *
     * @param params
     * @return
     */
    Boolean isCollectTopic(Map<String, Object> params);

    /**
     * 获取收藏计数
     *
     * @param topicId
     * @return
     */
    int getCollectCount(@Param("topicId") String topicId);

    /**
     * 评论话题
     *
     * @param commentDTO
     */
    void commentTopic(CommentDTO commentDTO);

    /**
     * 点赞评论
     *
     * @param params
     */
    void likeComment(Map<String, Object> params);

    /**
     * 取消点赞评论
     *
     * @param params
     */
    void unlikeComment(Map<String, Object> params);

    /**
     * 判断是否点赞评论
     * @param params
     * @return
     */
    Boolean isLikeComment(Map<String, Object> params);

    /**
     * 回复评论
     *
     * @param commentDTO
     */
    void replyComment(CommentDTO commentDTO);

    /**
     * 删除评论
     *
     * @param params
     */
    void deleteComment(Map<String, Object> params);

    /**
     * 根据话题id获取评论
     * @param topicId
     * @return
     */
    List<CommentDTO> getComments(@Param("topicId") String topicId);

    /**
     * 获取评论计数
     *
     * @param topicId
     * @return
     */
    int getCommentCount(@Param("topicId") String topicId);

    /**
     * 删除话题及其相关信息
     * @param id
     */
    void deleteTopic(String id);
    void deleteTopicLikes(String topicId);
    void deleteTopicComments(String topicId);
    void deleteTopicCollections(@Param("topicId") String topicId);

    /**
     * 获取评论
     * @param commentId
     * @return
     */
    CommentDTO getCommentById(String commentId);
}
