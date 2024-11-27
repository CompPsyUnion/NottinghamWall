package cn.yiming1234.NottinghamWall.dto;

import lombok.Data;

@Data
public class UpdatePasswordDTO {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}