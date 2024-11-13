package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import com.github.pagehelper.Page;
import cn.yiming1234.NottinghamWall.annotation.AutoFill;
import cn.yiming1234.NottinghamWall.entity.Admin;
import cn.yiming1234.NottinghamWall.enumeration.OperationType;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    /**
     * 根据用户名查询管理员
     */
    Admin getByUsername(String username);

    /**
     * 根据id查询管理员
     */
    Admin getById(Integer id);

    /**
     * 分页查询管理员
     */
    Page<Admin> pageQuery(PageQueryDTO pageQueryDTO);

    /**
     * 新增管理员
     */
    @AutoFill(value = OperationType.INSERT)
    void insert(Admin admin);

    /**
     * 修改管理员
     */
    @AutoFill(value = OperationType.UPDATE)
    void update(Admin admin);
}
