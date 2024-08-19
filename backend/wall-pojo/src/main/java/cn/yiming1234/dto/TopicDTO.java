package cn.yiming1234.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TopicDTO implements Serializable {
    private Long id;

    private String content;

    private List<String> imgURLs;

    private String authorID;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
