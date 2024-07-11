package cn.yiming1234.controller.admin;

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

@RestController("adminStudentController")
@RequestMapping("/admin/student")
@Slf4j
@Api(tags = "管理端学生接口")
public class StudentController {

       @Autowired
       private StudentService studentService;

        /**
        * 学生分页查询
        * @param studentPageQueryDTO
        * @return
        */
        @GetMapping("/page")
        @ApiOperation("分页查询学生")
        public Result<PageResult> page(StudentPageQueryDTO studentPageQueryDTO){
            log.info("学生分页查询：{}", studentPageQueryDTO);
            PageResult pageResult = studentService.pageQuery(studentPageQueryDTO);
            return Result.success(pageResult);
        }
        /**
        * 根据id查询学生
        * @param id
        * @return
        */
        @GetMapping("/{id}")
        @ApiOperation("根据id查询学生")
        public Result<Student> getById(Long id){
            Student student = studentService.getById(id);
            return Result.success(student);
        }

        /**
        * 根据学号查询学生
        * @param studentId
        * @return
        */
        @GetMapping("/{studentId}")
        @ApiOperation("根据学号查询学生")
        public Result<Student> getByStudentId(Long studentId){
            Student student = studentService.getByStudentId(studentId);
            return Result.success(student);
        }

        /**
     * 根据邮箱查询学生
     * @param email
     * @return
     */
        @GetMapping("/{email}")
        @ApiOperation("根据邮箱查询学生")
        public  Result<Student> getByEmail(String email){
            Student student = studentService.getByEmail(email);
            return Result.success(student);
        }
}
