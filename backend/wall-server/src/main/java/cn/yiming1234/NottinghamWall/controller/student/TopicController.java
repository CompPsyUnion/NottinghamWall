package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.constant.JwtClaimsConstant;
import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.TopicPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.properties.JwtProperties;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.TopicService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import cn.yiming1234.NottinghamWall.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/student")
@Api(tags = "用户端话题接口")
@Slf4j
public class TopicController {

    private final TopicService topicService;
    private final AliOssUtil aliOssUtil;
    private final JwtProperties jwtProperties;

    @Autowired
    public TopicController(TopicService topicService, AliOssUtil aliOssUtil, JwtProperties jwtProperties) {
        this.topicService = topicService;
        this.aliOssUtil = aliOssUtil;
        this.jwtProperties = jwtProperties;
    }

    /**
     * 从请求头中提取用户id
     * @param request
     * @return
     */
    private Long extractUserId(HttpServletRequest request) {
        return getaLong(request, jwtProperties, log);
    }

    static Long getaLong(HttpServletRequest request, JwtProperties jwtProperties, Logger log) {
        String token = request.getHeader(jwtProperties.getUserTokenName());
        if (token == null || token.trim().isEmpty()) {
            log.error("JWT token is missing in the request header.");
            throw new IllegalArgumentException("JWT token is missing.");
        }
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前用户id:{}", userId);
        return userId;
    }

    /**
     * 创建话题
     */
    @PostMapping("/post/topic")
    @ApiOperation(value = "创建话题")
    public Result<Void> createTopic(@RequestBody TopicDTO topicDTO, HttpServletRequest request) {
        log.info("创建话题：{}", topicDTO);
        Integer userId = Math.toIntExact(extractUserId(request));
        topicDTO.setAuthorID(userId);
        topicService.addTopic(topicDTO);
        return Result.success(null);
    }

    /**
     * 删除话题
     */
    @DeleteMapping("/delete/topic/{id}")
    @ApiOperation(value = "删除话题")
    public Result<Void> deleteTopic(@PathVariable String id) {
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
        log.info("获取话题列表：{}", topicPageQueryDTO);
        PageResult pageResult = topicService.pageQuery(topicPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 根据id获取话题详情
     */
    @GetMapping("/topic/{id}")
    @ApiOperation(value = "根据id获取话题详情")
    public Result<Topic> getTopicById(@PathVariable String id) {
        log.info("获取话题详情：{}", id);
        Topic topic = topicService.getTopicById(id);
        return Result.success(topic);
    }

    /**
     * 点赞话题
     */
    @PostMapping("/like/topic/{id}")
    @ApiOperation(value = "点赞话题")
    public Result<Void> likeTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("点赞话题：{}", id);
        Long userId = extractUserId(request);
        topicService.likeTopic(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 取消点赞话题
     */
    @PostMapping("/unlike/topic/{id}")
    @ApiOperation(value = "取消点赞话题")
    public Result<Void> unlikeTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("取消点赞话题：{}", id);
        Long userId = extractUserId(request);
        topicService.unlikeTopic(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 是否点赞话题
     */
    @GetMapping("/islike/topic/{id}")
    @ApiOperation(value = "是否点赞话题")
    public Result<Boolean> isLikeTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("检查是否点赞话题：{}", id);
        Long userId = extractUserId(request);
        Boolean isLike = topicService.isLikeTopic(id, String.valueOf(userId));
        return Result.success(isLike);
    }

    /**
     * 获取点赞计数
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
    public Result<Void> collectTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("收藏话题：{}", id);
        Long userId = extractUserId(request);
        topicService.collectTopic(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 取消收藏话题
     */
    @PostMapping("/uncollect/topic/{id}")
    @ApiOperation(value = "取消收藏话题")
    public Result<Void> uncollectTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("取消收藏话题：{}", id);
        Long userId = extractUserId(request);
        topicService.uncollectTopic(id, String.valueOf(userId));
        return Result.success(null);
    }

    /**
     * 是否收藏话题
     */
    @GetMapping("/iscollect/topic/{id}")
    @ApiOperation(value = "是否收藏话题")
    public Result<Boolean> isCollectTopic(@PathVariable String id, HttpServletRequest request) {
        log.info("检查是否收藏话题：{}", id);
        Long userId = extractUserId(request);
        Boolean isCollect = topicService.isCollectTopic(id, String.valueOf(userId));
        return Result.success(isCollect);
    }

    /**
     * 获取收藏计数
     */
    @GetMapping("/collect/count/{id}")
    @ApiOperation(value = "获取收藏计数")
    public Result<Integer> getCollectCount(@PathVariable String id) {
        log.info("获取收藏计数：{}", id);
        int count = topicService.getCollectCount(id);
        return Result.success(count);
    }

}
