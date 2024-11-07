package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentDTO {

    private Integer id;        // 评论ID
    private Integer topicId;  // 话题ID
    private Integer userId;    // 用户ID
    private String content;    // 评论内容
    private Integer parentId; // 父评论ID
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private StudentDTO user;    // 用户信息
    private List<CommentDTO> replies;

}
