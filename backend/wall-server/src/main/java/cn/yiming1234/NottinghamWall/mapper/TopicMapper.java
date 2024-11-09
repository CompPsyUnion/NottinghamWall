package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.TopicPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TopicMapper {

    /**
     * 新增话题
     */
    void insert(Topic topic);

    /**
     * 分页查询话题
     */
    Page<Topic> pageQuery(TopicPageQueryDTO topicPageQueryDTO);

    /**
     * 根据id获取话题
     */
    Topic getTopicById(String id);

    /**
     * 点赞话题
     */
    void likeTopic(@Param("topicId") String topicId, @Param("userId") String userId);

    /**
     * 取消点赞话题
     */
    void unlikeTopic(@Param("topicId") String topicId, @Param("userId") String userId);

    /**
     * 判断是否点赞话题
     */
    Boolean isLikeTopic(@Param("topicId") String topicId, @Param("userId") String userId);

    /**
     * 获取点赞计数
     */
    int getLikeCount(@Param("topicId") String topicId);

    /**
     * 收藏话题
     *
     * @param topicId
     * @param userId
     */
    void collectTopic(@Param("topicId") String topicId, @Param("userId") String userId);

    /**
     * 取消收藏话题
     */
    void uncollectTopic(@Param("topicId") String topicId, @Param("userId") String userId);

    /**
     * 判断是否收藏话题
     */
    Boolean isCollectTopic(@Param("topicId") String topicId, @Param("userId") String userId);

    /**
     * 获取收藏计数
     */
    int getCollectCount(@Param("topicId") String topicId);

    /**
     * 删除话题及其相关信息
     */
    void deleteTopic(String topicId);

    void deleteTopicLikes(String topicId);

    void deleteTopicCollections(String topicId);

    void deleteTopicComments(String topicId);
}
