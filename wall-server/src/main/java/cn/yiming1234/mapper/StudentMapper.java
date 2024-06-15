package cn.yiming1234.mapper;

import cn.yiming1234.entity.Student;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface StudentMapper {
    @Select("select * from student where openid = #{openid}")
    Student findByOpenid(String openid);

    /**
     * 插入学生信息
     *
     * @param student
     */
    void insert(Student student);
}
