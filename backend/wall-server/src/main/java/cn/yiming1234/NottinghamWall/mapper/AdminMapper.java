package cn.yiming1234.NottinghamWall.mapper;

import com.github.pagehelper.Page;
import cn.yiming1234.NottinghamWall.annotation.AutoFill;
import cn.yiming1234.NottinghamWall.dto.AdminPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Admin;
import cn.yiming1234.NottinghamWall.enumeration.OperationType;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminMapper {
    /**
     * 根据用户名查询管理员
     */
    @Select("select * from admin where username = #{username}")
    Admin getByUsername(String username);

    /**
     * 根据id查询管理员
     */
    @Select("select * from admin where id = #{id}")
    Admin getById(Integer id);

    /**
     * 分页查询管理员
     */
    Page<Admin> pageQuery(AdminPageQueryDTO adminPageQueryDTO);

    /**
     * 新增管理员
     */
    @Insert("insert into admin(name, username, password, phone, sex, id_number, create_time, update_time, create_user, update_user) " +
            "values"+"(#{name}, #{username}, #{password}, #{phone}, #{sex}, #{idNumber}, #{createTime}, #{updateTime}, #{createUser}, #{updateUser})")
    @AutoFill(value = OperationType.INSERT)
    void insert(Admin admin);

    /**
     * 修改管理员
     */
    @AutoFill(value = OperationType.UPDATE)
    void update(Admin admin);
}
