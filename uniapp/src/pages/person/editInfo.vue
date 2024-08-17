<template>
  <view class="containar">
    <view class="avatarUrl">
      <button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
        <image :src="avatarUrl" class="refreshIcon"></image>
      </button>
    </view>
    <view class="nickname">
      <text>昵称：</text>
      <input type="nickname" class="webui-input" :value="nickName" @blur="bindblur" placeholder="请输入昵称"
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
  onLoad() {
    // 获取用户信息
    uni.request({
      url: baseUrl + '/student/get/info',
      method: 'GET',
      header: {
        token: uni.getStorageSync('token')
      },
      success: (res) => {
        if (res.data.code === 1) {
          this.nickName = res.data.data.username;
          this.avatarUrl = res.data.data.avatar;
        } else {
          console.error('获取用户信息失败:', res.data.msg);
        }
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
      }
    });
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
      // 组合请求参数
      uni.uploadFile({
        url: baseUrl + '/student/common/upload',
        filePath: this.avatarUrl,
        name: 'file',
        header: {
          token: uni.getStorageSync('token')
        },
        success: (res) => {
          console.log('上传响应:', res);
          try {
            // 解析字符串形式的 JSON
            const responseData = JSON.parse(res.data);
            if (responseData.code === 1) {
              const avatar = responseData.data;
              // 发送请求更新用户信息
              uni.request({
                url: baseUrl + '/student/update/info',
                method: 'PUT',
                header: {
                  token: uni.getStorageSync('token')
                },
                data: {
                  username: this.nickName,
                  avatar: avatar
                },
                success: (res) => {
                  if (res.data.code === 1) {
                    console.log('用户信息更新成功');
                    uni.showToast({
                      title: '更新成功',
                      icon: 'success',
                      duration: 2000
                    });
                  } else {
                    console.error('用户信息更新失败:', res.data.msg);
                    uni.showToast({
                      title: '更新失败',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                },
                fail: (err) => {
                  console.error('用户信息更新失败:', err);
                  uni.showToast({
                    title: '更新失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
              });
            } else {
              console.error('上传失败，服务器返回错误:', responseData.msg);
            }
          } catch (e) {
            console.error('解析响应数据失败:', e);
            uni.showToast({
              title: '解析失败',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: (err) => {
          console.error('上传头像失败:', err);
          uni.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          });
        }
      });

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

    .webui-input {
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
