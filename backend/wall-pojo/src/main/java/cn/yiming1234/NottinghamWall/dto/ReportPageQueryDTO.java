package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

@Data
public class ReportPageQueryDTO {

    private String tags;
    private int page;
    private int pageSize;

}
