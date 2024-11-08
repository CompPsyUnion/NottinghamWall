package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class StudentPageQueryDTO implements Serializable {

    private String username;
    private int page;
    private int pageSize;

}
