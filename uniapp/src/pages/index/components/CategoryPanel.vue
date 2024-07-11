<script setup lang="ts">
import AITalk from '@/pages/message/AITalk.vue'
import Post from '@/pages/topic/Post.vue'
</script>

<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/page/post/post">
      <image class="icon" src="@/static/images/Post.png"></image>
      <text class="text">发布帖子</text>
    </navigator>
    <navigator
      class="category-item"
      hover-class="none"
      url="/page/order/order">
      <image class="icon" src="@/static/images/WaitOrder.png"></image>
      <text class="text">在线接单</text>
    </navigator>
    <navigator
      class="category-item"
      hover-class="none"
      url="/page/aitalk/aitalk">
      <image class="icon" src="@/static/images/AITalk.png"></image>
      <text class="text">AI聊天</text>
    </navigator>
  </view>
</template>

<style lang="scss">
/* 前台类目 */
.category {
  margin-top: 5rpx;
  padding: 10rpx 0;
  display: flex;
  justify-content: center; /* 添加这一行使得子元素水平居中 */
  flex-wrap: wrap;
  min-height: 164rpx;

  .category-item {
    width: 240rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 70rpx; /* 调整图标的宽度 */
      height: 70rpx; /* 调整图标的高度 */
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
