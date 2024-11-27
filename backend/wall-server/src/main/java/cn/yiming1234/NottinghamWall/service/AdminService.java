package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.AdminDTO;
import cn.yiming1234.NottinghamWall.dto.AdminLoginDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Admin;
import cn.yiming1234.NottinghamWall.result.PageResult;

public interface AdminService {

    /**
     * 管理员登录
     */
    Admin login(AdminLoginDTO adminLoginDTO);

    /**
     * 新增管理员
     */
    void save(AdminDTO adminDTO);

    /**
     * 启用禁用管理员
     */
    void startOrStop(Integer status, Integer id);

    /**
     * 分页查询管理员
     */
    PageResult<Admin> pageQuery(PageQueryDTO PageQueryDTO);

    /**
     * 根据id查询管理员
     */
    Admin getById(Integer id);

    /**
     * 修改管理员
     */
    void update(AdminDTO adminDTO);

    /**
     * 修改密码
     */
    void updatePassword(Integer adminId, String oldPassword, String newPassword, String confirmPassword);
}
