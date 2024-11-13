package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
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

    private Topic convertToTopic(TopicDTO topicDTO) {
        Topic topic = new Topic();
        BeanUtils.copyProperties(topicDTO, topic);
        topic.setContent(topicDTO.getContent());
        topic.setImgURLs(topicDTO.getImgURLs());
        topic.setCreatedAt(LocalDateTime.now());
        topic.setUpdatedAt(LocalDateTime.now());
        return topic;
    }

    /**
     * 添加话题
     */
    @Override
    public void addTopic(TopicDTO topicDTO) {
        Topic topic = convertToTopic(topicDTO);
        topic.setIsDraft(false);
        log.info("当前话题内容:{}", topicDTO.getContent());

        topicMapper.insert(topic);
    }

    /**
     * 删除话题
     */
    @Override
    public void deleteTopic(Integer id) {
        topicMapper.deleteTopicLikes(id);
        topicMapper.deleteTopicCollections(id);
        topicMapper.deleteTopicComments(id);
        topicMapper.deleteTopic(id);
    }

    /**
     * 新建草稿
     */
    @Override
    public void saveDraft(TopicDTO topicDTO) {
        Topic topic = convertToTopic(topicDTO);
        topic.setIsDraft(true);
        if (topic.getId() != null) {
            topicMapper.update(topic);
        } else {
            topicMapper.insert(topic);
        }
    }

    /**
     * 获取草稿
     */
    @Override
    public Topic getDraft(Integer userId) {
        Topic topic = topicMapper.getDraft(userId);
        log.info("获取草稿：{}", topic);
        return topic;
    }

    /**
     * 删除草稿
     */
    @Override
    public void deleteDraft(Integer id) {
        topicMapper.deleteDraft(id);
    }

    /**
     * 检查是否存在草稿
     */
    @Override
    public Boolean isExistDraft(Integer authorID) {
        Boolean isExist = topicMapper.isExistDraft(authorID);
        log.info("是否存在草稿：{}", isExist);
        return isExist;
    }

    /**
     * 分页查询话题
     */
    @Override
    public PageResult pageQuery(PageQueryDTO pageQueryDTO) {
        PageHelper.startPage(pageQueryDTO.getPage(), pageQueryDTO.getPageSize());
        Page<Topic> page = topicMapper.pageQuery(pageQueryDTO);
        long total = page.getTotal();
        List<Topic> records = page.getResult();
        return new PageResult(total, records);
    }

    /**
     * 根据id获取话题
     */
    @Override
    public Topic getTopicById(Integer id) {
        Topic topic = topicMapper.getTopicById(id);
        log.info("根据id获取话题详情：{}", topic);
        return topic;
    }

    /**
     * 点赞功能
     */
    @Override
    public void likeTopic(Integer id, Integer userId) {
        topicMapper.likeTopic(id, userId);
    }

    /**
     * 取消点赞功能
     */
    @Override
    public void unlikeTopic(Integer id, Integer userId) {
        topicMapper.unlikeTopic(id, userId);
    }

    /**
     * 判断是否点赞
     */
    @Override
    public Boolean isLikeTopic(Integer id, Integer userId) {
        Boolean isLiked = topicMapper.isLikeTopic(id, userId);
        log.info("是否点赞话题：{}", isLiked);
        return isLiked;
    }

    /**
     * 获取点赞计数
     */
    @Override
    public int getLikeCount(Integer id) {
        int count = topicMapper.getLikeCount(id);
        log.info("话题 {} 的点赞数：{}", id, count);
        return count;
    }

    /**
     * 收藏话题
     */
    @Override
    public void collectTopic(Integer id, Integer userId) {
        topicMapper.collectTopic(id, userId);
    }

    /**
     * 取消收藏话题
     */
    @Override
    public void uncollectTopic(Integer id, Integer userId) {
        topicMapper.uncollectTopic(id, userId);
    }

    /**
     * 判断是否收藏话题
     */
    @Override
    public Boolean isCollectTopic(Integer id, Integer userId) {
        Boolean isCollected = topicMapper.isCollectTopic(id, userId);
        log.info("用户 {} 是否收藏话题 {}：{}", userId, id, isCollected);
        return isCollected;
    }

    /**
     * 获取收藏计数
     */
    @Override
    public int getCollectCount(Integer id) {
        int count = topicMapper.getCollectCount(id);
        log.info("话题 {} 的收藏数：{}", id, count);
        return count;
    }
}
