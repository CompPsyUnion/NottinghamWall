package cn.yiming1234.service.impl;

import cn.yiming1234.dto.*;
import cn.yiming1234.entity.Student;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.mapper.StudentMapper;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TopicServiceImpl implements TopicService {

    private static final Logger log = LoggerFactory.getLogger(TopicServiceImpl.class);
    @Autowired
    private TopicMapper topicMapper;
    @Autowired
    private StudentMapper studentMapper;

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
        Map<String, Object> params = new HashMap<>();
        params.put("topicId", id);
        params.put("userId", userId);
        topicMapper.likeTopic(params);
    }

    /**
     * 取消点赞功能
     */
    @Override
    public void unlikeTopic(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("topicId", id);
        params.put("userId", userId);
        topicMapper.unlikeTopic(params);
    }

    /**
     * 判断是否点赞
     */
    @Override
    public Boolean isLikeTopic(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("topicId", id);
        params.put("userId", userId);
        Boolean isLiked = topicMapper.isLikeTopic(params);
        log.info(isLiked.toString());

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
        Map<String, Object> params = new HashMap<>();
        params.put("topicId", id);
        params.put("userId", userId);
        topicMapper.collectTopic(params);
    }

    /**
     * 取消收藏话题
     */
    @Override
    public void uncollectTopic(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("topicId", id);
        params.put("userId", userId);
        topicMapper.uncollectTopic(params);
    }

    /**
     * 判断是否收藏话题
     */
    @Override
    public Boolean isCollectTopic(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("topicId", id);
        params.put("userId", userId);
        Boolean isCollected = topicMapper.isCollectTopic(params);
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

    /**
     * 评论话题
     */
    @Override
    public void commentTopic(CommentDTO commentDTO) {
        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        topicMapper.commentTopic(commentDTO);
    }

    /**
     * 根据Id查看评论
     */
    @Override
    public List<CommentDTO> getComments(String topicId) {

        log.info("获取评论列表:{}",topicMapper.getComments(topicId));

        return topicMapper.getComments(topicId);
    }

    /**
     * 分页查看评论
     */
    // TODO

    /**
     * 点赞评论
     */
    @Override
    public void likeComment(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("commentId", id);
        params.put("userId", userId);
        topicMapper.likeComment(params);
    }

    /**
     * 取消点赞评论
     */
    @Override
    public void unlikeComment(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("commentId", id);
        params.put("userId", userId);
        topicMapper.unlikeComment(params);
    }

    /**
     * 判断是否点赞评论
     */
    @Override
    public Boolean isLikeComment(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("commentId", id);
        params.put("userId", userId);
        Boolean isLiked = topicMapper.isLikeComment(params);
        log.info("用户 {} 是否点赞评论 {}：{}", userId, id, isLiked);
        return isLiked;
    }

    /**
     * 回复评论
     */
    @Override
    public void replyComment(CommentDTO commentDTO) {
        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        topicMapper.replyComment(commentDTO);
    }

    /**
     * 删除评论
     */
    @Override
    public void deleteComment(String id, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("commentId", id);
        params.put("userId", userId);
        topicMapper.deleteComment(params);
    }

    /**
     * 获取评论计数
     */
    @Override
    public int getCommentCount(String id) {
        int count = topicMapper.getCommentCount(id);
        log.info("话题 {} 的评论数：{}", id, count);
        return count;
    }

    @Override
    public CommentDTO getCommentById(String commentId) {
        return topicMapper.getCommentById(commentId);
    }

}
