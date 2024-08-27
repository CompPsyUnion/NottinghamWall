package cn.yiming1234.service;

import cn.yiming1234.dto.TopicDTO;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.result.PageResult;
import org.apache.ibatis.annotations.Select;

public interface TopicService {
    /**
     * 添加话题
     * @param topicDTO
     */
    void addTopic(TopicDTO topicDTO);

    /**
     * 分页查询话题
     * @param topicPageQueryDTO
     * @return
     */
    PageResult pageQuery(TopicPageQueryDTO topicPageQueryDTO);

    /**
     * 根据id获取话题
     * @param id
     * @return
     */
    Topic getTopicById(String id);
}
