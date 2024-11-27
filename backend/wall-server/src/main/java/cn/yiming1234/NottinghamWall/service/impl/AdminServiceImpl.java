package cn.yiming1234.NottinghamWall.service.impl;

import cn.yiming1234.NottinghamWall.constant.MessageConstant;
import cn.yiming1234.NottinghamWall.constant.PasswordConstant;
import cn.yiming1234.NottinghamWall.constant.StatusConstant;
import cn.yiming1234.NottinghamWall.dto.AdminDTO;
import cn.yiming1234.NottinghamWall.dto.AdminLoginDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Admin;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.exception.AccountLockedException;
import cn.yiming1234.NottinghamWall.exception.AccountNotFoundException;
import cn.yiming1234.NottinghamWall.exception.PasswordErrorException;
import cn.yiming1234.NottinghamWall.mapper.AdminMapper;
import cn.yiming1234.NottinghamWall.result.PageResult;
import cn.yiming1234.NottinghamWall.service.AdminService;
import cn.yiming1234.NottinghamWall.utils.AliOssUtil;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {

    private final AdminMapper adminMapper;
    private final AliOssUtil aliOssUtil;

    @Autowired
    public AdminServiceImpl(AdminMapper adminMapper, AliOssUtil aliOssUtil) {
        this.adminMapper = adminMapper;
        this.aliOssUtil = aliOssUtil;
    }

    private void processPostImages(List<Topic> posts) {
        posts.forEach(topic -> {
            if (topic != null && topic.getImgURLs() != null) {
                List<String> signedUrls = topic.getImgURLs().stream()
                        .map(aliOssUtil::generatePresignedUrl)
                        .collect(Collectors.toList());
                topic.setImgURLs(signedUrls);
            }
        });
    }

    /**
     * 管理员登录
     * @param adminLoginDTO 登录信息
     * @return 管理员信息
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
     * @param adminDTO 管理员信息
     */
    @Override
    public void save(AdminDTO adminDTO) {
        Admin admin = new Admin();

        BeanUtils.copyProperties(adminDTO, admin);
        admin.setStatus(StatusConstant.ENABLE);
        admin.setPassword(DigestUtils.md5DigestAsHex(PasswordConstant.DEFAULT_PASSWORD.getBytes()));

        adminMapper.insert(admin);
    }

    /**
     * 管理员分页查询
     * @param pageQueryDTO 分页查询参数
     * @return 分页查询结果
     */
    @Override
    public PageResult<Admin> pageQuery(PageQueryDTO pageQueryDTO) {
        PageHelper.startPage(pageQueryDTO.getPage(), pageQueryDTO.getPageSize());
        Page<Admin> page = adminMapper.pageQuery(pageQueryDTO);

        long total = page.getTotal();
        List<Admin> records = page.getResult();
        return new PageResult<>(total, records);
    }

    /**
     * 启用禁用管理员
     * @param status 状态
     * @param id 管理员id
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
     * @param id 管理员id
     * @return 管理员信息
     */
    @Override
    public Admin getById(Integer id) {
        Admin admin = adminMapper.getById(id);
        admin.setPassword("******");
        return admin;
    }

    /**
     * 修改管理员
     * @param adminDTO 管理员信息
     */
    @Override
    public void update(AdminDTO adminDTO) {
        Admin admin = new Admin();
        BeanUtils.copyProperties(adminDTO, admin);
        adminMapper.update(admin);
    }
}
