package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

import java.util.List;

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
     * 判断是否点赞评论
     */
    Boolean isLikeComment(Integer commentId, Integer userId);

    /**
     * 获取点赞评论计数
     */
    int getLikeCommentCount(Integer id);

    /**
     * 获取评论列表
     */
    PageInfo<CommentDTO> getComments(Integer topicId, int page, int pageSize);

    /**
     * 获取评论计数
     */
    int getCommentCount(Integer id);

    /**
     * 根据Id查看评论
     */
    CommentDTO getCommentById(Integer commentId);

}
