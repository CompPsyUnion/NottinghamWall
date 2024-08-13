package cn.yiming1234.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * 学生登录DTO
 */
@Setter
@Getter
@Data
public class StudentLoginDTO implements Serializable {

        private String code;

}
