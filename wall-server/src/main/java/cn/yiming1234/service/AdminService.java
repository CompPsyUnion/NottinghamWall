package cn.yiming1234.service;

import cn.yiming1234.dto.AdminDTO;
import cn.yiming1234.dto.AdminLoginDTO;
import cn.yiming1234.dto.AdminPageQueryDTO;
import cn.yiming1234.entity.Admin;
import cn.yiming1234.result.PageResult;

public interface AdminService {
    /**
     * 管理员登录
     * @param adminLoginDTO
     * @return
     */
    Admin login(AdminLoginDTO adminLoginDTO);
    /**
     * 新增管理员
     * @param adminDTO
     */
    void save(AdminDTO adminDTO);
    /**
     * 启用禁用管理员
     * @param status
     * @param id
     */
    void startOrStop(Integer status, Long id);
    /**
     * 分页查询管理员
     * @param adminPageQueryDTO
     * @return
     */
    PageResult pageQuery(AdminPageQueryDTO adminPageQueryDTO);
    /**
     * 根据id查询管理员
     * @param id
     * @return
     */
    Admin getById(Long id);
    /**
     * 修改管理员
     * @param adminDTO
     */
    void update(AdminDTO adminDTO);
}
