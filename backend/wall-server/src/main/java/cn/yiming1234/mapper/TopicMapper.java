package cn.yiming1234.mapper;

import cn.yiming1234.annotation.AutoFill;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.enumeration.OperationType;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TopicMapper {

    @AutoFill(value = OperationType.INSERT)
    void insert(Topic topic);
}
