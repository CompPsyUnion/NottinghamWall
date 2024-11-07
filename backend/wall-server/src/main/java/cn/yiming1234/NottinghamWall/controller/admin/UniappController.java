package cn.yiming1234.NottinghamWall.controller.admin;

import cn.yiming1234.NottinghamWall.result.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController("adminUniappController")
@RequestMapping("/admin/uniapp")
@Api(tags = "uniapp管理接口")
@Slf4j
public class UniappController {

    public static final String KEY = "uniapp_status";

    @Autowired
    private RedisTemplate redisTemplate;
    /**
     * 设置状态
     *
     * @param status
     * @return
     */
    @PutMapping("/{ststus}")
    @ApiOperation(value = "设置状态")
    public Result setStatus(@PathVariable Integer status) {
        log.info("设置状态：{}", status == 1 ? "开启" : "关闭");
        redisTemplate.opsForValue().set(KEY, status);
        return Result.success();
    }

    /**
     * 管理端获取状态
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
