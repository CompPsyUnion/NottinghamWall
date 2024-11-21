package cn.yiming1234.NottinghamWall.service;

import cn.yiming1234.NottinghamWall.dto.StudentDTO;
import cn.yiming1234.NottinghamWall.dto.StudentLoginDTO;
import cn.yiming1234.NottinghamWall.dto.PageQueryDTO;
import cn.yiming1234.NottinghamWall.entity.Student;
import cn.yiming1234.NottinghamWall.entity.Topic;
import cn.yiming1234.NottinghamWall.result.PageResult;
import com.aliyuncs.exceptions.ClientException;

import java.io.IOException;

public interface StudentService {

    /**
     * 微信登录
     * @param studentLoginDTO 学生登录信息
     */
    Student wxLogin(StudentLoginDTO studentLoginDTO);

    /**
     * 微信获取手机号
     * @param code 微信登录凭证
     */
    String getPhoneNumber(String code, Integer id) throws IOException;

    /**
     * 分页查询学生
     * @param pageQueryDTO 分页查询条件
     */
    PageResult<Student> pageQuery(PageQueryDTO pageQueryDTO);

    /**
     * 更新学生信息
     * @param studentDTO 学生信息
     */
    Student update(StudentDTO studentDTO) throws Exception;

    /**
     * 更新学生手机号
     * @param id 学生id
     */
    void updatePhoneNumber(Integer id, String phoneNumber);

    /**
     * 根据id查询学生
     * @param id 学生id
     */
    Student getById(Integer id) throws ClientException;

    /**
     * 根据用户名查询学生
     * @param username 用户名
     */
    Student getByUsername(String username);

    /**
     * 根据学号查询学生
     * @param studentId 学号
     */
    Student getByStudentId(Integer studentId);

    /**
     * 根据邮箱查询学生
     * @param email 邮箱
     */
    Student getByEmail(String email);

    /**
     * 查询发布的帖子（分页）
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     */
    PageResult<Topic> getPublishedPosts(Integer id, int page, int pageSize);

    /**
     * 查询评论的帖子（分页）
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     */
    PageResult<Topic> getCommentedPosts(Integer id, int page, int pageSize);

    /**
     * 查询收藏的帖子（分页）
     * @param id 学生id
     * @param page 页码
     * @param pageSize 每页大小
     */
    PageResult<Topic> getCollectedPosts(Integer id, int page, int pageSize);

}
