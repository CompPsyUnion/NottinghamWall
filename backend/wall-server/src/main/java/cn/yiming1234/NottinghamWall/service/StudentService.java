package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.StudentDTO;
import cn.yiming1234.NottinghamWall.dto.StudentLoginDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;

import java.io.IOException;

public interface StudentService {

    /**
     * 微信登录
     */
    Student wxLogin(StudentLoginDTO studentLoginDTO);

    /**
     * 微信获取手机号
     */
    String getPhoneNumber(String code, Integer id) throws IOException;

    /**
     * 分页查询学生
     */
    PageResult pageQuery(PageQueryDTO pageQueryDTO);

    /**
     * 更新学生信息
     */
    Student update(StudentDTO studentDTO);

    /**
     * 更新学生手机号
     */
    void updatePhoneNumber(Integer id, String phoneNumber);

    /**
     * 根据id查询学生
     */
    Student getById(Integer id);

    /**
     * 根据用户名查询学生
     */
    Student getByUsername(String username);

    /**
     * 根据学号查询学生
     */
    Student getByStudentId(Integer studentId);

    /**
     * 根据邮箱查询学生
     */
    Student getByEmail(String email);

    /**
     * 查询发布的帖子（分页）
     */
    PageResult<Topic> getPublishedPosts(Integer id, int page, int pageSize);

    /**
     * 查询评论的帖子（分页）
     */
    PageResult<Topic> getCommentedPosts(Integer id, int page, int pageSize);

    /**
     * 查询收藏的帖子（分页）
     */
    PageResult<Topic> getCollectedPosts(Integer id, int page, int pageSize);

}
