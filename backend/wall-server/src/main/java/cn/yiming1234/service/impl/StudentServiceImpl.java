package cn.yiming1234.service.impl;

import cn.yiming1234.constant.MessageConstant;
import cn.yiming1234.dto.StudentDTO;
import cn.yiming1234.dto.StudentLoginDTO;
import cn.yiming1234.dto.StudentPageQueryDTO;
import cn.yiming1234.entity.Student;
import cn.yiming1234.exception.LoginFailedException;
import cn.yiming1234.mapper.StudentMapper;
import cn.yiming1234.properties.WeChatProperties;
import cn.yiming1234.result.PageResult;
import cn.yiming1234.service.StudentService;
import cn.yiming1234.utils.HttpClientUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
@Slf4j
public class StudentServiceImpl implements StudentService {

    public static final String WX_URL = "https://api.weixin.qq.com/sns/jscode2session";

    public static final String WX_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";

    public static final String WX_GET_PHONE_URL = "https://api.weixin.qq.com/wxa/business/getuserphonenumber";

    @Autowired
    private WeChatProperties weChatProperties;

    @Autowired
    private StudentMapper studentMapper;

    /**
     * 获取openid
     *
     * @param code
     * @return
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
     *
     * @return
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
     *
     * @param studentLoginDTO
     * @return
     */
    @Override
    public Student wxLogin(StudentLoginDTO studentLoginDTO) {
        //获取openid
        String openid = getOpenid(studentLoginDTO.getCode());
        log.info("openid:{}", openid);
        //判断当前用户是否为新用户，自动完成注册
        if (openid == null) {
            throw new LoginFailedException(MessageConstant.LOGIN_FAILED);
        }
        //返回用户对象
        Student student = studentMapper.findByOpenid(openid);
        //判断用户是否为空
        if (student == null) {
            student = Student.builder()
                    .openid(openid)
                    .username("飞天裤衩") // 设置默认用户名
                    .avatar("https://yiming1234.oss-cn-beijing.aliyuncs.com/3af1ed64-c545-4250-8259-13d03f500db9.jpeg")  // 设置默认头像
                    .createTime(LocalDateTime.now())
                    .build();
            studentMapper.insert(student);
        }
        return student;
    }

    /**
     * 微信获取手机号
     *
     * @param code
     * @return
     */
    @Override
    public String getPhoneNumber(String code, Long id) throws IOException {
        log.info("code:{}", code);
        String accessToken = getAccessToken();
        log.info("access_token:{}", accessToken);
        Map<String, String> bodyParams = new HashMap<>();
        bodyParams.put("code", code);

        String json = HttpClientUtil.doPost4Json(WX_GET_PHONE_URL + "?access_token=" + accessToken, bodyParams);
        JSONObject jsonObject = JSON.parseObject(json);
        log.info("jsonObject:{}", jsonObject);
        if (jsonObject.getInteger("errcode") == 0) {
            JSONObject phoneInfo = jsonObject.getJSONObject("phone_info");
            String purePhoneNumber = phoneInfo.getString("purePhoneNumber");
            log.info("purePhoneNumber:{}", purePhoneNumber);
            // Update phone number in the database

            updatePhoneNumber(id, purePhoneNumber);
            return purePhoneNumber;
        } else {
            log.error("Error retrieving phone number: {}", jsonObject.getString("errmsg"));
            return null;
        }
    }
    /**
     * 更新手机号
     *
     * @param id
     * @param phoneNumber
     */
    @Override
    public void updatePhoneNumber(Long id, String phoneNumber) {
        Student student = studentMapper.getById(id);
        if (student != null) {
            student.setPhone(phoneNumber);
            student.setUpdateTime(LocalDateTime.now());
            studentMapper.updateById(student);
        }
    }
    /**
     * 更新学生信息
     *
     * @param studentDTO
     */
    @Override
    public Student update(StudentDTO studentDTO) {
        // 根据 ID 查找学生
        Student student = studentMapper.getById(studentDTO.getId());

        // 更新学生信息
        updateField(student::getUsername, studentDTO.getUsername(), student::setUsername, student);
        updateField(student::getAvatar, studentDTO.getAvatar(), student::setAvatar, student);
        updateField(student::getSex, studentDTO.getSex(), student::setSex, student);
        updateField(student::getStudentid, studentDTO.getStudentid(), student::setStudentid, student);

        return student;
    }

    /**
     * 通用方法：检查字段值是否为空，如果是，则更新字段并设置更新时间
     */
    private <T> void updateField(Supplier<T> getter, T newValue, Consumer<T> setter, Student student) {
        if (getter.get() == null && newValue != null) {
            setter.accept(newValue);
            student.setUpdateTime(LocalDateTime.now());
            studentMapper.updateById(student);
        }
    }

    /**
     * 根据id查询学生
     *
     * @param id
     * @return
     */
    public Student getById(Long id) {
        Student student = studentMapper.getById(id);
        return student;
    }

    /**
     * 根据学号查询学生
     *
     * @param studentId
     * @return
     */
    public Student getByStudentId(Long studentId) {
        Student student = studentMapper.getByStudentId(studentId);
        return student;
    }

    /**
     * 根据邮箱查询学生
     *
     * @param email
     * @return
     */
    public Student getByEmail(String email) {
        Student student = studentMapper.getByEmail(email);
        return student;
    }

    /**
     * 学生分页查询
     *
     * @param studentPageQueryDTO
     * @return
     */
    public PageResult pageQuery(StudentPageQueryDTO studentPageQueryDTO) {
        //开始分页查询
        PageHelper.startPage(studentPageQueryDTO.getPage(), studentPageQueryDTO.getPageSize());

        Page<Student> page = studentMapper.pageQuery(studentPageQueryDTO);

        //返回分页结果
        long total = page.getTotal();
        List<Student> records = page.getResult();
        return new PageResult(total, records);
    }
}