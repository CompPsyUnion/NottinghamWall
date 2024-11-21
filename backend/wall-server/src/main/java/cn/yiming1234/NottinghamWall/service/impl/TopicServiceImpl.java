package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.dto.TopicDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.exception.TeapotException;
import cn.yiming1234.NottinghamWall.mapper.StudentMapper;
import cn.yiming1234.NottinghamWall.mapper.TopicMapper;
import cn.yiming1234.NottinghamWall.properties.AliOssProperties;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.TopicService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import cn.yiming1234.NottinghamWall.utils.ContentCheckUtil;
import cn.yiming1234.NottinghamWall.utils.ImageCheckUtil;
import com.aliyun.green20220302.models.ImageModerationResponse;
import com.aliyun.green20220302.models.ImageModerationResponseBody;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TopicServiceImpl implements TopicService {

    private final TopicMapper topicMapper;
    private final ContentCheckUtil contentCheckUtil;
    private final AliOssUtil aliOssUtil;
    private final StudentServiceImpl studentServiceImpl;
    private final StudentMapper studentMapper;
    private final AliOssProperties aliOssProperties;

    @Autowired
    public TopicServiceImpl(TopicMapper topicMapper, ContentCheckUtil contentCheckUtil, AliOssUtil aliOssUtil, StudentServiceImpl studentServiceImpl, StudentMapper studentMapper, AliOssProperties aliOssProperties) {
        this.topicMapper = topicMapper;
        this.contentCheckUtil = contentCheckUtil;
        this.aliOssUtil = aliOssUtil;
        this.studentServiceImpl = studentServiceImpl;
        this.studentMapper = studentMapper;
        this.aliOssProperties = aliOssProperties;
    }

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
     * @param topicDTO 话题DTO
     */
    @Override
    public void addTopic(TopicDTO topicDTO) throws Exception {
        Topic topic = convertToTopic(topicDTO);
        log.info("当前话题内容:{}", topicDTO.getContent());
        boolean isContentSafe = contentCheckUtil.checkTextContent(
                topicDTO.getContent(),
                3,
                studentMapper.getOpenidById(topicDTO.getAuthorID()),
                studentServiceImpl.getAccessToken()
                );
        if (!isContentSafe) {
            throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
        }
        for (String imgUrl : topicDTO.getImgURLs()) {
            log.info("ImgUrl Checking: {}", imgUrl);
            String objectName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
            ImageModerationResponse response = ImageCheckUtil.invokeFunction(
                        aliOssProperties.getAccessKeyId(),
                        aliOssProperties.getAccessKeySecret(),
                    "green.cn-beijing.aliyuncs.com",
                        objectName
                    );

            ImageModerationResponseBody body = response.getBody();
            boolean isImageContentSafe = !"high".equals(body.getData().getRiskLevel());
            if (!isImageContentSafe) {
                aliOssUtil.delete(objectName);
                throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
            }
        }
        topic.setIsDraft(false);
        topicMapper.insert(topic);
    }

    /**
     * 删除话题
     * @param id 话题id
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
     * @param topicDTO 话题DTO
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
     * @param userId 用户id
     * @return 话题
     */
    @Override
    public Topic getDraft(Integer userId) {
        Topic topic = topicMapper.getDraft(userId);
        log.info("获取草稿：{}", topic);
        return topic;
    }

    /**
     * 删除草稿
     * @param id 话题id
     */
    @Override
    public void deleteDraft(Integer id) {
        topicMapper.deleteDraft(id);
    }

    /**
     * 检查是否存在草稿
     * @param authorID 作者id
     * @return 是否存在草稿
     */
    @Override
    public Boolean isExistDraft(Integer authorID) {
        Boolean isExist = topicMapper.isExistDraft(authorID);
        log.info("是否存在草稿：{}", isExist);
        return isExist;
    }

    /**
     * 分页查询话题
     * @param pageQueryDTO 分页查询DTO
     * @return 分页结果
     */
    @Override
    public PageResult<Topic> pageQuery(PageQueryDTO pageQueryDTO) {
        PageHelper.startPage(pageQueryDTO.getPage(), pageQueryDTO.getPageSize());
        Page<Topic> page = topicMapper.pageQuery(pageQueryDTO);
        long total = page.getTotal();
        List<Topic> records = page.getResult();
        records.forEach(topic -> {
            List<String> signedUrls = topic.getImgURLs().stream()
                    .map(aliOssUtil::generatePresignedUrl)
                    .collect(Collectors.toList());
            topic.setImgURLs(signedUrls);
        });
        return new PageResult<>(total, records);
    }

    /**
     * 根据id获取话题
     * @param id 话题id
     * @return 话题
     */
    @Override
    public Topic getTopicById(Integer id) {
        Topic topic = topicMapper.getTopicById(id);
        if (topic != null && topic.getImgURLs() != null) {
            List<String> signedUrls = topic.getImgURLs().stream()
                    .map(aliOssUtil::generatePresignedUrl)
                    .collect(Collectors.toList());
            topic.setImgURLs(signedUrls);
        }
        log.info("根据id获取话题详情：{}", topic);
        return topic;
    }

    /**
     * 点赞功能
     * @param id 话题id
     * @param userId 用户id
     */
    @Override
    public void likeTopic(Integer id, Integer userId) {
        topicMapper.likeTopic(id, userId);
    }

    /**
     * 取消点赞功能
     * @param id 话题id
     * @param userId 用户id
     */
    @Override
    public void unlikeTopic(Integer id, Integer userId) {
        topicMapper.unlikeTopic(id, userId);
    }

    /**
     * 判断是否点赞
     * @param id 话题id
     * @param userId 用户id
     * @return 是否点赞
     */
    @Override
    public Boolean isLikeTopic(Integer id, Integer userId) {
        Boolean isLiked = topicMapper.isLikeTopic(id, userId);
        log.info("是否点赞话题：{}", isLiked);
        return isLiked;
    }

    /**
     * 获取点赞计数
     * @param id 话题id
     * @return 点赞数
     */
    @Override
    public int getLikeCount(Integer id) {
        int count = topicMapper.getLikeCount(id);
        log.info("话题 {} 的点赞数：{}", id, count);
        return count;
    }

    /**
     * 收藏话题
     * @param id 话题id
     */
    @Override
    public void collectTopic(Integer id, Integer userId) {
        topicMapper.collectTopic(id, userId);
    }

    /**
     * 取消收藏话题
     * @param id 话题id
     * @param userId 用户id
     */
    @Override
    public void uncollectTopic(Integer id, Integer userId) {
        topicMapper.uncollectTopic(id, userId);
    }

    /**
     * 判断是否收藏话题
     * @param id 话题id
     * @param userId 用户id
     * @return 是否收藏
     */
    @Override
    public Boolean isCollectTopic(Integer id, Integer userId) {
        Boolean isCollected = topicMapper.isCollectTopic(id, userId);
        log.info("用户 {} 是否收藏话题 {}：{}", userId, id, isCollected);
        return isCollected;
    }

    /**
     * 获取收藏计数
     * @param id 话题id
     * @return 收藏数
     */
    @Override
    public int getCollectCount(Integer id) {
        int count = topicMapper.getCollectCount(id);
        log.info("话题 {} 的收藏数：{}", id, count);
        return count;
    }
}
