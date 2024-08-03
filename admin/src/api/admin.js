//导入request.js请求工具
import request from '@/utils/request'

//提供调用登录接口的函数
export const userLoginService = (loginData) => {
    //借助于UrlSearchParams完成传递
    const params = new URLSearchParams()
    for (const key in loginData) {
        params.append(key, loginData[key]);
    }
    return request.post('/api/manage/admin', params);
}
