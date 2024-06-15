package cn.yiming1234.controller;


import cn.yiming1234.constant.JwtClaimsConstant;
import cn.yiming1234.dto.StudentLoginDTO;
import cn.yiming1234.entity.Student;
import cn.yiming1234.properties.JwtProperties;
import cn.yiming1234.result.Result;
import cn.yiming1234.service.StudentService;
import cn.yiming1234.utils.JwtUtil;
import cn.yiming1234.vo.StudentLoginVO;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/student/info")
@Slf4j
@ApiOperation(value = "学生信息接口")
public class StudentController {

       @Autowired
       private StudentService studentService;

       @Autowired
         private JwtProperties jwtProperties;
        /**
         * 登录
         *
         * @param studentLoginDTO
         * @return
         */
        @PostMapping("/login")
        @ApiOperation(value = "登录")
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
