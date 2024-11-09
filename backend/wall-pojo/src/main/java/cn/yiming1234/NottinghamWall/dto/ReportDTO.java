package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

@Data
public class ReportDTO {

    private Integer id;
    private Integer topicId;
    private Integer commentId;
    private Integer authorId;
    private Integer userId;
    private String tags;
    private String detailedDescription;

}
