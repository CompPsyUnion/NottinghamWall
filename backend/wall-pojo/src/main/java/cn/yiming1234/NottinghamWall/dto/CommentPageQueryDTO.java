package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

@Data
public class CommentPageQueryDTO {
    private String topicId;  // 话题ID
    private int page;        // 页码
    private int size;        // 每页大小
}