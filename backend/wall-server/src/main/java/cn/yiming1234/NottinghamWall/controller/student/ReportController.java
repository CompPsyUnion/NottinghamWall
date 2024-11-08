package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.dto.ReportDTO;
import cn.yiming1234.NottinghamWall.service.ReportService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@Api(tags = "举报相关接口")
@Slf4j
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/report/insert")
    public ResponseEntity<String> insertReport(@RequestBody ReportDTO reportDTO) {
        try {
            reportService.insertReport(reportDTO);
            log.info("举报成功:{}", reportDTO);
            return ResponseEntity.ok("举报成功");
        } catch (IllegalArgumentException e) {
            log.warn("举报失败: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("举报失败: " + e.getMessage());
        }
    }

}
