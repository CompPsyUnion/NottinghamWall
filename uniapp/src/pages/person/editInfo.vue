<template>
  <view class="containar">
    <view class="avatarUrl">
      <button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image :src="avatarUrl" class="refreshIcon"></image>
      </button>
    </view>
    <view class="formItem">
      <text class="label">昵称：</text>
      <input type="text" class="webui-input" :value="nickName" @blur="bindblur" placeholder="请输入昵称"
             @input="bindinput"/>
    </view>
    <view class="formItem">
      <text class="label">性别：</text>
      <radio-group @change="onSexChange">
        <label class="radio-item">
          <radio value="Male" :checked="selectedSex === 'Male'">男性</radio>
        </label>
        <label class="radio-item">
          <radio value="Female" :checked="selectedSex === 'Female'">女性</radio>
        </label>
      </radio-group>
    </view>
    <view class="formItem">
      <text class="label">学生号：</text>
      <input type="text" class="webui-input" :value="studentid" @blur="bindStudentIdBlur" placeholder="请输入学生号"
             @input="bindStudentIdInput"/>
    </view>
    <view class="btn">
      <view class="btn-sub" @click="onSubmit">保存</view>
    </view>
  </view>
</template>

<script>
import { baseUrl } from "@/utils/env"; // 引入环境变量

export default {
  /**
   * 页面的初始数据
   */
  data() {
    return {
      avatarUrl: '', // 初始化头像URL
      originalAvatarUrl: '', // 保存从服务器获取的原始头像URL
      nickName: '',
      selectedSex: 'Male', // 默认选择
      sexValueMap: { // 性别值映射
        'Male': 1,
        'Female': 2,
      },
      studentid: '' // 初始化学生号
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
          this.originalAvatarUrl = res.data.data.avatar; // 保存原始头像URL
          this.studentid = res.data.data.studentid;
          const sexKey = Object.keys(this.sexValueMap).find(key => this.sexValueMap[key] === res.data.data.sex);
          this.selectedSex = sexKey || 'Male';
        } else {
          console.error('获取用户信息失败:', res.data.msg);
        }
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
      }
    });
  },
  /**
   * 页面的方法
   */
  methods: {
    bindblur(e) {
      this.nickName = e.detail.value;
    },
    bindinput(e) {
      this.nickName = e.detail.value;
    },
    bindStudentIdBlur(e) {
      this.studentid = e.detail.value;
    },
    bindStudentIdInput(e) {
      this.studentid = e.detail.value;
    },
    onChooseAvatar(e) {
      this.avatarUrl = e.detail.avatarUrl;
    },
    onSexChange(event) {
      this.selectedSex = event.detail.value;
    },
    logError(error) {
      console.error('Error:', error);
    },
    /**
     * 提交表单
     */
    onSubmit() {
      if (this.nickName === '') {
        uni.showToast({
          icon: 'none',
          title: '请输入昵称'
        });
        return;
      }

      // 判断用户是否更改了头像
      if (this.avatarUrl === this.originalAvatarUrl) {
        // 头像未更改，直接使用原来的头像 URL 更新信息
        this.updateUserInfo(this.avatarUrl);
      } else {
        // 头像已更改，执行上传操作
        uni.uploadFile({
          url: baseUrl + '/student/common/upload',
          filePath: this.avatarUrl,
          name: 'file',
          header: {
            token: uni.getStorageSync('token')
          },
          success: (res) => {
            try {
              const responseData = JSON.parse(res.data);
              if (responseData.code === 1) {
                const avatar = responseData.data;
                this.updateUserInfo(avatar);
              } else {
                uni.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            } catch (e) {
              uni.showToast({
                title: '解析失败',
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail: (err) => {
            this.logError(err);
            uni.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    },
    /**
     * 更新用户信息
     * @param avatarUrl 头像 URL
     */
    updateUserInfo(avatarUrl) {
      uni.request({
        url: baseUrl + '/student/update/info',
        method: 'PUT',
        header: {
          token: uni.getStorageSync('token')
        },
        data: {
          username: this.nickName,
          avatar: avatarUrl,
          sex: this.sexValueMap[this.selectedSex],
          studentid: this.studentid
        },
        success: (res) => {
          if (res.data.code === 1) {
            uni.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000
            });
          } else {
            uni.showToast({
              title: '更新失败',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: (err) => {
          this.logError(err);
          uni.showToast({
            title: '更新失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  }
};
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
    }
  }

  .formItem {
    background: #fff;
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx; // 添加底部间距

    .label {
      width: 140rpx; // 设置标签宽度以确保对齐
      text-align: left; // 标签文本左对齐
    }

    .webui-input {
      flex: 1; // 输入框占用剩余空间
      margin-left: 20rpx; // 标签和输入框之间的间距
    }

    .radio-item {
      margin-right: 30rpx; // 单选框之间的间距
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
