package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.TopicPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.mapper.TopicMapper;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.TopicService;
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
     * 删除话题
     */
    @Override
    public void deleteTopic(String id) {
        topicMapper.deleteTopicLikes(id);
        topicMapper.deleteTopicCollections(id);
        topicMapper.deleteTopicComments(id);
        topicMapper.deleteTopic(id);
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

    /**
     * 点赞功能
     */
    @Override
    public void likeTopic(String id, String userId) {
        topicMapper.likeTopic(id, userId);
    }

    /**
     * 取消点赞功能
     */
    @Override
    public void unlikeTopic(String id, String userId) {
        topicMapper.unlikeTopic(id, userId);
    }

    /**
     * 判断是否点赞
     */
    @Override
    public Boolean isLikeTopic(String id, String userId) {
        Boolean isLiked = topicMapper.isLikeTopic(id, userId);
        log.info("是否点赞话题：{}", isLiked);
        return isLiked;
    }

    /**
     * 获取点赞计数
     */
    @Override
    public int getLikeCount(String id) {
        int count = topicMapper.getLikeCount(id);
        log.info("话题 {} 的点赞数：{}", id, count);
        return count;
    }

    /**
     * 收藏话题
     */
    @Override
    public void collectTopic(String id, String userId) {
        topicMapper.collectTopic(id, userId);
    }

    /**
     * 取消收藏话题
     */
    @Override
    public void uncollectTopic(String id, String userId) {
        topicMapper.uncollectTopic(id, userId);
    }

    /**
     * 判断是否收藏话题
     */
    @Override
    public Boolean isCollectTopic(String id, String userId) {
        Boolean isCollected = topicMapper.isCollectTopic(id, userId);
        log.info("用户 {} 是否收藏话题 {}：{}", userId, id, isCollected);
        return isCollected;
    }

    /**
     * 获取收藏计数
     */
    @Override
    public int getCollectCount(String id) {
        int count = topicMapper.getCollectCount(id);
        log.info("话题 {} 的收藏数：{}", id, count);
        return count;
    }
}
