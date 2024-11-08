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
     *
     * @param adminLoginDTO
     * @return
     */
    @Override
    public Admin login(AdminLoginDTO adminLoginDTO) {
        String username = adminLoginDTO.getUsername();
        String password = adminLoginDTO.getPassword();

        //1、根据用户名查询数据库中的数据
        Admin admin = adminMapper.getByUsername(username);

        //2、处理各种异常情况（用户名不存在、密码不对、账号被锁定）
        if (admin == null) {
            //账号不存在
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }

        //密码比对
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!password.equals(admin.getPassword())) {
            //密码错误
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }

        if (admin.getStatus().equals(StatusConstant.DISABLE)) {
            //账号被锁定
            throw new AccountLockedException(MessageConstant.ACCOUNT_LOCKED);
        }

        //3、返回实体对象
        return admin;
    }
    /**
     * 新增管理员
     *
     * @param adminDTO
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
     * @param adminPageQueryDTO
     * @return
     */
    @Override
    public PageResult pageQuery(AdminPageQueryDTO adminPageQueryDTO) {
        //开始分页查询
        PageHelper.startPage(adminPageQueryDTO.getPage(), adminPageQueryDTO.getPageSize());

        Page<Admin> page = adminMapper.pageQuery(adminPageQueryDTO);

        //返回分页结果
        long total = page.getTotal();
        List<Admin> records = page.getResult();
        return new PageResult(total, records);
    }
    /**
     * 启用禁用管理员
     *
     * @param status
     * @param id
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
     *
     * @param id
     * @return
     */
    @Override
    public Admin getById(Integer id) {
        Admin admin = adminMapper.getById(id);
        admin.setPassword("******");
        return admin;
    }
    /**
     * 修改管理员
     *
     * @param adminDTO
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
