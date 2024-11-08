package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.mapper.CommentMapper;
import cn.yiming1234.NottinghamWall.service.CommentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private static final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentMapper commentMapper;

    /**
     * 评论话题
     */
    @Override
    public void commentTopic(CommentDTO commentDTO) {
        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        commentMapper.commentTopic(commentDTO);
    }

    /**
     * 回复评论
     */
    @Override
    public void replyComment(CommentDTO commentDTO) {
        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        commentMapper.replyComment(commentDTO);
    }

    /**
     * 删除评论
     */
    @Override
    public void deleteComment(String commentId, Long userId) {
        commentMapper.deleteComment(commentId, userId);
    }

    /**
     * 点赞评论
     */
    @Override
    public void likeComment(String commentId, Long userId) {
        commentMapper.likeComment(commentId, userId);
    }

    /**
     * 取消点赞评论
     */
    @Override
    public void unlikeComment(String commentId, Long userId) {
        commentMapper.unlikeComment(commentId, userId);
    }

    /**
     * 判断是否点赞评论
     */
    @Override
    public Boolean isLikeComment(String commentId, Long userId) {
        Boolean isLiked = commentMapper.isLikeComment(commentId, userId);
        log.info("用户 {} 是否点赞评论 {}：{}", userId, commentId, isLiked);
        return isLiked;
    }

    /**
     * 获取点赞评论计数
     */
    @Override
    public int getLikeCommentCount(String id) {
        int count = commentMapper.getLikeCommentCount(id);
        log.info("评论 {} 的点赞数：{}", id, count);
        return count;
    }

    /**
     * 获取评论列表
     * （MyBatis PageHelper插件实现）
     */
    @Override
    public PageInfo<CommentDTO> getComments(Integer topicId, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<CommentDTO> comments = commentMapper.getComments(topicId);
        return new PageInfo<>(comments);
    }

    /**
     * 获取评论计数
     */
    @Override
    public int getCommentCount(String id) {
        int count = commentMapper.getCommentCount(id);
        log.info("话题 {} 的评论数：{}", id, count);
        return count;
    }

    /**
     * 根据Id查看评论
     */
    @Override
    public CommentDTO getCommentById(String commentId) {
        return commentMapper.getCommentById(commentId);
    }
}
