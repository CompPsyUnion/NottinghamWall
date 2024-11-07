package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {

    /**
     * 评论话题
     *
     * @param commentDTO
     */
    void commentTopic(CommentDTO commentDTO);

    /**
     * 回复评论
     *
     * @param commentDTO
     */
    void replyComment(CommentDTO commentDTO);

    /**
     * 删除评论
     *
     * @param commentId
     * @param userId
     */
    void deleteComment(@Param("commentId") String commentId, @Param("userId") Long userId);

    /**
     * 点赞评论
     *
     * @param commentId
     * @param userId
     */
    void likeComment(@Param("commentId") String commentId, @Param("userId") Long userId);

    /**
     * 取消点赞评论
     *
     * @param commentId
     * @param userId
     */
    void unlikeComment(@Param("commentId") String commentId, @Param("userId") Long userId);

    /**
     * 判断是否点赞评论
     *
     * @param commentId
     * @param userId
     * @return
     */
    Boolean isLikeComment(@Param("commentId") String commentId, @Param("userId") Long userId);

    /**
     * 获取评论列表
     *
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
     * 获取评论详情
     *
     * @param commentId
     * @return
     */
    CommentDTO getCommentById(@Param("commentId") String commentId);
}
