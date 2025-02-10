package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import com.github.pagehelper.PageInfo;

public interface CommentService {
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
    void deleteComment(Integer commentId, Integer userId);

    /**
     * 点赞评论
     */
    void likeComment(Integer commentId, Integer userId);

    /**
     * 取消点赞评论
     */
    void unlikeComment(Integer commentId, Integer userId);

    /**
     * 管理端获取评论列表
     */
    PageInfo<CommentDTO> getComments(Integer topicId, int page, int pageSize);

    /**
     * 用户端获取评论列表
     */
    PageInfo<CommentDTO> getComments(Integer userId, Integer topicId, int page, int pageSize);

}
