package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PageQueryDTO implements Serializable {

    private String name;
    private String tags;
    private String username;
    private Integer page;
    private Integer pageSize;

}
