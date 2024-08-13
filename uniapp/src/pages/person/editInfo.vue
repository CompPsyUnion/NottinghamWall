<template>
  <view class="containar">
    <view class="avatarUrl">
      <button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
        <image :src="avatarUrl" class="refreshIcon"></image>
      </button>
    </view>
    <view class="nickname">
      <text>昵称：</text>
      <input type="nickname" class="weui-input" :value="nickName" @blur="bindblur" placeholder="请输入昵称"
             @input="bindinput"/>
    </view>

    <view class="btn">
      <view class="btn-sub" @click="onSubmit">保存</view>
    </view>
  </view>
</template>

<script>

import {baseUrl} from "@/utils/env"; // 引入获取用户信息的方法

export default {
  data() {
    return {
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      nickName: ''
    };
  },
  onLoad(option) {
  },
  methods: {
    bindblur(e) {
      // 获取微信昵称
      this.nickName = e.detail.value;
      console.log(this.nickName)
    },
    bindinput(e) {
      //这里要注意如果只用blur方法的话用户在输入玩昵称后直接点击保存按钮，会出现修改不成功的情况。
      this.nickName = e.detail.value;
      console.log(this.nickName)
    },
    onChooseavatar(e) {
      this.avatarUrl = e.detail.avatarUrl;
      console.log(this.avatarUrl)
    },
    onSubmit() {
      if (this.nickName === '') {
        uni.showToast({
          icon: 'none',
          title: '请输入昵称'
        })
        return false;
      }
      // 上传昵称
      uni.request({
        url: baseUrl + '/student/login/update',
        method: 'PUT',
        header: {
          token: uni.getStorageSync('token')
        },
        data: {
          username: this.nickName
        }
      })
      // TODO 上传头像
      // // 上传头像
      // uni.uploadFile({
      //   url: baseUrl + '/student/common/upload',
      //   filePath: this.avatarUrl,
      //   header: {
      //     token: uni.getStorageSync('token')
      //   },
      //   data: {},
      // })
    }
  }
}
;
</script>
<style lang="scss">
.containar {

  .avatarUrl {
    padding: 80rpx 0 40rpx;
    background: #fff;

    button {
      background: #fff;
      line-height: 80rpx;
      height: auto;
      width: auto;
      padding: 20rpx 30rpx;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;


      .refreshIcon {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
      }

      .jt {
        width: 14rpx;
        height: 28rpx;
      }
    }
  }

  // botton 去除边框
  button::after {
    border: none;
  }

  .nickname {
    background: #fff;
    padding: 20rpx 30rpx 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .weui-input {
      padding-left: 60rpx;
    }
  }

  .btn {
    width: 100%;

    .btn-sub {
      width: 670rpx;
      margin: 80rpx auto 0;
      height: 90rpx;
      background: #4a90e2;
      border-radius: 45rpx;
      line-height: 90rpx;
      text-align: center;
      font-size: 36rpx;
      color: #fff;
    }
  }
}
</style>
