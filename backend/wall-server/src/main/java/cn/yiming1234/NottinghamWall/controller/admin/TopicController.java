package cn.yiming1234.NottinghamWall.controller.admin;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.CommentService;
import cn.yiming1234.NottinghamWall.service.TopicService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("adminTopicController")
@RequestMapping("/admin/topic")
@ApiOperation("管理端话题接口")
@Slf4j
public class TopicController {

    private final TopicService topicService;
    private final CommentService commentService;
    private final AliOssUtil aliOssUtil;

    @Autowired
    public TopicController(TopicService topicService, CommentService commentService, AliOssUtil aliOssUtil) {
        this.topicService = topicService;
        this.commentService = commentService;
        this.aliOssUtil = aliOssUtil;
    }

    /**
     * 话题分页查询
     */
    @GetMapping("/page")
    @ApiOperation("分页查询话题")
    public Result<PageResult<Topic>> page(PageQueryDTO pageQueryDTO) {
        PageResult<Topic> pageResult = topicService.pageQuery(pageQueryDTO);
        log.info("管理端话题分页查询结果：{}", pageResult);
        return Result.success(pageResult);
    }

    /**
     * 根据话题id获取所有评论
     */
    @GetMapping("/getcomment/{id}")
    @ApiOperation("根据话题id获取评论")
    public Result<PageInfo<CommentDTO>> getComment(@PathVariable Integer id) {
        PageInfo<CommentDTO> comments = commentService.getComments(id, 1, 10);
        log.info("根据话题id获取评论：{}", comments);
        return Result.success(comments);
    }

    /**
     * 根据话题id删除话题
     */
    @DeleteMapping("/delete/{id}")
    @ApiOperation("根据话题id删除话题")
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
}
