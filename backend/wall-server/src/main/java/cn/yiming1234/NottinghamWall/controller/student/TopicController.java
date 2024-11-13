package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.constant.JwtClaimsConstant;
import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
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
     */
    private Integer extractUserId(HttpServletRequest request) {
        return getaLong(request, jwtProperties, log);
    }

    static Integer getaLong(HttpServletRequest request, JwtProperties jwtProperties, Logger log) {
        String token = request.getHeader(jwtProperties.getUserTokenName());
        if (token == null || token.trim().isEmpty()) {
            log.error("JWT token is missing in the request header.");
            throw new IllegalArgumentException("JWT token is missing.");
        }
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Integer userId = (Integer) claims.get(JwtClaimsConstant.USER_ID);
        log.info("当前用户id:{}", userId);
        return userId;
    }

    /**
     * 创建话题
     */
    @PostMapping("/post/topic")
    @ApiOperation(value = "创建话题")
    public Result<Void> createTopic(@RequestBody TopicDTO topicDTO, HttpServletRequest request) {
        Integer userId = Math.toIntExact(extractUserId(request));
        topicDTO.setAuthorID(userId);
        topicService.addTopic(topicDTO);
        log.info("提交话题或草稿：{}", topicDTO);
        return Result.success(null);
    }

    /**
     * 删除话题
     */
    @DeleteMapping("/delete/topic/{id}")
    @ApiOperation(value = "删除话题")
    public Result<Void> deleteTopic(@PathVariable Integer id) {
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
     * 新建草稿
     */
    @PostMapping("/save/draft")
    @ApiOperation(value = "新建草稿")
    public Result<Void> saveDraft(@RequestBody TopicDTO topicDTO, HttpServletRequest request) {
        Integer userId = extractUserId(request);
        topicDTO.setAuthorID(userId);
        topicService.saveDraft(topicDTO);
        log.info("新建草稿：{}", topicDTO);
        return Result.success(null);
    }

    /**
     * 获取草稿
     */
    @GetMapping("/get/draft")
    @ApiOperation(value = "获取草稿")
    public Result<Topic> getDraft(HttpServletRequest request) {
        log.info("获取草稿");
        Integer userId = extractUserId(request);
        Topic draft = topicService.getDraft(userId);
        return Result.success(draft);
    }

    /**
     * 删除草稿
     */
    @DeleteMapping("/delete/draft/{id}")
    @ApiOperation(value = "删除草稿")
    public Result<Void> deleteDraft(@PathVariable Integer id) {
        log.info("删除草稿：{}", id);
        topicService.deleteDraft(id);
        return Result.success(null);
    }

    /**
     * 检查是否存在草稿
     */
    @GetMapping("/isexist/draft")
    @ApiOperation(value = "检查是否存在草稿")
    public Result<Boolean> isExistDraft(HttpServletRequest request) {
        log.info("检查是否存在草稿");
        Integer userId = extractUserId(request);
        Boolean isExist = topicService.isExistDraft(userId);
        return Result.success(isExist);
    }

    /**
     * 实现话题无限滚动
     */
    @GetMapping("/get/topic")
    @ApiOperation(value = "实现话题无限滚动")
    public Result<PageResult> getTopic(PageQueryDTO pageQueryDTO) {
        log.info("获取话题列表：{}", pageQueryDTO);
        PageResult pageResult = topicService.pageQuery(pageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 根据id获取话题详情
     */
    @GetMapping("/topic/{id}")
    @ApiOperation(value = "根据id获取话题详情")
    public Result<Topic> getTopicById(@PathVariable Integer id) {
        log.info("获取话题详情：{}", id);
        Topic topic = topicService.getTopicById(id);
        return Result.success(topic);
    }

    /**
     * 点赞话题
     */
    @PostMapping("/like/topic/{id}")
    @ApiOperation(value = "点赞话题")
    public Result<Void> likeTopic(@PathVariable Integer id, HttpServletRequest request) {
        log.info("点赞话题：{}", id);
        Integer userId = extractUserId(request);
        topicService.likeTopic(id, userId);
        return Result.success(null);
    }

    /**
     * 取消点赞话题
     */
    @PostMapping("/unlike/topic/{id}")
    @ApiOperation(value = "取消点赞话题")
    public Result<Void> unlikeTopic(@PathVariable Integer id, HttpServletRequest request) {
        log.info("取消点赞话题：{}", id);
        Integer userId = extractUserId(request);
        topicService.unlikeTopic(id, userId);
        return Result.success(null);
    }

    /**
     * 是否点赞话题
     */
    @GetMapping("/islike/topic/{id}")
    @ApiOperation(value = "是否点赞话题")
    public Result<Boolean> isLikeTopic(@PathVariable Integer id, HttpServletRequest request) {
        log.info("检查是否点赞话题：{}", id);
        Integer userId = extractUserId(request);
        Boolean isLike = topicService.isLikeTopic(id, userId);
        return Result.success(isLike);
    }

    /**
     * 获取点赞计数
     */
    @GetMapping("/like/count/{id}")
    @ApiOperation(value = "获取点赞计数")
    public Result<Integer> getLikeCount(@PathVariable Integer id) {
        log.info("获取点赞计数：{}", id);
        int count = topicService.getLikeCount(id);
        return Result.success(count);
    }

    /**
     * 收藏话题
     */
    @PostMapping("/collect/topic/{id}")
    @ApiOperation(value = "收藏话题")
    public Result<Void> collectTopic(@PathVariable Integer id, HttpServletRequest request) {
        log.info("收藏话题：{}", id);
        Integer userId = extractUserId(request);
        topicService.collectTopic(id, userId);
        return Result.success(null);
    }

    /**
     * 取消收藏话题
     */
    @PostMapping("/uncollect/topic/{id}")
    @ApiOperation(value = "取消收藏话题")
    public Result<Void> uncollectTopic(@PathVariable Integer id, HttpServletRequest request) {
        log.info("取消收藏话题：{}", id);
        Integer userId = extractUserId(request);
        topicService.uncollectTopic(id, userId);
        return Result.success(null);
    }

    /**
     * 是否收藏话题
     */
    @GetMapping("/iscollect/topic/{id}")
    @ApiOperation(value = "是否收藏话题")
    public Result<Boolean> isCollectTopic(@PathVariable Integer id, HttpServletRequest request) {
        log.info("检查是否收藏话题：{}", id);
        Integer userId = extractUserId(request);
        Boolean isCollect = topicService.isCollectTopic(id, userId);
        return Result.success(isCollect);
    }

    /**
     * 获取收藏计数
     */
    @GetMapping("/collect/count/{id}")
    @ApiOperation(value = "获取收藏计数")
    public Result<Integer> getCollectCount(@PathVariable Integer id) {
        log.info("获取收藏计数：{}", id);
        int count = topicService.getCollectCount(id);
        return Result.success(count);
    }

}
