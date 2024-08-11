<template>
  <view class="login-page">
    <view class="header">
      <image src="/static/logo.png" class="logo" mode="aspectFit"/>
      <view>
        <text class="title">Hello!</text><br/>
        <text class="subtitle">欢迎使用Nottingham Wall</text>
      </view>
    </view>
    <view class="content">
      <view class="agreement">
        <uni-checkbox :value="false" class="checkbox"/>
        <text class="agreement-text">
          请您阅读并同意
          <text url="https://blog.yiming1234.cn" class="link">《用户协议》</text>
          <text url="https://blog.yiming1234.cn" class="link">《隐私协议》</text>
        </text>
      </view>
      <uni-button class="login-btn" @click="handleLogin">
        <view class="btn-content">
          <text class="btn-text">一键登录</text>
        </view>
      </uni-button>
      <uni-button class="skip-btn">
        <view class="btn-content">
          <text class="btn-text">暂不登录</text>
        </view>
      </uni-button>
    </view>
    <view class="footer">
      <navigator url="/pages/verify/index" class="verify-link">手机号快捷登录</navigator>
    </view>
  </view>
</template>

<script setup>
import { useTokenStore } from '@/store/token';
import { userLoginService } from '@/api/login';

const tokenStore = useTokenStore();

function handleLogin() {
  console.log('开始登录...');
  wx.login({
    success: (res) => {
      if (res.code) {
        console.log('登录成功，code:', res.code);
        userLoginService({ code: res.code })
            .then((response) => {
              console.log('服务器响应:', response.data);
              tokenStore.setToken(response.data.token);
              uni.navigateTo({
                url: '/pages/index/index'
              });
            })
            .catch((err) => {
              console.error('服务器请求失败:', err);
            });
      } else {
        console.error('登录失败！', res.errMsg);
      }
    },
    fail: (err) => {
      console.error('wx.login 调用失败:', err);
    }
  });
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: #f5ebd6;
}

.header {
  margin-top: 20px;
  text-align: center;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  margin-top: 80px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.content {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.agreement {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox {
  margin-right: 10px;
}

.agreement-text {
  font-size: 12px;
  color: #666;
}

.link {
  text-decoration: underline;
  color: #0066cc;
  white-space: nowrap;
}

.login-btn, .skip-btn {
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4a90e2; /* 深蓝色 */
  color: #fff;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 50px;
}

.skip-btn {
  background-color: #e0e0e0; /* 浅灰色 */
  color: #000;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-text {
  font-size: 16px;
  color: inherit;
}

.footer {
  margin-bottom: 20px;
}

.verify-link {
  color: #999;
  font-size: 14px;
  text-align: center;
}
</style>
