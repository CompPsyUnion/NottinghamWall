package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TopicDTO implements Serializable {

    private Integer id;
    private String content;
    private List<String> imgURLs;
    private Integer authorID;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDraft;

}
