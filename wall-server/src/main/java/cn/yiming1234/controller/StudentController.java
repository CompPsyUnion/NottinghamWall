package cn.yiming1234.controller;

import cn.yiming1234.constant.JwtClaimsConstant;
import cn.yiming1234.dto.StudentLoginDTO;
import cn.yiming1234.dto.StudentPageQueryDTO;
import cn.yiming1234.entity.Student;
import cn.yiming1234.properties.JwtProperties;
import cn.yiming1234.result.PageResult;
import cn.yiming1234.result.Result;
import cn.yiming1234.service.StudentService;
import cn.yiming1234.utils.JwtUtil;
import cn.yiming1234.vo.StudentLoginVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/student/manage")
@Slf4j
@Api(tags = "学生管理接口")
public class StudentController {

       @Autowired
       private StudentService studentService;

       @Autowired
         private JwtProperties jwtProperties;
        /**
         * 微信登录
         *
         * @param studentLoginDTO
         * @return
         */
        @PostMapping("/login")
        @ApiOperation(value = "微信登录")
        public Result<StudentLoginVO> login(@RequestBody StudentLoginDTO studentLoginDTO){
            log.info("学生登录：{}", studentLoginDTO.getCode());
            Student student = studentService.wxLogin(studentLoginDTO);
            Map<String, Object> claims = new HashMap<>();
            claims.put(JwtClaimsConstant.USER_ID, student.getId());
            String token = JwtUtil.createJWT(jwtProperties.getUserSecretKey(), jwtProperties.getUserTtl(), claims);

            StudentLoginVO studentLoginVO = StudentLoginVO.builder()
                    .id(student.getId())
                    .openid(student.getOpenid())
                    .token(token)
                    .build();
            return Result.success(studentLoginVO);
        }
        /**
        * 用户分页查询
        * @param studentPageQueryDTO
        * @return
        */
        @GetMapping("/page")
        @ApiOperation("分页查询用户")
        public Result<PageResult> page(StudentPageQueryDTO studentPageQueryDTO){
            log.info("用户分页查询：{}", studentPageQueryDTO);
            PageResult pageResult = studentService.pageQuery(studentPageQueryDTO);
            return Result.success(pageResult);
        }
        /**
        * 根据id查询用户
        * @param id
        * @return
        */
        @GetMapping("/{id}")
        @ApiOperation("根据id查询用户")
        public Result<Student> getById(Long id){
            Student student = studentService.getById(id);
            return Result.success(student);
        }
        /**
         * 获取学生信息
         *
         * @return
         */
        @ApiOperation(value = "获取学生信息")
        @RequestMapping("/get")
        public String getStudentInfo() {
            //TODO 获取学生信息
            log.info("获取学生信息");
            return "获取学生信息";
        }
}
