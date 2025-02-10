package cn.yiming1234.NottinghamWall.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Topic implements Serializable {

    private static final long serialVersionUID = 1L;
    private Integer id;
    private String content;
    private Integer authorID;
    private String username;
    private String avatar;
    private List<String> imgURLs;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDraft;
    private Integer likeCount;
    private Integer commentCount;
    private Integer collectCount;
    private Boolean isLiked;
    private Boolean isCollected;
}