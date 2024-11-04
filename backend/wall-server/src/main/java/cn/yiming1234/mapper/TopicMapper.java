package cn.yiming1234.mapper;

import cn.yiming1234.annotation.AutoFill;
import cn.yiming1234.dto.CommentDTO;
import cn.yiming1234.dto.TopicPageQueryDTO;
import cn.yiming1234.entity.Topic;
import cn.yiming1234.enumeration.OperationType;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TopicMapper {

    /**
     * 新增话题
     *
     * @param topic
     */
    @AutoFill(value = OperationType.INSERT)
    void insert(Topic topic);

    /**
     * 分页查询话题
     *
     * @param topicPageQueryDTO
     * @return
     */
    Page<Topic> pageQuery(TopicPageQueryDTO topicPageQueryDTO);

    /**
     * 根据id获取话题
     *
     * @param id
     * @return
     */
    Topic getTopicById(String id);

    /**
     * 点赞话题
     *
     * @param params
     */
    void likeTopic(Map<String, Object> params);

    /**
     * 取消点赞话题
     *
     * @param params
     */
    void unlikeTopic(Map<String, Object> params);

    /**
     * 判断是否点赞话题
     *
     * @param params
     */
    Boolean isLikeTopic(Map<String, Object> params);

    /**
     * 评论话题
     *
     * @param commentDTO
     */
    void commentTopic(CommentDTO commentDTO);

    /**
     * 根据话题id获取评论
     * @param topicId
     * @return
     */
    List<CommentDTO> getComments(@Param("topicId") String topicId);
}
