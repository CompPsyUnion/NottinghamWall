package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.StudentDTO;
import cn.yiming1234.NottinghamWall.dto.StudentLoginDTO;
import cn.yiming1234.NottinghamWall.dto.StudentPageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import cn.yiming1234.NottinghamWall.result.PageResult;

import java.io.IOException;

public interface StudentService {
    /**
     * 微信登录
     *
     * @param studentLoginDTO
     * @return
     */
    Student wxLogin(StudentLoginDTO studentLoginDTO);
    /**
     * 微信获取手机号
     *
     * @param code
     * @return
     */
    String getPhoneNumber(String code, Long id) throws IOException;
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
     * 更新学生手机号
     *
     * @param id
     * @param phoneNumber
     */
    void updatePhoneNumber(Long id, String phoneNumber);
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
