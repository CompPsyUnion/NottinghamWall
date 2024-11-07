package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.properties.JwtProperties;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/student")
@Api(tags = "评论相关接口")
@Slf4j
public class CommentController {

    private final CommentService commentService;
    private final JwtProperties jwtProperties;

    @Autowired
    public CommentController(CommentService commentService, JwtProperties jwtProperties) {
        this.commentService = commentService;
        this.jwtProperties = jwtProperties;
    }

    /**
     * 从请求头中提取用户id
     * @param request
     * @return
     */
    private Long extractUserId(HttpServletRequest request) {
        return getaLong(request, jwtProperties);
    }

    static Long getaLong(HttpServletRequest request, JwtProperties jwtProperties) {
        return TopicController.getaLong(request, jwtProperties, CommentController.log);
    }

    /**
     * 评论话题
     */
    @PostMapping("/comment/topic/{id}")
    @ApiOperation(value = "评论话题")
    public Result<Void> commentTopic(@PathVariable String id, @RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        log.info("评论话题：{}", id);
        Long userId = extractUserId(request);
        commentDTO.setUserId(Math.toIntExact(userId));
        commentDTO.setTopicId(Integer.valueOf(id));
        commentService.commentTopic(commentDTO);
        return Result.success(null);
    }

    /**
     * 回复评论
     */
    // TODO

    /**
     * 删除评论
     */
    @DeleteMapping("/delete/comment/{id}")
    @ApiOperation(value = "删除评论")
    public Result<Void> deleteComment(@PathVariable String id, HttpServletRequest request) {
        log.info("删除评论：{}", id);
        Long userId = extractUserId(request);
        commentService.deleteComment(id, userId);
        return Result.success(null);
    }

    /**
     * 点赞评论
     */
    @PostMapping("/like/comment/{id}")
    @ApiOperation(value = "点赞评论")
    public Result<Void> likeComment(@PathVariable String id, HttpServletRequest request) {
        log.info("点赞评论：{}", id);
        Long userId = extractUserId(request);
        commentService.likeComment(id, userId);
        return Result.success(null);
    }

    /**
     * 取消点赞评论
     */
    @PostMapping("/unlike/comment/{id}")
    @ApiOperation(value = "取消点赞评论")
    public Result<Void> unlikeComment(@PathVariable String id, HttpServletRequest request) {
        log.info("取消点赞评论：{}", id);
        Long userId = extractUserId(request);
        commentService.unlikeComment(id, userId);
        return Result.success(null);
    }

    /**
     * 检查是否点赞评论
     */
    @GetMapping("/islike/comment/{id}")
    @ApiOperation(value = "检查是否点赞评论")
    public Result<Boolean> isLikeComment(@PathVariable String id, HttpServletRequest request) {
        log.info("检查是否点赞评论：{}", id);
        Long userId = extractUserId(request);
        Boolean isLike = commentService.isLikeComment(id, userId);
        return Result.success(isLike);
    }

    /**
     * 获取评论列表
     */
    @GetMapping("/get/comments/{topicId}")
    @ApiOperation(value = "获取评论")
    public Result<List<CommentDTO>> getComments(@PathVariable String topicId) {
        log.info("获取评论列表：{}", topicId);
        List<CommentDTO> comments = commentService.getComments(topicId);
        log.info("评论列表：{}", comments);
        return Result.success(comments);
    }

    /**
     * 实现评论无限滚动
     */
    // TODO

    /**
     * 获取评论计数
     */
    @GetMapping("/comment/count/{id}")
    @ApiOperation(value = "获取评论计数")
    public Result<Integer> getCommentCount(@PathVariable String id) {
        log.info("获取评论计数：{}", id);
        int count = commentService.getCommentCount(id);
        return Result.success(count);
    }
}
