package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.constant.JwtClaimsConstant;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.dto.TopicDTO;
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
import java.util.stream.Collectors;

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
     * @param request 请求
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
     * @param topicDTO 话题DTO
     * @param request 请求
     */
    @PostMapping("/post/topic")
    @ApiOperation(value = "创建话题")
    public Result<Void> createTopic(@RequestBody TopicDTO topicDTO, HttpServletRequest request) throws Exception {
        Integer userId = Math.toIntExact(extractUserId(request));
        topicDTO.setAuthorID(userId);

        List<String> imgURLs = topicDTO.getImgURLs();
        List<String> imgNames = imgURLs.stream()
                .map(url -> url.substring(url.lastIndexOf("/") + 1, url.indexOf("?")))
                .collect(Collectors.toList());
        topicDTO.setImgURLs(imgNames);

        topicService.addTopic(topicDTO);
        log.info("提交话题或草稿：{}", topicDTO);
        return Result.success(null);
    }

    /**
     * 删除话题
     * @param id 话题id
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
    public Result<PageResult<Topic>> getTopic(HttpServletRequest request, PageQueryDTO pageQueryDTO) {
        Integer userId = extractUserId(request);
        PageResult<Topic> pageResult = topicService.pageQuery(pageQueryDTO, userId);
        log.info("获取话题列表：{}", pageResult);
        return Result.success(pageResult);
    }

    /**
     * 根据id获取话题详情
     */
    @GetMapping("/topic/{id}")
    @ApiOperation(value = "根据id获取话题详情")
    public Result<Topic> getTopicById(@PathVariable Integer id, HttpServletRequest request) {
        Integer userId = extractUserId(request);
        Topic topic = topicService.getTopicById(id, userId);
        log.info("获取话题详情：{}", topic);
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
}
