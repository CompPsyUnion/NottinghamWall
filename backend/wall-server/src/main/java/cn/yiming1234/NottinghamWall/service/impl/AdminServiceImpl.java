package cn.yiming1234.NottinghamWall.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.constant.PasswordConstant;
import cn.yiming1234.NottinghamWall.constant.StatusConstant;
import cn.yiming1234.NottinghamWall.context.BaseContext;
import cn.yiming1234.NottinghamWall.dto.AdminDTO;
import cn.yiming1234.NottinghamWall.dto.AdminLoginDTO;
import cn.yiming1234.NottinghamWall.dto.AdminPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Admin;
import cn.yiming1234.NottinghamWall.exception.AccountLockedException;
import cn.yiming1234.NottinghamWall.exception.AccountNotFoundException;
import cn.yiming1234.NottinghamWall.exception.PasswordErrorException;
import cn.yiming1234.NottinghamWall.mapper.AdminMapper;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.AdminService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    /**
     * 管理员登录
     */
    @Override
    public Admin login(AdminLoginDTO adminLoginDTO) {
        String username = adminLoginDTO.getUsername();
        String password = adminLoginDTO.getPassword();

        Admin admin = adminMapper.getByUsername(username);

        if (admin == null) {
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!password.equals(admin.getPassword())) {
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }
        if (admin.getStatus().equals(StatusConstant.DISABLE)) {
            throw new AccountLockedException(MessageConstant.ACCOUNT_LOCKED);
        }

        return admin;
    }

    /**
     * 新增管理员
     */
    @Override
    public void save(AdminDTO adminDTO) {
        //System.out.println("当前线程的id："+Thread.currentThread().getId());
        //1、数据转换
        Admin admin = new Admin();
        //对象属性拷贝
        BeanUtils.copyProperties(adminDTO, admin);
        admin.setStatus(StatusConstant.ENABLE);
        admin.setPassword(DigestUtils.md5DigestAsHex(PasswordConstant.DEFAULT_PASSWORD.getBytes()));
        admin.setCreateTime(LocalDateTime.now());
        admin.setUpdateTime(LocalDateTime.now());
        admin.setCreateUser(BaseContext.getCurrentId());
        admin.setUpdateUser(BaseContext.getCurrentId());

        adminMapper.insert(admin);
    }

    /**
     * 管理员分页查询
     */
    @Override
    public PageResult pageQuery(AdminPageQueryDTO adminPageQueryDTO) {
        PageHelper.startPage(adminPageQueryDTO.getPage(), adminPageQueryDTO.getPageSize());
        Page<Admin> page = adminMapper.pageQuery(adminPageQueryDTO);

        long total = page.getTotal();
        List<Admin> records = page.getResult();
        return new PageResult(total, records);
    }

    /**
     * 启用禁用管理员
     */
    @Override
    public void startOrStop(Integer status, Integer id) {
        Admin admin = Admin.builder()
                .id(id)
                .status(status)
                .build();
        adminMapper.update(admin);
    }

    /**
     * 根据id查询管理员
     */
    @Override
    public Admin getById(Integer id) {
        Admin admin = adminMapper.getById(id);
        admin.setPassword("******");
        return admin;
    }

    /**
     * 修改管理员
     */
    @Override
    public void update(AdminDTO adminDTO) {
        Admin admin = new Admin();
        BeanUtils.copyProperties(adminDTO, admin);
        //admin.setUpdateTime(LocalDateTime.now());
        //admin.setUpdateUser(BaseContext.getCurrentId());
        adminMapper.update(admin);
    }
}
