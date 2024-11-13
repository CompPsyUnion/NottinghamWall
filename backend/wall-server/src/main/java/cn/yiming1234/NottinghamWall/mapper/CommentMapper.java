package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {

    /**
     * 评论话题
     */
    void commentTopic(CommentDTO commentDTO);

    /**
     * 回复评论
     */
    void replyComment(CommentDTO commentDTO);

    /**
     * 删除评论
     */
    void deleteComment(@Param("commentId") Integer commentId, @Param("userId") Integer userId);

    /**
     * 点赞评论
     */
    void likeComment(@Param("commentId") Integer commentId, @Param("userId") Integer userId);

    /**
     * 取消点赞评论
     */
    void unlikeComment(@Param("commentId") Integer commentId, @Param("userId") Integer userId);

    /**
     * 判断是否点赞评论
     */
    Boolean isLikeComment(@Param("commentId") Integer commentId, @Param("userId") Integer userId);

    /**
     * 获取点赞评论计数
     */
    int getLikeCommentCount(Integer id);

    /**
     * 获取评论列表
     */
    List<CommentDTO> getComments(@Param("topicId") Integer topicId);

    /**
     * 获取评论计数
     */
    int getCommentCount(@Param("topicId") Integer topicId);

    /**
     * 获取评论详情
     */
    CommentDTO getCommentById(@Param("commentId") Integer commentId);

    /**
     * 查询用户评论的帖子
     */
    List<Topic> getCommentedPosts(@Param("userId") Integer userId);
}
