package cn.yiming1234.service.impl;

import cn.yiming1234.constant.MessageConstant;
import cn.yiming1234.dto.StudentLoginDTO;
import cn.yiming1234.entity.Student;
import cn.yiming1234.exception.LoginFailedException;
import cn.yiming1234.mapper.StudentMapper;
import cn.yiming1234.properties.WeChatProperties;
import cn.yiming1234.service.StudentService;
import cn.yiming1234.utils.HttpClientUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class StudentServiceImpl implements StudentService {

    public static final String WX_URL = "https://api.weixin.qq.com/sns/jscode2session";

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
        String openid = jsonObject.getString("openid");
        return openid;
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
        //判断当前用户是否为新用户，自动完成注册
        if (openid != null) {
            throw new LoginFailedException(MessageConstant.LOGIN_FAILED);
        }
        //返回用户对象
        Student student = studentMapper.findByOpenid(openid);

        if (student == null) {
            student = Student.builder()
                    .openid(openid)
                    .createTime(LocalDateTime.now())
                    .build();
            studentMapper.insert(student);
        }
        return student;
    }

}