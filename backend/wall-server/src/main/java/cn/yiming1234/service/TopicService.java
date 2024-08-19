package cn.yiming1234.service;

import cn.yiming1234.dto.TopicDTO;

public interface TopicService {
    /**
     * 添加话题
     * @param topicDTO
     */
    void addTopic(TopicDTO topicDTO);
}
