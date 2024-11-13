package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

/**
 * 公共控制器
 */
@RestController
@RequestMapping("/student/common")
@Api(tags = "用户端公共接口")
@Slf4j
public class StudentCommonController {

    @Autowired
    private AliOssUtil aliOssUtil;

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    @ApiOperation(value = "学生上传文件")
    public Result<List<String>> upload(@RequestParam("files") MultipartFile[] files) {
        List<String> filePaths = new ArrayList<>();
        for (MultipartFile file : files) {
            log.info("准备上传文件: {}", file.getOriginalFilename());
            try {
                String originalFilename = file.getOriginalFilename();
                String extension = null;
                if (originalFilename != null) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
                }
                if (extension != null && isImageFile(extension)) {
                    log.info("文件 {} 是图片，开始压缩", originalFilename);
                    byte[] compressedBytes = compressImage(file);
                    if (compressedBytes == null) {
                        log.warn("图片压缩失败，使用原始文件上传: {}", originalFilename);
                        compressedBytes = file.getBytes();
                    }
                    String objectName = UUID.randomUUID() + extension;
                    String filePath = aliOssUtil.upload(compressedBytes, objectName);
                    filePaths.add(filePath);
                    log.info("图片上传成功: {}", filePath);
                }
            } catch (IOException e) {
                log.error("上传文件失败: {}", file.getOriginalFilename(), e);
            }
        }
        return Result.success(filePaths);
    }

    /**
     * 删除文件
     */
    @PostMapping("/delete")
    @ApiOperation(value = "学生删除文件")
    public Result<List<String>> delete(@RequestBody() Map<String, String> request) {
        String urlToDelete = request.get("url");
        log.info("删除文件: {}", urlToDelete);
        List<String> filePaths = new ArrayList<>();
        try {
            String objectName = urlToDelete.substring(urlToDelete.lastIndexOf("/") + 1);
            aliOssUtil.delete(objectName);
            filePaths.add(urlToDelete);
            log.info("文件删除成功: {}", urlToDelete);
        } catch (Exception e) {
            log.error("删除文件失败: {}", urlToDelete, e);
        }
        return Result.success(filePaths);
    }

    /**
     * 判断文件是否为图片格式
     */
    private boolean isImageFile(String extension) {
        return extension.equals(".jpg") || extension.equals(".jpeg") || extension.equals(".png");
    }

    /**
     * 压缩图片
     */
    private byte[] compressImage(MultipartFile file) {
        try {
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
            if (bufferedImage == null) {
                log.warn("无法读取图片内容: {}", file.getOriginalFilename());
                return null;
            }

            int width = bufferedImage.getWidth();
            int height = bufferedImage.getHeight();
            if (width > 800) {
                double aspectRatio = (double) height / width;
                width = 800;
                height = (int) (width * aspectRatio);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Thumbnails.of(bufferedImage)
                    .size(width, height)
                    .outputQuality(0.8)
                    .outputFormat(getFormatName(Objects.requireNonNull(file.getOriginalFilename())))
                    .toOutputStream(baos);

            return baos.toByteArray();
        } catch (IOException e) {
            log.error("压缩图片失败: {}", file.getOriginalFilename(), e);
            return null;
        }
    }

    /**
     * 获取图片格式名称
     */
    private String getFormatName(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        switch (extension) {
            case "png":
                return "png";
            case "jpg":
            case "jpeg":
            default:
                return "jpg";
        }
    }
}
