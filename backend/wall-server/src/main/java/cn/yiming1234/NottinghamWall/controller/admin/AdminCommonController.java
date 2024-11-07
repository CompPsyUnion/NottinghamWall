package cn.yiming1234.NottinghamWall.controller.admin;

import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/**
 * 公共控制器
 */
@RestController
@RequestMapping("admin/common")
@Api(tags = "用户端公共接口")
@Slf4j
public class AdminCommonController {

    @Autowired
    private AliOssUtil aliOssUtil;

    /**
     * 管理员上传文件
     *
     * @param file
     * @return
     */
    @PostMapping("/upload")
    @ApiOperation(value = "管理员上传文件")
    public Result<String> upload(MultipartFile file) {
        log.info("上传成功:{}",file);

        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String objectName = UUID.randomUUID() + extension;
            String filePath = aliOssUtil.upload(file.getBytes(), objectName);
            return Result.success(filePath);
        } catch (IOException e) {
            log.error("上传文件失败", e);
        }

        return null;
    }
    /**
     * 管理员删除文件
     *
     * @param file
     */
    @PostMapping("/delete")
    @ApiOperation(value = "管理员删除文件")
    public Result<String> delete(String file) {
        log.info("删除文件:{}",file);
        aliOssUtil.delete(file);
        return Result.success();
    }
}
