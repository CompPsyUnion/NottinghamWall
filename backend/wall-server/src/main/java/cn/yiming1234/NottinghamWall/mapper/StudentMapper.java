package cn.yiming1234.NottinghamWall.mapper;

import cn.yiming1234.NottinghamWall.dto.StudentPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StudentMapper {
    /**
     * 插入学生信息
     *
     * @param student
     */
    void insert(Student student);

    /**
     * 根据用户名查询管学生
     * @param username
     * @return
     */
    @Select("select * from student where username = #{username}")
    Student getByUsername(String username);

    /**
     * 根据id查询学生
     * @param id
     * @return
     */
    @Select("select * from student where id = #{id}")
    Student getById(Integer id);

    /**
     * 根据ids查询学生
     * @param userIds
     * @return
     */
    @Select({
            "<script>",
            "SELECT * FROM student WHERE id IN ",
            "<foreach item='id' collection='userIds' open='(' separator=',' close=')'>",
            "#{id}",
            "</foreach>",
            "</script>"
    })
    List<Student> getByIds(@Param("userIds") List<Integer> userIds);

    /**
     * 根据openid查询学生
     * @param openid
     * @return
     */
    @Select("select * from student where openid = #{openid}")
    Student findByOpenid(String openid);

    /**
     * 根据学号查询学生
     * @param studentid
     * @return
     */
    @Select("select * from student where studentid = #{studentid}")
    Student getByStudentId(Integer studentid);

    /**
     * 分页查询学生
     * @param studentPageQueryDTO
     * @return
     */
    Page<Student> pageQuery(StudentPageQueryDTO studentPageQueryDTO);

    /**
     * 根据邮箱查询学生
     * @param email
     * @return
     */
    Student getByEmail(String email);

    /**
     * 更新学生信息
     *
     * @param student
     */
    void updateById(Student student);

}