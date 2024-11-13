package cn.yiming1234.NottinghamWall.controller.admin;

import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.ReportService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("adminReportController")
@RequestMapping("/admin")
@ApiOperation("管理端举报接口")
@Slf4j
public class ReportController {

    @Autowired
    private ReportService reportService;

    /**
     * 举报分页查询
     */
    @GetMapping("/page")
    @ApiOperation("分页查询举报")
    public Result<PageResult> page(PageQueryDTO pageQueryDTO) {
        log.info("举报分页查询：{}", pageQueryDTO);
        PageResult pageResult = reportService.pageQuery(pageQueryDTO);
        return Result.success(pageResult);
    }

}
