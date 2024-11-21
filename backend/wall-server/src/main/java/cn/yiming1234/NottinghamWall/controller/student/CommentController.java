package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.properties.JwtProperties;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.CommentService;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/student")
@Api(tags = "用户端评论接口")
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
     */
    private Integer extractUserId(HttpServletRequest request) {
        return getaLong(request, jwtProperties);
    }

    static Integer getaLong(HttpServletRequest request, JwtProperties jwtProperties) {
        return TopicController.getaLong(request, jwtProperties, CommentController.log);
    }

    /**
     * 评论话题
     */
    @PostMapping("/comment/topic/{id}")
    @ApiOperation(value = "评论话题")
    public Result<Void> commentTopic(@PathVariable Integer id, @RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        log.info("评论话题：{}", id);
        Integer userId = extractUserId(request);
        commentDTO.setUserId(Math.toIntExact(userId));
        commentDTO.setTopicId(id);
        commentService.commentTopic(commentDTO);
        return Result.success(null);
    }

    // TODO 回复评论

    /**
     * 删除评论
     */
    @DeleteMapping("/delete/comment/{id}")
    @ApiOperation(value = "删除评论")
    public Result<Void> deleteComment(@PathVariable Integer id, HttpServletRequest request) {
        log.info("删除评论：{}", id);
        Integer userId = extractUserId(request);
        commentService.deleteComment(id, userId);
        return Result.success(null);
    }

    /**
     * 点赞评论
     */
    @PostMapping("/like/comment/{id}")
    @ApiOperation(value = "点赞评论")
    public Result<Void> likeComment(@PathVariable Integer id, HttpServletRequest request) {
        log.info("点赞评论：{}", id);
        Integer userId = extractUserId(request);
        commentService.likeComment(id, userId);
        return Result.success(null);
    }

    /**
     * 取消点赞评论
     */
    @PostMapping("/unlike/comment/{id}")
    @ApiOperation(value = "取消点赞评论")
    public Result<Void> unlikeComment(@PathVariable Integer id, HttpServletRequest request) {
        log.info("取消点赞评论：{}", id);
        Integer userId = extractUserId(request);
        commentService.unlikeComment(id, userId);
        return Result.success(null);
    }

    /**
     * 检查是否点赞评论
     */
    @GetMapping("/islike/comment/{id}")
    @ApiOperation(value = "检查是否点赞评论")
    public Result<Boolean> isLikeComment(@PathVariable Integer id, HttpServletRequest request) {
        log.info("检查是否点赞评论：{}", id);
        Integer userId = extractUserId(request);
        Boolean isLike = commentService.isLikeComment(id, userId);
        return Result.success(isLike);
    }

    /**
     * 获取评论点赞计数
     */
    @GetMapping("/like/comment/count/{id}")
    @ApiOperation(value = "获取评论点赞计数")
    public Result<Integer> getLikeCommentCount(@PathVariable Integer id) {
        log.info("获取评论点赞计数：{}", id);
        int count = commentService.getLikeCommentCount(id);
        return Result.success(count);
    }

    /**
     * 获取指定话题的所有评论，并进行分页处理。
     *
     * @param topicId  话题ID
     * @param page     页码（从1开始）
     * @param pageSize 每页大小
     * @return Result 包含分页后的评论列表
     */
    @GetMapping("/get/comments/{topicId}")
    @ApiOperation(value = "获取评论")
    public Result<PageInfo<CommentDTO>> getComments(
            @PathVariable Integer topicId,
            @RequestParam() int page,
            @RequestParam() int pageSize
    ) {
        log.info("获取评论列表：topicId={}, page={}, pageSize={}", topicId, page, pageSize);
        PageInfo<CommentDTO> comments = commentService.getComments(topicId, page, pageSize);
        log.info("评论列表：{}", comments);
        log.info("评论列表大小：{}", comments.getList().size());
        return Result.success(comments);

    }

    /**
     * 获取评论计数
     */
    @GetMapping("/comment/count/{id}")
    @ApiOperation(value = "获取评论计数")
    public Result<Integer> getCommentCount(@PathVariable Integer id) {
        log.info("获取评论计数：{}", id);
        int count = commentService.getCommentCount(id);
        return Result.success(count);
    }
}
