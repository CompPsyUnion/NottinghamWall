package cn.yiming1234.NottinghamWall.controller.admin;

import cn.yiming1234.NottinghamWall.constant.JwtClaimsConstant;
import cn.yiming1234.NottinghamWall.dto.AdminDTO;
import cn.yiming1234.NottinghamWall.dto.AdminLoginDTO;
import cn.yiming1234.NottinghamWall.dto.AdminPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Admin;
import cn.yiming1234.NottinghamWall.properties.JwtProperties;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.result.Result;
import cn.yiming1234.NottinghamWall.service.AdminService;
import cn.yiming1234.NottinghamWall.utils.JwtUtil;
import cn.yiming1234.NottinghamWall.vo.AdminLoginVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * 管理员管理
 */
@RestController
@RequestMapping("/admin/manage")
@Slf4j
@Api(tags = "管理端管理员接口")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private JwtProperties jwtProperties;
    /**
     * 登录
     *
     * @param adminLoginDTO
     * @return
     */
    @PostMapping("/login")
    @ApiOperation(value = "登录")
    public Result<AdminLoginVO> login(@RequestBody AdminLoginDTO adminLoginDTO) {
        log.info("管理员登录：{}", adminLoginDTO);
        Admin admin = adminService.login(adminLoginDTO);

        //登录成功后，生成jwt令牌
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.EMP_ID, admin.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getAdminSecretKey(),
                jwtProperties.getAdminTtl(),
                claims);
        log.info("token:{}", token);
        AdminLoginVO adminLoginVO = AdminLoginVO.builder()
                .id(admin.getId())
                .userName(admin.getUsername())
                .name(admin.getName())
                .token(token)
                .build();

        return Result.success(adminLoginVO);
    }
    /**
     * 退出
     *
     * @return
     */
    @PostMapping("/logout")
    @ApiOperation(value = "退出")
    public Result<String> logout() {
        return Result.success();
    }
    /**
     * 新增管理员
     * @param adminDTO
     * @return
     */
    @PostMapping
    @ApiOperation("新增管理员")
    public Result save(@RequestBody AdminDTO adminDTO){
        log.info("新增管理员：{}", adminDTO);
        //System.out.println("当前线程的id："+Thread.currentThread().getId());
        adminService.save(adminDTO);
        return Result.success();
    }
    /**
     * 启用或停用管理员
     * @param id
     * @return
     */
    @PostMapping("/status/{status}")
    @ApiOperation("启用或停用管理员")
    public Result startOrStop(@PathVariable Integer status, Integer id){
        //log.info("启用或停用管理员：{}", id);
        adminService.startOrStop(status, id);
        return Result.success();
    }
    /**
     * 管理员分页查询
     * @param adminPageQueryDTO
     * @return
     */
    @GetMapping("/page")
    @ApiOperation("分页查询管理员")
    public Result<PageResult> page(AdminPageQueryDTO adminPageQueryDTO){
        log.info("管理员分页查询：{}", adminPageQueryDTO);
        PageResult pageResult = adminService.pageQuery(adminPageQueryDTO);
        return Result.success(pageResult);
    }
    /**
     * 根据id查询管理员
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    @ApiOperation("根据id查询管理员")
    public Result<Admin> getById(@PathVariable Integer id){
        Admin admin = adminService.getById(id);
        return Result.success(admin);
    }
    /**
     * 修改管理员
     * @param adminDTO
     * @return
     */
    @PutMapping
    @ApiOperation("修改管理员")
    public Result update(@RequestBody AdminDTO adminDTO){
        log.info("修改管理员：{}", adminDTO);
        adminService.update(adminDTO);
        return Result.success();
    }
}
