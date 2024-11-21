package cn.yiming1234.NottinghamWall.utils;

import com.alibaba.fastjson.JSON;
import com.aliyun.green20220302.Client;
import com.aliyun.green20220302.models.ImageModerationRequest;
import com.aliyun.green20220302.models.ImageModerationResponse;
import com.aliyun.teaopenapi.models.Config;
import com.aliyun.teautil.models.RuntimeOptions;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 阿里云图片内容审核工具类
 */
@Slf4j
public class ImageCheckUtil {

    public static Client createClient(String accessKeyId, String accessKeySecret, String endpoint, String ossObjectName) throws Exception {
        Config config = new Config();
        config.setAccessKeyId(accessKeyId);
        config.setAccessKeySecret(accessKeySecret);
        config.setEndpoint(endpoint);
        return new Client(config);
    }

    public static ImageModerationResponse invokeFunction(String accessKeyId, String accessKeySecret, String endpoint, String ossObjectName) throws Exception {
        Client client = createClient(accessKeyId, accessKeySecret, endpoint, ossObjectName);
        RuntimeOptions runtime = new RuntimeOptions();

        Map<String, String> serviceParameters = new HashMap<>();
        serviceParameters.put("dataId", UUID.randomUUID().toString());
        serviceParameters.put("ossRegionId", "cn-beijing");
        serviceParameters.put("ossBucketName", "yiming1234");
        serviceParameters.put("ossObjectName", ossObjectName);

        ImageModerationRequest request = new ImageModerationRequest();
        request.setService("baselineCheck");
        request.setServiceParameters(JSON.toJSONString(serviceParameters));

        ImageModerationResponse response = null;
        try {
            response = client.imageModerationWithOptions(request, runtime);
            log.info("response:{}", response.toString());
        } catch (Exception e) {
            log.error("invoke function error:{}", e.getMessage());
        }
        return response;
    }

}
