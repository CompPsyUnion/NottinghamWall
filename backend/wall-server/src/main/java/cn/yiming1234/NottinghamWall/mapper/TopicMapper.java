package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Topic;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TopicMapper {

    /**
     * 新增话题/草稿
     */
    void insert(Topic topic);

    /**
     * 更新草稿
     */
    void update(Topic topic);

    /**
     * 获取草稿
     */
    Topic getDraft(Integer userId);

    /**
     * 删除草稿
     */
    void deleteDraft(Integer id);

    /**
     * 检查是否存在草稿
     */
    Boolean isExistDraft(Integer authorID);

    /**
     * 分页查询话题
     */
    Page<Topic> pageQuery(PageQueryDTO pageQueryDTO);

    /**
     * 根据id获取话题
     */
    Topic getTopicById(Integer id);

    /**
     * 根据ids获取话题列表
     */
    List<Topic> getTopicsByIds(List<Integer> collectedTopicIds);

    /**
     * 点赞话题
     */
    void likeTopic(@Param("topicId") Integer topicId, @Param("userId") Integer userId);

    /**
     * 取消点赞话题
     */
    void unlikeTopic(@Param("topicId") Integer topicId, @Param("userId") Integer userId);

    /**
     * 判断是否点赞话题
     */
    Boolean isLikeTopic(@Param("topicId") Integer topicId, @Param("userId") Integer userId);

    /**
     * 获取点赞计数
     */
    int getLikeCount(@Param("topicId") Integer topicId);

    /**
     * 收藏话题
     */
    void collectTopic(@Param("topicId") Integer topicId, @Param("userId") Integer userId);

    /**
     * 取消收藏话题
     */
    void uncollectTopic(@Param("topicId") Integer topicId, @Param("userId") Integer userId);

    /**
     * 判断是否收藏话题
     */
    Boolean isCollectTopic(@Param("topicId") Integer topicId, @Param("userId") Integer userId);

    /**
     * 获取收藏计数
     */
    int getCollectCount(@Param("topicId") Integer topicId);

    /**
     * 删除话题及其相关信息
     */
    void deleteTopic(Integer topicId);

    /**
     * 删除话题点赞信息
     */
    void deleteTopicLikes(Integer topicId);

    /**
     * 删除话题收藏信息
     */
    void deleteTopicCollections(Integer topicId);

    /**
     * 删除话题评论信息
     */
    void deleteTopicComments(Integer topicId);

    /**
     * 查询用户发布的帖子
     */
    List<Topic> getPublishedPosts(@Param("authorId") Integer authorId);

    /**
     * 查询用户收藏的帖子ids
     */
    List<Integer> getCollectedTopicIds(Integer id);
}
