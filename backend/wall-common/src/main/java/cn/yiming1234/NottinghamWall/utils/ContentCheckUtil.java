package cn.yiming1234.NottinghamWall.utils;

import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.exception.TeapotException;
import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 内容安全性检测工具类
 */
@Data
@Slf4j
@Component
public class ContentCheckUtil {

    private static final String WX_TEXT_SEC_CHECK = "https://api.weixin.qq.com/wxa/msg_sec_check";
    private static final String WX_MEDIA_SEC_CHECK = "https://api.weixin.qq.com/wxa/media_check_async";

    /**
     * 检查文本内容的安全性
     * @param content 需检测的文本内容
     * @param scene 场景值（1-资料；2-评论；3-论坛；4-社交日志）
     * @param Openid 用户的openid
     * @param AccessToken 用户的access_token
     * @return true表示内容安全，false表示内容有风险
     */
    public boolean checkTextContent(String content, int scene, String Openid, String AccessToken) {
        try {
            Map<String, String> params = new HashMap<>();
            params.put("content", content);
            params.put("version", "2");
            params.put("scene", String.valueOf(scene));
            params.put("openid", Openid);

            String response = HttpClientUtil.doPost4Json(WX_TEXT_SEC_CHECK + "?access_token=" + AccessToken, params);
            JSONObject jsonResponse = JSONObject.parseObject(response);
            int errcode = jsonResponse.getIntValue("errcode");

            if (errcode != 0) {
                String errmsg = jsonResponse.getString("errmsg");
                throw new TeapotException(MessageConstant.CONTENT_UNSECURED + ": " + errmsg);
            }

            JSONObject result = jsonResponse.getJSONObject("result");
            String suggest = result.getString("suggest");
            int label = result.getIntValue("label");
            log.info("检测结果：" + suggest + ", 标签：" + label);
            return "pass".equals(suggest) && label == 100;
        } catch (Exception e) {
            log.info("检测文本内容失败:{}",e.getMessage());
            throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
        }
    }

    /**
     * 检查图片内容的安全性
     * @param mediaUrl 要检测的图片或音频的URL
     * @param scene 场景值（1-资料；2-评论；3-论坛；4-社交日志）
     * @param Openid 用户的openid
     * @param AccessToken 用户的access_token
     * @return true表示图片安全，false表示图片有风险
     */
    public boolean checkImageContent(String mediaUrl, int scene, String Openid, String AccessToken) {
        try {
            Map<String, String> params = new HashMap<>();
            params.put("media_url", mediaUrl);
            params.put("media_type", "2");
            params.put("version", "2");
            params.put("scene", String.valueOf(scene));
            params.put("openid", Openid);

            String response = HttpClientUtil.doPost4Json(WX_MEDIA_SEC_CHECK + "?access_token=" + AccessToken, params);
            JSONObject jsonResponse = JSONObject.parseObject(response);
            int errcode = jsonResponse.getIntValue("errcode");

            if (errcode != 0) {
                String errmsg = jsonResponse.getString("errmsg");
                throw new TeapotException(MessageConstant.CONTENT_UNSECURED + ": " + errmsg);
            }

            JSONObject result = jsonResponse.getJSONObject("result");
            String suggest = result.getString("suggest");
            log.info("检测结果：" + suggest);
            return "pass".equals(suggest);
        } catch (Exception e) {
            log.info("检测图片内容失败:{}",e.getMessage());
            throw new TeapotException(MessageConstant.CONTENT_UNSECURED);
        }
    }
}
