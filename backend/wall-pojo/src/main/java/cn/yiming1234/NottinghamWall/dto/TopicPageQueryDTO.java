package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TopicPageQueryDTO implements Serializable {

    private String username;
    private Integer page;
    private Integer pageSize;

}
