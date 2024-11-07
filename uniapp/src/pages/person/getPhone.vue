<template>
  <view class="login-page">
    <view class="header">
      <image src="/static/logo.png" class="logo" mode="aspectFit"/>
      <view>
        <text class="title">Hello!</text>
        <br/>
        <text class="subtitle">欢迎使用Nottingham Wall</text>
      </view>
    </view>
    <view class="content">
      <button class="primary-button" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键获取手机号</button>
      <button class="default-button" type="default" @click="skip">暂不获取</button>
      <view class="agreement">
<!--        <uni-data-checkbox :value="false" class="checkbox"/>-->
        <text class="agreement-text">
          请您阅读并同意
          <text url="https://blog.yiming1234.cn" class="link">《用户协议》</text>
          <text url="https://blog.yiming1234.cn" class="link">《隐私协议》</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import {userGetPhoneService} from "@/api/getPhone";

export default {
  methods: {
    getPhoneNumber(e) {
      const code = e.detail.code;
      console.log('code', code);
      console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
      const params = {
        code: code
      };
      userGetPhoneService(params).then(res => {
        console.log('res', res);
      });
    },
    //TODO: 协议授权逻辑处理
    skip() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fff;
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
  margin-top: 100px;
}

.primary-button, .default-button {
  width: 60%; /* 设置按钮宽度为80%屏幕宽度 */
  padding: 10px 0; /* 增加按钮的高度 */
  margin-bottom: 20px; /* 按钮之间的间距 */
  font-size: 16px; /* 调整按钮内文字的大小 */
  border-radius: 20px; /* 圆角按钮 */
}

.default-button {
  background-color: #f5f5f5;
  color: #666;
}

.agreement {
  display: flex;
  align-items: center;
  margin-top: 20px;
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

</style>
