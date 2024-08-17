package cn.yiming1234.controller.student;

import cn.yiming1234.constant.JwtClaimsConstant;
import cn.yiming1234.dto.StudentDTO;
import cn.yiming1234.dto.StudentLoginDTO;
import cn.yiming1234.entity.Student;
import cn.yiming1234.properties.JwtProperties;
import cn.yiming1234.result.Result;
import cn.yiming1234.service.StudentService;
import cn.yiming1234.utils.JwtUtil;
import cn.yiming1234.vo.StudentLoginVO;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/student")
@Api(tags = "用户端学生接口")
@Slf4j
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private StudentCommonController studentCommonController;

    /**
     * 微信登录
     *
     * @param studentLoginDTO
     * @return
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
     * 获取学生信息
     *
     * @return
     */
    @ApiOperation(value = "获取学生信息")
    @GetMapping("/get/info")
    public Result<Student> getStudentInfo(HttpServletRequest request) {
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long id = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前学生id:{}", id);
        Student student = studentService.getById(id);
        return Result.success(student);
    }

    /**
     * 更新学生信息
     *
     * @param studentDTO
     * @return
     */
    @ApiOperation(value = "更新学生信息")
    @PutMapping("/update/info")
    public Result update(@RequestBody StudentDTO studentDTO, HttpServletRequest request){
        String token = request.getHeader(jwtProperties.getUserTokenName());
        Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
        Long id = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
        log.info("当前学生id:{}", id);
        studentDTO.setId(id);
        Student student = studentService.getById(id);
        if (studentDTO.getUsername() == null) {
            studentDTO.setUsername(student.getUsername());
        }
        Student updatedStudent = studentService.update(studentDTO);
        return Result.success(updatedStudent);
    }
}
