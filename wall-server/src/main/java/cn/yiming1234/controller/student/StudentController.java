package cn.yiming1234.controller.student;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;

@Api(tags = "管理端学生接口")
@Slf4j
public class StudentController {

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
