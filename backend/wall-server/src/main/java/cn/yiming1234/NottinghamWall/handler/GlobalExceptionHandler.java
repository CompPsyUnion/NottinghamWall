package cn.yiming1234.NottinghamWall.handler;

import cn.yiming1234.NottinghamWall.exception.BaseException;
import cn.yiming1234.NottinghamWall.exception.TeapotException;
import cn.yiming1234.NottinghamWall.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器，处理项目中抛出的业务异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 捕获业务异常
     */
    @ExceptionHandler
    public Result exceptionHandler(BaseException ex){
        log.error("异常信息：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }

    /**
     * 捕获TeapotException异常
     */
    @ExceptionHandler(TeapotException.class)
    public Result teapotExceptionHandler(TeapotException ex){
        log.error("异常信息：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }
}
