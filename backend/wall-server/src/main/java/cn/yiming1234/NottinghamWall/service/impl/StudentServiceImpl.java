package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.dto.StudentDTO;
import cn.yiming1234.NottinghamWall.dto.StudentLoginDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.exception.LoginFailedException;
import cn.yiming1234.NottinghamWall.mapper.CommentMapper;
import cn.yiming1234.NottinghamWall.mapper.StudentMapper;
import cn.yiming1234.NottinghamWall.mapper.TopicMapper;
import cn.yiming1234.NottinghamWall.properties.WeChatProperties;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.StudentService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import cn.yiming1234.NottinghamWall.utils.HttpClientUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class StudentServiceImpl implements StudentService {

    public static final String WX_URL = "https://api.weixin.qq.com/sns/jscode2session";
    public static final String WX_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";
    public static final String WX_GET_PHONE_URL = "https://api.weixin.qq.com/wxa/business/getuserphonenumber";

    private final WeChatProperties weChatProperties;
    private final StudentMapper studentMapper;
    private final TopicMapper topicMapper;
    private final CommentMapper commentMapper;
    private final AliOssUtil aliOssUtil;

    @Autowired
    public StudentServiceImpl(WeChatProperties weChatProperties, StudentMapper studentMapper, TopicMapper topicMapper, CommentMapper commentMapper, AliOssUtil aliOssUtil) {
        this.weChatProperties = weChatProperties;
        this.studentMapper = studentMapper;
        this.topicMapper = topicMapper;
        this.commentMapper = commentMapper;
        this.aliOssUtil = aliOssUtil;
    }

    /**
     * 获取openid
     */
    private String getOpenid(String code) {
        Map<String, String> map = new HashMap<>();
        map.put("appid", weChatProperties.getAppid());
        map.put("secret", weChatProperties.getSecret());
        map.put("js_code", code);
        map.put("grant_type", "authorization_code");
        String json = HttpClientUtil.doGet(WX_URL, map);
        //判断openid是否为空
        JSONObject jsonObject = JSON.parseObject(json);
        log.info("jsonObject:{}", jsonObject);
        return jsonObject.getString("openid");
    }

    /**
     * 获取accessToken
     */
    private String getAccessToken() {
        Map<String, String> map = new HashMap<>();
        map.put("appid", weChatProperties.getAppid());
        map.put("secret", weChatProperties.getSecret());
        map.put("grant_type", "client_credential");
        String json = HttpClientUtil.doGet(WX_ACCESS_TOKEN_URL, map);
        JSONObject jsonObject = JSON.parseObject(json);
        log.info("access_token:{}", jsonObject.getString("access_token"));
        return jsonObject.getString("access_token");
    }

    /**
     * 微信登录
     */
    @Override
    public Student wxLogin(StudentLoginDTO studentLoginDTO) {
        String openid = getOpenid(studentLoginDTO.getCode());
        log.info("openid:{}", openid);
        if (openid == null) {
            throw new LoginFailedException(MessageConstant.LOGIN_FAILED);
        }
        Student student = studentMapper.findByOpenid(openid);
        if (student == null) {
            String[] avatars = {
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/zhongli.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/xiao.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/puren.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/wendi.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/ganyu.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/linren.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/linhua.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/leidian.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/naxida.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/diluke.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/jiaming.jpg",
                    "https://yiming1234.oss-cn-beijing.aliyuncs.com/default.jpg",
            };
            String avatar = avatars[(int) (Math.random() * avatars.length)];
            student = Student.builder()
                    .openid(openid)
                    .username("传奇绳匠" + System.currentTimeMillis())
                    .sex("1")
                    .avatar(avatar)
                    .createTime(LocalDateTime.now())
                    .build();
            studentMapper.insert(student);
        }
        return student;
    }

    /**
     * 微信获取手机号
     */
    @Override
    public String getPhoneNumber(String code, Integer id) throws IOException {
        log.info("code:{}", code);
        String accessToken = getAccessToken();
        Map<String, String> bodyParams = new HashMap<>();
        bodyParams.put("code", code);

        String json = HttpClientUtil.doPost4Json(WX_GET_PHONE_URL + "?access_token=" + accessToken, bodyParams);
        JSONObject jsonObject = JSON.parseObject(json);

        if (jsonObject.getInteger("errcode") == 0) {
            JSONObject phoneInfo = jsonObject.getJSONObject("phone_info");
            String purePhoneNumber = phoneInfo.getString("purePhoneNumber");
            log.info("purePhoneNumber:{}", purePhoneNumber);
            updatePhoneNumber(id, purePhoneNumber);
            return purePhoneNumber;
        } else {
            log.error("Error retrieving phone number: {}", jsonObject.getString("errmsg"));
            return null;
        }
    }

    /**
     * 更新手机号
     */
    @Override
    public void updatePhoneNumber(Integer id, String phoneNumber) {
        Student student = studentMapper.getById(id);
        if (student != null) {
            student.setPhone(phoneNumber);
            student.setUpdateTime(LocalDateTime.now());
            studentMapper.updateById(student);
        }
    }

    /**
     * 更新学生信息
     */
    @Override
    public Student update(StudentDTO studentDTO) {
        Student student = studentMapper.getById(studentDTO.getId());
        if (student != null) {
            if (!student.getAvatar().equals(studentDTO.getAvatar()) && !student.getAvatar().contains("default.jpg")) {
                String objectName = student.getAvatar().substring(student.getAvatar().lastIndexOf("/") + 1);
                aliOssUtil.delete(objectName);
            }
            student.setUsername(studentDTO.getUsername());
            student.setAvatar(studentDTO.getAvatar());
            student.setSex(studentDTO.getSex());
            student.setStudentid(studentDTO.getStudentid());
            student.setUpdateTime(LocalDateTime.now());
            log.info("更新后的学生信息:{}", student);
            studentMapper.updateById(student);
        }
        return student;
    }

    /**
     * 根据id查询学生
     */
    @Override
    public Student getById(Integer id) {
        return studentMapper.getById(id);
    }

    /**
     * 根据用户名查询学生
     */
    @Override
    public Student getByUsername(String username) {
        return studentMapper.getByUsername(username);
    }

    /**
     * 根据学号查询学生
     */
    @Override
    public Student getByStudentId(Integer studentId) {
        return studentMapper.getByStudentId(studentId);
    }

    /**
     * 根据邮箱查询学生
     */
    @Override
    public Student getByEmail(String email) {
        return studentMapper.getByEmail(email);
    }

    /**
     * 学生分页查询
     */
    public PageResult pageQuery(PageQueryDTO pageQueryDTO) {
        PageHelper.startPage(pageQueryDTO.getPage(), pageQueryDTO.getPageSize());
        Page<Student> page = studentMapper.pageQuery(pageQueryDTO);

        long total = page.getTotal();
        List<Student> records = page.getResult();
        return new PageResult(total, records);
    }

    /**
     * 查询发布的帖子（分页）
     */
    @Override
    public PageResult<Topic> getPublishedPosts(Integer id, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Integer> publishedTopicIds = topicMapper.getPublishedTopicIds(id);
        List<Topic> posts = topicMapper.getTopicsByIds(publishedTopicIds);
        PageInfo<Topic> pageInfo = new PageInfo<>(posts);
        return new PageResult<>(pageInfo.getTotal(), pageInfo.getList());
    }

    /**
     * 查询收藏的帖子（分页）
     */
    @Override
    public PageResult<Topic> getCollectedPosts(Integer id, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Integer> collectedTopicIds = topicMapper.getCollectedTopicIds(id);
        log.info("collectedTopicIds:{}", collectedTopicIds);
        List<Topic> posts = topicMapper.getTopicsByIds(collectedTopicIds);
        PageInfo<Topic> pageInfo = new PageInfo<>(posts);
        return new PageResult<>(pageInfo.getTotal(), pageInfo.getList());
    }

    /**
     * 查询评论的帖子（分页）
     */
    @Override
    public PageResult<Topic> getCommentedPosts(Integer id, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Topic> posts = commentMapper.getCommentedPosts(id);
        PageInfo<Topic> pageInfo = new PageInfo<>(posts);
        return new PageResult<>(pageInfo.getTotal(), pageInfo.getList());
    }
}