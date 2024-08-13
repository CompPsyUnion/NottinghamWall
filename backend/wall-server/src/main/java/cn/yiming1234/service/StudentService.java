package cn.yiming1234.service;

import cn.yiming1234.dto.*;
import cn.yiming1234.entity.Student;
import cn.yiming1234.result.PageResult;
import org.springframework.beans.BeanUtils;

public interface StudentService {
    /**
     * 微信登录
     *
     * @param studentLoginDTO
     * @return
     */
    Student wxLogin(StudentLoginDTO studentLoginDTO);
    /**
     * 分页查询学生
     * @param studentPageQueryDTO
     * @return
     */
    PageResult pageQuery(StudentPageQueryDTO studentPageQueryDTO);
    /**
     * 更新学生信息
     * @param studentDTO
     * @return
     */
    Student update(StudentDTO studentDTO);
    /**
     * 根据id查询学生
     * @param id
     * @return
     */
    Student getById(Long id);
    /**
     * 根据学号查询学生
     * @param studentId
     * @return
     */
    Student getByStudentId(Long studentId);
    /**
     * 根据邮箱查询学生
     * @param email
     * @return
     */
    Student getByEmail(String email);
}
