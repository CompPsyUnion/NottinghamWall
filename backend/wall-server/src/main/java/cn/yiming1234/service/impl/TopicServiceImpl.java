package cn.yiming1234.service.impl;

import cn.yiming1234.dto.TopicDTO;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.mapper.TopicMapper;
import cn.yiming1234.result.PageResult;
import cn.yiming1234.service.TopicService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {

    private static final Logger log = LoggerFactory.getLogger(TopicServiceImpl.class);
    @Autowired
    private TopicMapper topicMapper;

    /**
     * 添加话题
     */
    @Override
    public void addTopic(TopicDTO topicDTO) {

        // 将DTO转换为实体类
        Topic topic = new Topic();
        BeanUtils.copyProperties(topicDTO, topic);
        topic.setContent(topicDTO.getContent());
        topic.setImgURLs(topicDTO.getImgURLs());
        topic.setCreatedAt(LocalDateTime.now());
        topic.setUpdatedAt(LocalDateTime.now());

        log.info("当前话题内容:{}", topicDTO.getContent());

        topicMapper.insert(topic);
    }

    /**
     * 分页查询话题
     */
    @Override
    public PageResult pageQuery(TopicPageQueryDTO topicPageQueryDTO) {

        // 开始分页查询
        PageHelper.startPage(topicPageQueryDTO.getPage(), topicPageQueryDTO.getPageSize());

        Page<Topic> page = topicMapper.pageQuery(topicPageQueryDTO);

        // 将查询结果封装为PageResult对象
        long total = page.getTotal();
        List<Topic> records = page.getResult();
        return new PageResult(total, records);
    }

    /**
     * 根据id获取话题
     */
    @Override
    public Topic getTopicById(String id) {
        Topic topic = topicMapper.getTopicById(id);

        log.info("根据id获取话题详情：{}", topic);

        return topic;
    }
}
