package cn.yiming1234.NottinghamWall.exception;

/**
 * 账号被锁定异常
 */
public class AccountLockedException extends BaseException {

    public AccountLockedException(String msg) {
        super(msg);
    }

}
