package cn.yiming1234.NottinghamWall.exception;

/**
 * 登录失败
 */
public class LoginFailedException extends BaseException{
    public LoginFailedException(String msg){
        super(msg);
    }
}
