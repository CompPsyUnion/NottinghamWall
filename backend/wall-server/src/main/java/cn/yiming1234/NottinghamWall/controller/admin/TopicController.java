package cn.yiming1234.NottinghamWall.controller.admin;

import cn.yiming1234.NottinghamWall.dto.CommentDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.CommentService;
import cn.yiming1234.NottinghamWall.service.TopicService;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("adminTopicController")
@RequestMapping("/admin/topic")
@ApiOperation("管理端话题接口")
@Slf4j
public class TopicController {

    @Autowired
    private TopicService topicService;
    @Autowired
    private CommentService commentService;

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

}
