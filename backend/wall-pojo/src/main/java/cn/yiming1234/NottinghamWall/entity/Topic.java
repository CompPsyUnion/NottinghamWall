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

    private Long id;

    private String content;

    private String authorID;

    private List<String> imgURLs;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
