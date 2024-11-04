package cn.yiming1234.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDTO {

    private Integer id;        // 评论ID
    private Integer topicId;  // 话题ID
    private Integer userId;    // 用户ID
    private String content;    // 评论内容
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private StudentDTO user;    // 用户信息

}
