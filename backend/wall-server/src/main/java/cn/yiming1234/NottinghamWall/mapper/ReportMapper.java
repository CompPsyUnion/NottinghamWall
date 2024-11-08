package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.entity.Report;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ReportMapper {

    /**
     * 插入举报信息
     */
    void insertReport(Report report);

    int countExistingReports(@Param("userId") Integer userId, @Param("topicId") Integer topicId, @Param("commentId") Integer commentId);

}
