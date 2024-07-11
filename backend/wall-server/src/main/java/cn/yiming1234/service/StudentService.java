package cn.yiming1234.service;

import cn.yiming1234.dto.AdminPageQueryDTO;
import cn.yiming1234.dto.StudentLoginDTO;
import cn.yiming1234.dto.StudentPageQueryDTO;
import cn.yiming1234.entity.Admin;
import cn.yiming1234.entity.Student;
import cn.yiming1234.result.PageResult;

public interface StudentService {
    /**
     * 微信登录
     *
     * @param studentLoginDTO
     * @return
     */
    Student wxLogin(StudentLoginDTO studentLoginDTO);
    /**
     * 分页查询用户
     * @param studentPageQueryDTO
     * @return
     */
    PageResult pageQuery(StudentPageQueryDTO studentPageQueryDTO);
    /**
     * 根据id查询用户
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
