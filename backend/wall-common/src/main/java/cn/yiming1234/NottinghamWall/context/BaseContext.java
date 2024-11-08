package cn.yiming1234.NottinghamWall.context;

public class BaseContext {

    public static ThreadLocal<Integer> threadLocal = new ThreadLocal<>();

    public static void setCurrentId(Integer id) {
        threadLocal.set(id);
    }

    public static Integer getCurrentId() {
        return Math.toIntExact(threadLocal.get());
    }

    public static void removeCurrentId() {
        threadLocal.remove();
    }

}
