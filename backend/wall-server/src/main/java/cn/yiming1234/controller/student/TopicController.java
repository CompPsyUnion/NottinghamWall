package cn.yiming1234.controller.student;


import cn.yiming1234.constant.JwtClaimsConstant;
import cn.yiming1234.dto.TopicDTO;
import cn.yiming1234.properties.JwtProperties;
import cn.yiming1234.result.Result;
import cn.yiming1234.service.TopicService;
import cn.yiming1234.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

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
}
