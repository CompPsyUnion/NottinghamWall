package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.dto.ReportDTO;
import cn.yiming1234.NottinghamWall.entity.Report;
import cn.yiming1234.NottinghamWall.mapper.ReportMapper;
import cn.yiming1234.NottinghamWall.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportMapper reportMapper;

    @Override
    public void insertReport(ReportDTO reportDTO){

        int count = reportMapper.countExistingReports(reportDTO.getUserId(), reportDTO.getTopicId(), reportDTO.getCommentId());
        if (count > 0) {
            throw new IllegalArgumentException("已经举报过该内容");
        }

        Report report = new Report();
        report.setId(reportDTO.getId());
        report.setTopicId(reportDTO.getTopicId());
        report.setCommentId(reportDTO.getCommentId());
        report.setUserId(reportDTO.getUserId());
        report.setTags(reportDTO.getTags());
        report.setDetailedDescription(reportDTO.getDetailedDescription());
        report.setReportTime(LocalDateTime.now());
        reportMapper.insertReport(report);

    }
}
