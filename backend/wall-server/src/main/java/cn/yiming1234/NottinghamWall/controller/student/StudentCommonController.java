package cn.yiming1234.NottinghamWall.controller.student;

import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
     *
     * @param files
     * @return
     */
    @PostMapping("/upload")
    @ApiOperation(value = "学生上传文件")
    public Result<List<String>> upload(@RequestParam("files") MultipartFile[] files) {
        //支持多图片上传
        List<String> filePaths = new ArrayList<>();
        for (MultipartFile file : files) {
            log.info("上传成功:{}", file);
            try {
                String originalFilename = file.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String objectName = UUID.randomUUID() + extension;
                String filePath = aliOssUtil.upload(file.getBytes(), objectName);
                filePaths.add(filePath);
            } catch (IOException e) {
                log.error("上传文件失败", e);
            }
        }
        return Result.success(filePaths);
    }
    /**
     * 学生删除文件
     *
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @ApiOperation(value = "学生删除文件")
    public Result<List<String>> delete(@RequestBody() Map<String, String> request) {
        String urlToDelete = request.get("url");
        log.info("删除文件:{}", urlToDelete);
        List<String> filePaths = new ArrayList<>();
        try {
            String objectName = urlToDelete.substring(urlToDelete.lastIndexOf("/") + 1);
            aliOssUtil.delete(objectName);
            filePaths.add(urlToDelete);
        } catch (Exception e) {
            log.error("删除文件失败", e);
        }
        return Result.success(filePaths);
    }
}