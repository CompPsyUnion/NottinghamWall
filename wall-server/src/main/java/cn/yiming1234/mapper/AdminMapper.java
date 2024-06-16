package cn.yiming1234.mapper;

import com.github.pagehelper.Page;
import cn.yiming1234.annotation.AutoFill;
import cn.yiming1234.dto.AdminPageQueryDTO;
import cn.yiming1234.entity.Admin;
import cn.yiming1234.enumeration.OperationType;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminMapper {
    /**
     * 根据用户名查询管理员
     * @param username
     * @return
     */
    @Select("select * from admin where username = #{username}")
    Admin getByUsername(String username);
    /**
     * 根据id查询管理员
     * @param id
     * @return
     */
    @Select("select * from admin where id = #{id}")
    Admin getById(Long id);
    /**
     * 分页查询管理员
     * @param adminPageQueryDTO
     * @return
     */
    Page<Admin> pageQuery(AdminPageQueryDTO adminPageQueryDTO);
    /**
     * 新增管理员
     * @param admin
     */
    @Insert("insert into admin(name, username, password, phone, sex, id_number, create_time, update_time, create_user, update_user) " +
            "values"+"(#{name}, #{username}, #{password}, #{phone}, #{sex}, #{idNumber}, #{createTime}, #{updateTime}, #{createUser}, #{updateUser})")
    @AutoFill(value = OperationType.INSERT)
    void insert(Admin admin);
    /**
     * 修改管理员
     * @param admin
     */
    @AutoFill(value = OperationType.UPDATE)
    void update(Admin admin);
}
