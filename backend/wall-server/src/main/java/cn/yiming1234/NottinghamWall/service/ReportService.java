package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.ReportDTO;
import cn.yiming1234.NottinghamWall.dto.ReportPageQueryDTO;
import cn.yiming1234.NottinghamWall.result.PageResult;

public interface ReportService {

    /**
     * 创建举报
     */
    void insertReport(ReportDTO reportDTO);

    /**
     * 分页查询举报
     */
    PageResult pageQuery(ReportPageQueryDTO reportPageQueryDTO);
}
