package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.result.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController("studentUniappController")
@RequestMapping("/student/uniapp")
@Api(tags = "uniapp管理接口")
@Slf4j
public class UniappController {

    public static final String KEY = "uniapp_status";

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 学生端获取状态
     *
     * @return
     */
    @GetMapping("/status")
    @ApiOperation(value = "获取状态")
    public Result<Integer> getStatus() {
        Integer status = (Integer) redisTemplate.opsForValue().get(KEY);
        log.info("获取状态：{}", status == 1 ? "运行中" : "维护中");
        return Result.success(status);
    }
}
