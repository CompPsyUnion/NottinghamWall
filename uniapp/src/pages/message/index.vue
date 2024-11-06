<template>
  <view class="container">
    <!-- 功能图标 -->
    <view class="icon-section">
      <view class="icon-item">
        <view class="icon-heart">❤️</view>
        <text class="icon-label">获赞和收藏</text>
      </view>
      <view class="icon-item">
        <view class="icon-comment">💬</view>
        <text class="icon-label">评论</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="message-list">
      <view class="list-header">
        <text class="list-title">消息列表</text>
        <button class="clear-button" @click="clearUnread">清除未读</button>
      </view>
      <view class="no-content">
        <image class="no-content-icon" src="" />
        <text class="no-content-text">暂无内容</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 模拟清除未读的函数
const clearUnread = () => {
  console.log('未读消息已清除');
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}

.icon-section {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  background-color: #ffffff;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-heart, .icon-comment {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin-bottom: 5px;
}

.icon-label {
  font-size: 14px;
  color: #333;
}

.message-list {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  position: relative;
}

.clear-button {
  position: absolute;
  right: 0;
  font-size: 14px;
  color: #4a90e2;
  background: none;
  border: none;
  cursor: pointer;
}

.list-title {
  font-size: 16px;
  color: #999;
  margin-right: auto;
}

.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  color: #bbb;
}

.no-content-icon {
  width: 80px;
  height: 80px;
}

.no-content-text {
  margin-top: 10px;
}
</style>
