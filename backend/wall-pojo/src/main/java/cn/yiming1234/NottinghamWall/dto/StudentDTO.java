package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class StudentDTO implements Serializable {
    private Long id;

    private String studentid;

    private String username;

    private String name;

    private String avatar;

    private String email;

    private String phone;

    private String sex;

    private String idNumber;
}
