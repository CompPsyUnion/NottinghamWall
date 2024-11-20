package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.constant.JwtClaimsConstant;
import cn.yiming1234.NottinghamWall.dto.StudentDTO;
import cn.yiming1234.NottinghamWall.dto.StudentLoginDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.properties.JwtProperties;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.StudentService;
import cn.yiming1234.NottinghamWall.utils.JwtUtil;
import cn.yiming1234.NottinghamWall.vo.StudentLoginVO;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@Api(tags = "用户端学生接口")
@Slf4j
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * 获取当前学生id
     */
    private Integer getCurrentStudentId(HttpServletRequest request) {
        String token = request.getHeader(jwtProperties.getUserTokenName());
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token is missing");
        }
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        if (claims == null || claims.get(JwtClaimsConstant.USER_ID) == null) {
            throw new IllegalArgumentException("Invalid token or user ID missing in token");
        }
        return (Integer) claims.get(JwtClaimsConstant.USER_ID);
    }

    /**
     * 微信登录
     */
    @PostMapping("/login/login")
    @ApiOperation(value = "微信登录")
    public Result<StudentLoginVO> login(@RequestBody StudentLoginDTO studentLoginDTO){
        log.info("学生登录：{}", studentLoginDTO.getCode());
        Student student = studentService.wxLogin(studentLoginDTO);
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.USER_ID, student.getId());
        String token = JwtUtil.createJWT(jwtProperties.getUserSecretKey(), jwtProperties.getUserTtl(), claims);
        log.info("生成的JWT令牌: {}", token);

        StudentLoginVO studentLoginVO = StudentLoginVO.builder()
                .id(student.getId())
                .openid(student.getOpenid())
                .token(token)
                .build();
        return Result.success(studentLoginVO);
    }

    /**
     * 微信获取手机号
     */
    @PostMapping("/login/getPhoneNumber")
    @ApiOperation(value = "微信获取手机号")
    public Result<String> getPhoneNumber(@RequestParam String code, HttpServletRequest request) throws IOException {
        log.info("获取手机号：{}", code);
        Integer id = getCurrentStudentId(request);
        String phoneNumber = studentService.getPhoneNumber(code, id);
        return Result.success(phoneNumber);
    }

    /**
     * 获取当前用户信息
     */
    @GetMapping("/get/currentUserInfo")
    @ApiOperation(value = "获取当前用户信息")
    public Result<Map<String, Object>> getCurrentUserInfo(HttpServletRequest request) {
        Integer userId = getCurrentStudentId(request);
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", userId);
        return Result.success(userInfo);
    }

    /**
     * 获取学生信息
     */
    @ApiOperation(value = "获取学生信息")
    @GetMapping("/get/info")
    public Result<Student> getStudentInfo(HttpServletRequest request) {
        Integer id = getCurrentStudentId(request);
        Student student = studentService.getById(id);
        return Result.success(student);
    }

    /**
     * 根据id获取学生信息
     */
    @ApiOperation(value = "根据id获取学生信息")
    @GetMapping("/get/info/{id}")
    public Result<Student> getStudentInfoById(@PathVariable Integer id) {
        log.info("根据id获取学生信息：{}", id);
        Student student = studentService.getById(id);
        return Result.success(student);
    }

    /**
     * 根据用户名获取学生信息
     */
    @ApiOperation(value = "根据用户名获取学生信息")
    @GetMapping("/get/info/username/{username}")
    public Result<Student> getStudentInfoByUsername(@PathVariable String username) {
        log.info("根据用户名获取学生信息：{}", username);
        Student student = studentService.getByUsername(username);
        return Result.success(student);
    }

    /**
     * 更新学生信息
     */
    @ApiOperation(value = "更新学生信息")
    @PutMapping("/update/info")
    public Result update(@RequestBody StudentDTO studentDTO, HttpServletRequest request) throws Exception {
        Integer id = getCurrentStudentId(request);
        Student student = studentService.getById(id);
        log.info("当前学生信息:{}", student);
        studentDTO.setId(id);
        studentService.update(studentDTO);
        log.info("更新学生信息:{}", studentDTO);
        return Result.success();
    }

    /**
     * 获取发布的帖子（分页）
     */
    @ApiOperation(value = "获取发布的帖子（分页）")
    @GetMapping("/get/publish")
    public Result<PageResult<Topic>> getPublish(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            HttpServletRequest request
    ) {
        Integer id = getCurrentStudentId(request);
        PageResult<Topic> pageResult = studentService.getPublishedPosts(id, page, pageSize);
        return Result.success(pageResult);
    }

    /**
     * 获取评论的帖子（分页）
     */
    @ApiOperation(value = "获取评论的帖子（分页）")
    @GetMapping("/get/comment")
    public Result<PageResult<Topic>> getComment(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            HttpServletRequest request
    ) {
        Integer id = getCurrentStudentId(request);
        PageResult<Topic> pageResult = studentService.getCommentedPosts(id, page, pageSize);
        return Result.success(pageResult);
    }

    /**
     * 获取收藏的帖子（分页）
     */
    @ApiOperation(value = "获取收藏的帖子（分页）")
    @GetMapping("/get/collect")
    public Result<PageResult<Topic>> getCollect(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            HttpServletRequest request
    ) {
        Integer id = getCurrentStudentId(request);
        PageResult<Topic> pageResult = studentService.getCollectedPosts(id, page, pageSize);
        return Result.success(pageResult);
    }
}
