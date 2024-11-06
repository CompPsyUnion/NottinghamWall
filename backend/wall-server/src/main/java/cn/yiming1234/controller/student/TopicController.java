package cn.yiming1234.controller.student;

import cn.yiming1234.constant.JwtClaimsConstant;
import cn.yiming1234.dto.CommentDTO;
import cn.yiming1234.dto.TopicDTO;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.properties.JwtProperties;
import cn.yiming1234.result.PageResult;
import cn.yiming1234.result.Result;
import cn.yiming1234.service.TopicService;
import cn.yiming1234.utils.AliOssUtil;
import cn.yiming1234.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
@Api(tags = "用户端话题接口")
@Slf4j
public class TopicController {

    private final TopicService topicService;
    private final JwtProperties jwtProperties;
    private final AliOssUtil aliOssUtil;

    @Autowired
    public TopicController(TopicService topicService, JwtProperties jwtProperties, AliOssUtil aliOssUtil) {
        this.topicService = topicService;
        this.jwtProperties = jwtProperties;
        this.aliOssUtil = aliOssUtil;
    }

    /**
     * 获取当前用户信息
     */
    @GetMapping("/get/currentUserInfo")
    @ApiOperation(value = "获取当前用户信息")
    public Result<Map<String, Object>> getCurrentUserInfo(HttpServletRequest request) {
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        String userId = claims.get(JwtClaimsConstant.USER_ID).toString();
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", userId);
        return Result.success(userInfo);
    }

    /**
     * 创建话题
     */
    @PostMapping("/post/topic")
    @ApiOperation(value = "创建话题")
    public Result createTopic(@RequestBody TopicDTO topicDTO, HttpServletRequest request) {
        log.info("创建话题：{}", topicDTO);

        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        String id = String.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        topicDTO.setAuthorID(id);

        topicService.addTopic(topicDTO);
        return Result.success(null);
    }

    /**
     * 删除话题
     */
    @DeleteMapping("/delete/topic/{id}")
    @ApiOperation(value = "删除话题")
    public Result deleteTopic(@PathVariable String id) {
        log.info("删除话题：{}", id);

        Topic topic = topicService.getTopicById(id);
        List<String> imgURLs = topic.getImgURLs();
        for (String imgURL : imgURLs) {
            String objectName = imgURL.substring(imgURL.lastIndexOf("/") + 1);
            aliOssUtil.delete(objectName);
        }
        log.info("删除图片成功");

        topicService.deleteTopic(id);
        return Result.success(null);
    }

    /**
     * 实现话题无限滚动
     */
    @GetMapping("/get/topic")
    @ApiOperation(value = "实现话题无限滚动")
    public Result<PageResult> getTopic(TopicPageQueryDTO topicPageQueryDTO) {
        log.info("实现话题无限滚动：{}", topicPageQueryDTO);
        PageResult pageResult = topicService.pageQuery(topicPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 根据id获取话题详情
     */
    @GetMapping("/topic/{id}")
    @ApiOperation(value = "根据id获取话题详情")
    public Result<Topic> getTopicById(@PathVariable String id) {
        log.info("根据id获取话题详情：{}", id);
        Topic topic = topicService.getTopicById(id);
        return Result.success(topic);
    }

    /**
     * 点赞话题
     */
    @PostMapping("/like/topic/{id}")
    @ApiOperation(value = "点赞话题")
    public Result likeTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("点赞话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long ID = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", id);
        topicService.likeTopic(id, String.valueOf(ID));
        return Result.success(null);
    }

    /**
     * 取消点赞话题
     */
    @PostMapping("/unlike/topic/{id}")
    @ApiOperation(value = "取消点赞话题")
    public Result unlikeTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("取消点赞话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long ID = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", id);
        topicService.unlikeTopic(id, String.valueOf(ID));
        return Result.success(null);
    }

    /**
     * 是否点赞话题
     */
    @GetMapping("/islike/topic/{id}")
    @ApiOperation(value = "是否点赞话题")
    public Result<Boolean> isLikeTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("是否点赞话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long ID = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", id);
        Boolean isLike = topicService.isLikeTopic(id, String.valueOf(ID));
        return Result.success(isLike);
    }

    /**
     * 点赞计数
     */
    @GetMapping("/like/count/{id}")
    @ApiOperation(value = "获取点赞计数")
    public Result<Integer> getLikeCount(@PathVariable String id) {
        log.info("获取点赞计数：{}", id);
        int count = topicService.getLikeCount(id);
        return Result.success(count);
    }

    /**
     * 收藏话题
     */
    @PostMapping("/collect/topic/{id}")
    @ApiOperation(value = "收藏话题")
    public Result collectTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("收藏话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        topicService.collectTopic(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 取消收藏话题
     */
    @PostMapping("/uncollect/topic/{id}")
    @ApiOperation(value = "取消收藏话题")
    public Result uncollectTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("取消收藏话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        topicService.uncollectTopic(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 是否收藏话题
     */
    @GetMapping("/iscollect/topic/{id}")
    @ApiOperation(value = "是否收藏话题")
    public Result<Boolean> isCollectTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("是否收藏话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        Boolean isCollect = topicService.isCollectTopic(id, String.valueOf(userId));
        return Result.success(isCollect);
    }

    /**
     * 收藏计数
     */
    @GetMapping("/collect/count/{id}")
    @ApiOperation(value = "获取收藏计数")
    public Result<Integer> getCollectCount(@PathVariable String id) {
        log.info("获取收藏计数：{}", id);
        int count = topicService.getCollectCount(id);
        return Result.success(count);
    }

    /**
     * 评论话题
     */
    @PostMapping("/comment/topic/{id}")
    @ApiOperation(value = "评论话题")
    public Result commentTopic(@PathVariable String id, @RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        log.info("评论话题：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        String authorID = String.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        commentDTO.setUserId(Integer.valueOf(authorID));
        commentDTO.setTopicId(Integer.valueOf(id));
        commentDTO.setContent(commentDTO.getContent());
        log.info("当前用户id:{}", id);

        topicService.commentTopic(commentDTO);
        return Result.success(null);
    }

    /**
     * 获取所有评论
     */
    @GetMapping("/get/comments/{topicId}")
    @ApiOperation(value = "获取评论")
    public Result getComments(@PathVariable String topicId) {
        log.info("获取评论：{}", topicId);

        List<CommentDTO> comments = topicService.getComments(topicId);
        log.info("评论列表：{}", comments);

        return Result.success(comments);
    }

    /**
     * 分页查询评论
     */
    // TODO

    /**
     * 评论计数
     */
    @GetMapping("/comment/count/{id}")
    @ApiOperation(value = "获取评论计数")
    public Result<Integer> getCommentCount(@PathVariable String id) {
        log.info("获取评论计数：{}", id);
        int count = topicService.getCommentCount(id);
        return Result.success(count);
    }

    /**
     * 点赞评论
     */
    @PostMapping("/like/comment/{id}")
    @ApiOperation(value = "点赞评论")
    public Result likeComment(@PathVariable String id, HttpServletRequest request) {
        log.info("点赞评论：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        topicService.likeComment(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 取消点赞评论
     */
    @PostMapping("/unlike/comment/{id}")
    @ApiOperation(value = "取消点赞评论")
    public Result unlikeComment(@PathVariable String id, HttpServletRequest request) {
        log.info("取消点赞评论：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        topicService.unlikeComment(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 检查是否点赞评论
     */
    @GetMapping("/islike/comment/{id}")
    @ApiOperation(value = "检查是否点赞评论")
    public Result<Boolean> isLikeComment(@PathVariable String id, HttpServletRequest request) {
        log.info("检查是否点赞评论：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        Boolean isLike = topicService.isLikeComment(id, String.valueOf(userId));
        return Result.success(isLike);
    }

    /**
     * 回复评论
     */
    @PostMapping("/reply/comment/{id}")
    @ApiOperation(value = "回复评论")
    public Result replyComment(@PathVariable String id, @RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        log.info("回复评论：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        String userId = String.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        commentDTO.setUserId(Integer.valueOf(userId));
        commentDTO.setParentId(Integer.valueOf(id)); // 设置父评论ID
        // 确保话题ID已设置
        if (commentDTO.getTopicId() == null) {
            // 从父评论中获取话题ID，或者从请求参数中获取
            CommentDTO parentComment = topicService.getCommentById(id);
            commentDTO.setTopicId(parentComment.getTopicId());
        }
        topicService.replyComment(commentDTO);
        return Result.success(null);
    }


    /**
     * 删除评论
     */
    @DeleteMapping("/delete/comment/{id}")
    @ApiOperation(value = "删除评论")
    public Result deleteComment(@PathVariable String id, HttpServletRequest request) {
        log.info("删除评论：{}", id);
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        String userId = String.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        topicService.deleteComment(id, userId);
        return Result.success(null);
    }

    /**
     * 举报话题
     */
    // TODO
}
