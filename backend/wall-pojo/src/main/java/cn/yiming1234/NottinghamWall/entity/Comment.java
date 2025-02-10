package cn.yiming1234.NottinghamWall.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Comment {

    private Integer id;
    private Integer topicId;
    private Integer userId;
    private String username;
    private String avatar;
    private String content;
    private boolean isLiked;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
