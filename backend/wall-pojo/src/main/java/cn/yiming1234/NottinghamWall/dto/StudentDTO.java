package cn.yiming1234.NottinghamWall.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)

public class StudentDTO implements Serializable {

    private Integer id;
    private Integer studentid;
    private String username;
    private String name;
    private String avatar;
    private String email;
    private String phone;
    private String sex;
    private String idNumber;

    /**
     * 重写toString方法
     * @return
     */
    @Override
    @ToString.Include
    public String toString() {
        StringBuilder sb = new StringBuilder("StudentDTO{");
        sb.append("id=").append(id);
        if (studentid != null) sb.append(", studentid='").append(studentid).append('\'');
        if (username != null) sb.append(", username='").append(username).append('\'');
        if (name != null) sb.append(", name='").append(name).append('\'');
        if (avatar != null) sb.append(", avatar='").append(avatar).append('\'');
        if (email != null) sb.append(", email='").append(email).append('\'');
        if (phone != null) sb.append(", phone='").append(phone).append('\'');
        if (sex != null) sb.append(", sex='").append(sex).append('\'');
        if (idNumber != null) sb.append(", idNumber='").append(idNumber).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
