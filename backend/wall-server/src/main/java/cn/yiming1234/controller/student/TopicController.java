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
import cn.yiming1234.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/student")
@Api(tags = "用户端话题接口")
@Slf4j
public class TopicController {

    @Autowired
    private TopicService topicService;

    @Autowired
    private JwtProperties jwtProperties;

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
}
