package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.ReportDTO;

public interface ReportService {

    /**
     * 创建举报
     * @param reportDTO
     */
    void insertReport(ReportDTO reportDTO);

}
