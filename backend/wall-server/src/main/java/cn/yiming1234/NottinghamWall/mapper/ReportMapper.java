package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.ReportPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Report;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ReportMapper {

    /**
     * 插入举报信息
     */
    void insertReport(Report report);

    /**
     * 查询已经举报过的次数
     */
    int countExistingReports(@Param("authorId")Integer authorId, @Param("userId") Integer userId, @Param("topicId") Integer topicId, @Param("commentId") Integer commentId);

    /**
     * 分页查询举报
     */
    Page<Report> pageQuery(ReportPageQueryDTO reportPageQueryDTO);
}
