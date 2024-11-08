package cn.yiming1234.NottinghamWall.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Report {

    private Integer id;
    private Integer topicId;
    private Integer commentId;
    private Integer userId;
    private LocalDateTime reportTime;
    private String tags;
    private String detailedDescription;

}
