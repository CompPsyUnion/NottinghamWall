<template>
  <view class="privacy-modal">
    <view class="privacy-content">
      <text class="title">隐私权政策提示</text>
      <view class="text-container">
        <text>
          请您在使用CPU Wall服务前点击
          <text url="https://blog.yiming1234.cn">《服务使用协议》</text>
          <text url="https://blog.yiming1234.cn">《隐私与个人信息保护政策》</text>与
          并仔细阅读。如您同意以上全部内容，请点击同意并开始使用我们的服务。如果您不同意，您只能浏览部分内容。
        </text>
      </view>
      <view class="checkbox-container">
<!--        <uni-data-checkbox :value="false" class="checkbox" />-->
        <text class="checkbox-text">本人已年满14岁，可自行授权个人信息处理</text>
      </view>
      <view class="button-container">
        <button class="btn disagree">不同意</button>
        <button class="btn agree">同意</button>
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.privacy-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5ebd6;
}

.privacy-content {
  background-color: #fff;
  border-radius: 24px;
  padding: 20px;
  width: 70%;
  max-width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

.text-container {
  text-align: left;
  margin-bottom: 20px;
  line-height: 1.5;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.checkbox {
  margin-right: 10px;
  border-radius: 50%;
}

.checkbox-text {
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* 按钮间距 */
  width: 100%;
}

.btn {
  width: 30%;
  padding: 10px;
  border-radius: 50px;
  font-size: 14px;
  text-align: center;
}

.disagree {
  background-color: #e0e0e0;
  color: #000;
}

.agree {
  background-color: #4a90e2;
  color: #fff;
}
</style>
