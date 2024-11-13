package cn.yiming1234.NottinghamWall.interceptor;

import cn.yiming1234.NottinghamWall.constant.JwtClaimsConstant;
import cn.yiming1234.NottinghamWall.context.BaseContext;
import cn.yiming1234.NottinghamWall.properties.JwtProperties;
import cn.yiming1234.NottinghamWall.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * jwt令牌校验的拦截器
 */
@Component
@Slf4j
public class JwtTokenStudentInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * 校验jwt
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        System.out.println("当前线程的id："+Thread.currentThread().getId());

        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        if ("getTopic".equals(method.getName())) {
            return true;
        }
        String token = request.getHeader(jwtProperties.getUserTokenName());
        log.info("token:{}",token);
        try {
            log.info("jwt校验:{}", token);
            Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
            Integer userId = (Integer) claims.get(JwtClaimsConstant.USER_ID);
            log.info("userId:{}", userId);
            BaseContext.setCurrentId(userId);

            return true;
        } catch (Exception ex) {
            response.setStatus(401);
            return false;
        }
    }
}
