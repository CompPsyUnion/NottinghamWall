package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TopicPageQueryDTO implements Serializable {

    // 用户名
    private String username;

    //页码
    private int page;

    //每页显示记录数
    private int pageSize;

}
