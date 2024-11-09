package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.dto.ReportDTO;
import cn.yiming1234.NottinghamWall.dto.ReportPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Report;
import cn.yiming1234.NottinghamWall.mapper.ReportMapper;
import cn.yiming1234.NottinghamWall.mapper.TopicMapper;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.ReportService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportMapper reportMapper;
    private final TopicMapper topicMapper;

    @Autowired
    public ReportServiceImpl(ReportMapper reportMapper, TopicMapper topicMapper) {
        this.reportMapper = reportMapper;
        this.topicMapper = topicMapper;
    }

    /**
     * 举报
     */
    @Override
    public void insertReport(ReportDTO reportDTO) {

        int count = reportMapper.countExistingReports(reportDTO.getAuthorId(), reportDTO.getUserId(), reportDTO.getTopicId(), reportDTO.getCommentId());
        if (count > 0) {
            throw new IllegalArgumentException("已经举报过该内容");
        }

        Report report = new Report();
        report.setId(reportDTO.getId());
        report.setTopicId(reportDTO.getTopicId());
        report.setCommentId(reportDTO.getCommentId());
        Integer authorId = topicMapper.getTopicById(String.valueOf(reportDTO.getTopicId())).getAuthorID();
        report.setAuthorId(authorId);
        report.setUserId(reportDTO.getUserId());
        report.setTags(reportDTO.getTags());
        report.setDetailedDescription(reportDTO.getDetailedDescription());
        report.setReportTime(LocalDateTime.now());
        reportMapper.insertReport(report);

    }

    /**
     * 分页查询举报
     */
    @Override
    public PageResult pageQuery(ReportPageQueryDTO reportPageQueryDTO) {
        PageHelper.startPage(reportPageQueryDTO.getPage(), reportPageQueryDTO.getPageSize());
        Page<Report> page = reportMapper.pageQuery(reportPageQueryDTO);

        long total = page.getTotal();
        List<Report> records = page.getResult();
        return new PageResult(total, records);
    }
}
