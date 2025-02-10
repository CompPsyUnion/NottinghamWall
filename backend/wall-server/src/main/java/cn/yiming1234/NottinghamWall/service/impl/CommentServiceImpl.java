package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.context.BaseContext;
import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.exception.TeapotException;
import cn.yiming1234.NottinghamWall.mapper.CommentMapper;
import cn.yiming1234.NottinghamWall.mapper.StudentMapper;
import cn.yiming1234.NottinghamWall.service.CommentService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import cn.yiming1234.NottinghamWall.utils.ContentCheckUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;
    private final ContentCheckUtil contentCheckUtil;
    private final StudentServiceImpl studentServiceImpl;
    private final StudentMapper studentMapper;
    private final AliOssUtil aliOssUtil;

    @Autowired
    public CommentServiceImpl(CommentMapper commentMapper, ContentCheckUtil contentCheckUtil, StudentServiceImpl studentServiceImpl, StudentMapper studentMapper, AliOssUtil aliOssUtil) {
        this.commentMapper = commentMapper;
        this.contentCheckUtil = contentCheckUtil;
        this.studentServiceImpl = studentServiceImpl;
        this.studentMapper = studentMapper;
        this.aliOssUtil = aliOssUtil;
    }

    /**
     * 评论话题
     * @param commentDTO 评论DTO
     */
    @Override
    public void commentTopic(CommentDTO commentDTO) {

        boolean isTextContentSafe = contentCheckUtil.checkTextContent(
                commentDTO.getContent(),
                2,
                studentMapper.getOpenidById(commentDTO.getUserId()),
                studentServiceImpl.getAccessToken()
        );
        if (!isTextContentSafe) {
            throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
        }

        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        commentMapper.commentTopic(commentDTO);
    }

    /**
     * 回复评论
     * @param commentDTO 评论DTO
     */
    @Override
    public void replyComment(CommentDTO commentDTO) {
        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        commentMapper.replyComment(commentDTO);
    }

    /**
     * 删除评论
     * @param commentId 评论ID
     * @param userId 用户ID
     */
    @Override
    public void deleteComment(Integer commentId, Integer userId) {
        commentMapper.deleteComment(commentId, userId);
    }

    /**
     * 点赞评论
     * @param commentId 评论ID
     * @param userId 用户ID
     */
    @Override
    public void likeComment(Integer commentId, Integer userId) {
        commentMapper.likeComment(commentId, userId);
    }

    /**
     * 取消点赞评论
     * @param commentId 评论ID
     * @param userId 用户ID
     */
    @Override
    public void unlikeComment(Integer commentId, Integer userId) {
        commentMapper.unlikeComment(commentId, userId);
    }

    /**
     * 管理端获取评论列表
     * （MyBatis PageHelper插件实现）
     * @param topicId 话题ID
     * @param page 页码
     * @param pageSize 每页数量
     * @return 评论列表
     */
    @Override
    public PageInfo<CommentDTO> getComments(Integer topicId, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<CommentDTO> comments = commentMapper.getComments(topicId);
        comments.forEach(comment -> {
            boolean isLiked = commentMapper.isLikeComment(comment.getId(), BaseContext.getCurrentId());
            comment.setIsLiked(isLiked);
        });
        return new PageInfo<>(comments);
    }

    /**
     * 用户端获取评论列表
     * （MyBatis PageHelper插件实现）
     * @param topicId 话题ID
     * @param page 页码
     * @param pageSize 每页数量
     * @return 评论列表
     */
    @Override
    public PageInfo<CommentDTO> getComments(Integer userId, Integer topicId, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<CommentDTO> comments = commentMapper.getComments(topicId);
        comments.forEach(comment -> {
            String username = studentMapper.getById(comment.getUserId()).getUsername();
            String avatar = studentMapper.getById(comment.getUserId()).getAvatar();
            boolean isLiked = commentMapper.isLikeComment(comment.getId(), userId);
            Integer count = commentMapper.getLikeCommentCount(comment.getId());
            comment.setUsername(username);
            comment.setAvatar(aliOssUtil.generatePresignedUrl(avatar));
            comment.setIsLiked(isLiked);
            comment.setLikeCount(count);
        });
        return new PageInfo<>(comments);
    }
}
