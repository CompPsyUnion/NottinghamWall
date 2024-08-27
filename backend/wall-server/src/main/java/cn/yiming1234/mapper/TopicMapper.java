package cn.yiming1234.mapper;

import cn.yiming1234.annotation.AutoFill;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.enumeration.OperationType;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TopicMapper {

    /**
     * 新增话题
     * @param topic
     */
    @AutoFill(value = OperationType.INSERT)
    void insert(Topic topic);

    /**
     * 分页查询话题
     * @param topicPageQueryDTO
     * @return
     */
    Page<Topic> pageQuery(TopicPageQueryDTO topicPageQueryDTO);
}
