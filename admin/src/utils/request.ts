import axios from 'axios'
import { UserModule } from '@/store/modules/user'
import {getRequestKey,removePending} from './requestOptimize'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  'timeout': 600000
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['token'] = UserModule.token
    } else if (UserModule.token && config.url != '/login') {
      window.location.href = '/login'
      return false
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    // console.log(response, 'response')
    if (response.data.status === 401) {
      router.push('/login')
    }
    //请求响应中的config的url会带上代理的api需要去掉
    response.config.url = response.config.url.replace('/admin', '')
    // 请求完成，删除请求中状态
    const key = getRequestKey(response.config);
    removePending(key);
    if (response.data.code === 1) {
      return response
    }
    return response
  },
  (error: any) => {
    // console.log(error.config, pending, 'error')
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          router.push('/login')
          break;
        case 405:
          error.message = '请求错误'
      }
    }
    //请求响应中的config的url会带上代理的api需要去掉
    error.config.url = error.config.url.replace('/admin', '')
    // 请求完成，删除请求中状态
    const key = getRequestKey(error.config);
    removePending(key);
    return Promise.reject(error)
  }
)

export default service
