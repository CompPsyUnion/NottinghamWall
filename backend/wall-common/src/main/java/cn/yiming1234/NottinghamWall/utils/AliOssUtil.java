package cn.yiming1234.NottinghamWall.utils;

import com.aliyun.oss.*;
import com.aliyun.oss.common.comm.SignVersion;

import com.aliyun.oss.model.CannedAccessControlList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayInputStream;
import java.net.URL;
import java.util.Date;

/**
 * 阿里云OSS工具类
 */
@Data
@AllArgsConstructor
@Slf4j
public class AliOssUtil {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

    /**
     * 文件上传
     * @param bytes 文件字节数组
     * @param objectName 文件名
     * @return 文件访问URL
     */
    public String upload(byte[] bytes, String objectName) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(bytes));
            ossClient.setBucketAcl(bucketName, CannedAccessControlList.Private);
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        Date expiration = new Date(new Date().getTime() + 3600 * 1000L);
        URL url = ossClient.generatePresignedUrl(bucketName, objectName, expiration);

        log.info("文件上传到:{}", url);

        return url.toString();
    }

    /**
     * 文件删除
     * @param objectName 文件名
     */
    public void delete(String objectName) {
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            ossClient.deleteObject(bucketName, objectName);
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
    }

    /**
     * 生成文件访问URL
     * @param objectName 文件名
     * @return 文件访问URL
     */
    public String generatePresignedUrl(String objectName) {
        ClientBuilderConfiguration clientBuilderConfiguration = new ClientBuilderConfiguration();
        clientBuilderConfiguration.setSignatureVersion(SignVersion.V4);
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret, clientBuilderConfiguration);

        try {
            Date expiration = new Date(new Date().getTime() + 3600 * 1000L);
            URL url = ossClient.generatePresignedUrl(bucketName, objectName, expiration);
            log.info("File access URL: {}", url);
            return url.toString();
        } catch (OSSException oe) {
            log.error("Caught an OSSException: {}", oe.getErrorMessage());
        } catch (ClientException ce) {
            log.error("Caught a ClientException: {}", ce.getMessage());
        } finally {
            ossClient.shutdown();
        }
        return null;
    }
}
