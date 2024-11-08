package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface CommentService {
    /**
     * 评论话题
     * @param commentDTO
     */
    void commentTopic(CommentDTO commentDTO);

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
    void deleteComment(String commentId, Long userId);

    /**
     * 点赞评论
     * @param commentId
     * @param userId
     */
    void likeComment(String commentId, Long userId);

    /**
     * 取消点赞评论
     * @param commentId
     * @param userId
     */
    void unlikeComment(String commentId, Long userId);

    /**
     * 判断是否点赞评论
     * @param commentId
     * @param userId
     * @return
     */
    Boolean isLikeComment(String commentId, Long userId);

    /**
     * 获取点赞评论计数
     * @param id
     * @return
     */
    int getLikeCommentCount(String id);

    /**
     * 获取评论列表
     * @param topicId
     * @param page
     * @param pageSize
     * @return
     */
    PageInfo<CommentDTO> getComments(Integer topicId, int page, int pageSize);

    /**
     * 获取评论计数
     * @param id
     * @return
     */
    int getCommentCount(String id);

    /**
     * 根据Id查看评论
     * @param commentId
     * @return
     */
    CommentDTO getCommentById(String commentId);

}
