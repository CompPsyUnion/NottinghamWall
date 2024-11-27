package cn.yiming1234.NottinghamWall;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAspectJAutoProxy
@EnableTransactionManagement
@MapperScan("cn.yiming1234.NottinghamWall.mapper")
@Slf4j
public class WallApplication {
    public static void main(String[] args) {
        SpringApplication.run(WallApplication.class, args);
        log.info("server started");
    }
}
