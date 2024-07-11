package cn.yiming1234.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 学生登录VO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentLoginVO implements Serializable {

        private Long id;
        private String openid;
        private String token;
}
