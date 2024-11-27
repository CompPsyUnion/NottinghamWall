package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.dto.StudentDTO;
import cn.yiming1234.NottinghamWall.dto.StudentLoginDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.exception.LoginFailedException;
import cn.yiming1234.NottinghamWall.exception.TeapotException;
import cn.yiming1234.NottinghamWall.mapper.CommentMapper;
import cn.yiming1234.NottinghamWall.mapper.StudentMapper;
import cn.yiming1234.NottinghamWall.mapper.TopicMapper;
import cn.yiming1234.NottinghamWall.properties.WeChatProperties;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.StudentService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import cn.yiming1234.NottinghamWall.utils.ContentCheckUtil;
import cn.yiming1234.NottinghamWall.utils.HttpClientUtil;
import cn.yiming1234.NottinghamWall.utils.ImageCheckUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.aliyun.green20220302.models.ImageModerationResponse;
import com.aliyun.green20220302.models.ImageModerationResponseBody;
import com.aliyuncs.exceptions.ClientException;
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
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

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
    private final ContentCheckUtil contentCheckUtil;
    private String accessToken;
    private LocalDateTime accessTokenTime;

    @Autowired
    public StudentServiceImpl(WeChatProperties weChatProperties, StudentMapper studentMapper, TopicMapper topicMapper, CommentMapper commentMapper, AliOssUtil aliOssUtil, ContentCheckUtil contentCheckUtil) {
        this.weChatProperties = weChatProperties;
        this.studentMapper = studentMapper;
        this.topicMapper = topicMapper;
        this.commentMapper = commentMapper;
        this.aliOssUtil = aliOssUtil;
        this.contentCheckUtil = contentCheckUtil;
    }

    /**
     * 通用方法：根据帖子ID获取帖子列表并分页
     * @param idListFunction 获取帖子ID的函数
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     * @return 分页后的帖子列表
     */
    private PageResult<Topic> getPosts(Function<Integer, List<Integer>> idListFunction, Integer id, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Integer> topicIds = idListFunction.apply(id);
        List<Topic> posts = topicMapper.getTopicsByIds(topicIds);
        processPostImages(posts);
        PageInfo<Topic> pageInfo = new PageInfo<>(posts);
        return new PageResult<>(pageInfo.getTotal(), pageInfo.getList());
    }

    /**
     * 通用方法：直接获取帖子并分页
     * @param postsSupplier 获取帖子列表的函数
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     * @return 分页后的帖子列表
     */
    private PageResult<Topic> getPosts(Supplier<List<Topic>> postsSupplier, Integer id, int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<Topic> posts = postsSupplier.get();
        processPostImages(posts);
        PageInfo<Topic> pageInfo = new PageInfo<>(posts);
        return new PageResult<>(pageInfo.getTotal(), pageInfo.getList());
    }

    /**
     * 从URL中提取文件名
     * @param url URL
     * @return 文件名
     */
    private String extractFileName(String url) {
        int lastSlashIndex = url.lastIndexOf("/");
        int queryIndex = url.indexOf("?");
        if (lastSlashIndex == -1 || queryIndex == -1 || lastSlashIndex >= queryIndex) {
            throw new IllegalArgumentException("Invalid URL format: " + url);
        }
        log.info(url.substring(lastSlashIndex + 1, queryIndex));
        return url.substring(lastSlashIndex + 1, queryIndex);
    }

    /**
     * 处理帖子图片URL
     * @param posts 帖子列表
     */
    private void processPostImages(List<Topic> posts) {
        posts.forEach(topic -> {
            if (topic != null && topic.getImgURLs() != null) {
                List<String> signedUrls = topic.getImgURLs().stream()
                        .map(aliOssUtil::generatePresignedUrl)
                        .collect(Collectors.toList());
                topic.setImgURLs(signedUrls);
            }
        });
    }



    /**
     * 获取accessToken
     * @return accessToken
     */
    public String fetchAccessToken() {
        Map<String, String> map = new HashMap<>();
        map.put("appid", weChatProperties.getAppid());
        map.put("secret", weChatProperties.getSecret());
        map.put("grant_type", "client_credential");
        String json = HttpClientUtil.doGet(WX_ACCESS_TOKEN_URL, map);
        JSONObject jsonObject = JSON.parseObject(json);
        log.info("access_token:{}", jsonObject.getString("access_token"));
        // 保存accessTokenTime （有效期限）（now()+7200）
        accessTokenTime = LocalDateTime.now().plusSeconds(jsonObject.getLong("expires_in"));

        accessToken = jsonObject.getString("access_token");
        return accessToken;
    }

    /**
     * 获取accessToken
     * @return accessToken
     */
    public String getAccessToken() {
        if (accessToken == null) {
            log.info("token为空，重新获取");
            return fetchAccessToken();
        } else if (accessTokenTime.isBefore(LocalDateTime.now())) {
            log.info("token失效");
            return fetchAccessToken();
        } else {
            log.info("token未失效,直接返回");
            return accessToken;
        }
    }

    /**
     * 获取openid
     * @param code 微信登录凭证
     * @return openid
     */
    public String getOpenid(String code) {
        Map<String, String> map = new HashMap<>();
        map.put("appid", weChatProperties.getAppid());
        map.put("secret", weChatProperties.getSecret());
        map.put("js_code", code);
        map.put("grant_type", "authorization_code");
        String json = HttpClientUtil.doGet(WX_URL, map);
        JSONObject jsonObject = JSON.parseObject(json);
        log.info("jsonObject:{}", jsonObject);
        return jsonObject.getString("openid");
    }

    /**
     * 微信登录
     * @param studentLoginDTO 学生登录DTO
     * @return 学生
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
                    "zhongli.jpg",
                    "xiao.jpg",
                    "puren.jpg",
                    "wendi.jpg",
                    "ganyu.jpg",
                    "linren.jpg",
                    "linhua.jpg",
                    "leidian.jpg",
                    "naxida.jpg",
                    "diluke.jpg",
                    "jiaming.jpg",
                    "default.jpg",
            };
            String avatar = avatars[(int) (Math.random() * avatars.length)];
            student = Student.builder()
                    .openid(openid)
                    .username("传奇绳匠" + System.currentTimeMillis())
                    .sex("1")
                    .avatar(avatar)
                    .createTime(LocalDateTime.now())
                    .updateTime(LocalDateTime.now())
                    .build();
            studentMapper.insert(student);
        }
        return student;
    }

    /**
     * 微信获取手机号
     * @param code 微信登录凭证
     * @param id 学生id
     * @return 手机号
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
     * @param id 学生id
     * @param phoneNumber 手机号
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
     * @param studentDTO 学生DTO
     * @return 学生
     */
    @Override
    public Student update(StudentDTO studentDTO) throws Exception {
        Student student = studentMapper.getById(studentDTO.getId());
        if (student != null) {
            String accessToken = getAccessToken();
            boolean isUsernameSafe = contentCheckUtil.checkTextContent(studentDTO.getUsername(), 1, student.getOpenid(), accessToken);

            String photoName = student.getAvatar();
            ImageModerationResponse response = ImageCheckUtil.invokeFunction(
                    aliOssUtil.getAccessKeyId(),
                    aliOssUtil.getAccessKeySecret(),
                    "green.cn-beijing.aliyuncs.com",
                    photoName
            );
            ImageModerationResponseBody body = response.getBody();
            boolean isAvatarSafe = !"high".equals(body.getData().getRiskLevel());

            if (!isUsernameSafe) {
                log.info("username:{}", studentDTO.getUsername());
                throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
            }
            if (!isAvatarSafe) {
                aliOssUtil.delete(studentDTO.getAvatar());
                throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
            }

            String currentAvatarName = student.getAvatar();
            String newAvatarName = extractFileName(studentDTO.getAvatar());
            log.info(newAvatarName);
            if (!currentAvatarName.equals(newAvatarName) && !student.getAvatar().contains("default.jpg")) {
                aliOssUtil.delete(currentAvatarName);
            }

            student.setUsername(studentDTO.getUsername());
            student.setAvatar(newAvatarName);
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
     * @param id 学生id
     * @return 学生
     */
    @Override
    public Student getById(Integer id) throws ClientException {
        Student student = studentMapper.getById(id);
        if (student != null && student.getAvatar() != null) {
            String avatarUrl = aliOssUtil.generatePresignedUrl(student.getAvatar());
            student.setAvatar(avatarUrl);
        }
        return student;
    }

    /**
     * 根据用户名查询学生
     * @param username 用户名
     * @return 学生
     */
    @Override
    public Student getByUsername(String username) {
        Student student = studentMapper.getByUsername(username);
        if (student != null && student.getAvatar() != null) {
            String avatarUrl = aliOssUtil.generatePresignedUrl(student.getAvatar());
            student.setAvatar(avatarUrl);
        }
        return student;
    }

    /**
     * 根据学号查询学生
     * @param studentId 学号
     * @return 学生
     */
    @Override
    public Student getByStudentId(Integer studentId) {
        Student student = studentMapper.getByStudentId(studentId);
        if (student != null && student.getAvatar() != null) {
            String avatarUrl = aliOssUtil.generatePresignedUrl(student.getAvatar());
            student.setAvatar(avatarUrl);
        }
        return student;
    }

    /**
     * 根据邮箱查询学生
     * @param email 邮箱
     * @return 学生
     */
    @Override
    public Student getByEmail(String email) {
        Student student = studentMapper.getByEmail(email);
        if (student != null && student.getAvatar() != null) {
            String avatarUrl = aliOssUtil.generatePresignedUrl(student.getAvatar());
            student.setAvatar(avatarUrl);
        }
        return student;
    }

    /**
     * 学生分页查询
     *
     * @param pageQueryDTO 分页查询DTO
     * @return 学生分页结果
     */
    public PageResult<Student> pageQuery(PageQueryDTO pageQueryDTO) {
        PageHelper.startPage(pageQueryDTO.getPage(), pageQueryDTO.getPageSize());
        Page<Student> page = studentMapper.pageQuery(pageQueryDTO);
        long total = page.getTotal();
        List<Student> records = page.getResult();

        records.forEach(student -> {
            if (student != null && student.getAvatar() != null) {
                String avatarUrl = aliOssUtil.generatePresignedUrl(student.getAvatar());
                student.setAvatar(avatarUrl);
            }
        });

        return new PageResult<>(total, records);
    }

    /**
     * 查询发布的帖子（分页）
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     * @return 分页后的帖子列表
     */
    @Override
    public PageResult<Topic> getPublishedPosts(Integer id, int page, int pageSize) {
        return getPosts(topicMapper::getPublishedTopicIds, id, page, pageSize);
    }

    /**
     * 查询评论的帖子（分页）
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     * @return 分页后的帖子列表
     */
    @Override
    public PageResult<Topic> getCollectedPosts(Integer id, int page, int pageSize) {
        return getPosts(topicMapper::getCollectedTopicIds, id, page, pageSize);
    }

    /**
     * 查询收藏的帖子（分页）
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     * @return 分页后的帖子列表
     */
    @Override
    public PageResult<Topic> getCommentedPosts(Integer id, int page, int pageSize) {
        return getPosts(() -> commentMapper.getCommentedPosts(id), id, page, pageSize);
    }

}