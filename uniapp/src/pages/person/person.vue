<template>
  <div class="profile-page">
    <!-- 头像和昵称部分 -->
    <div class="profile-header">
      <img class="avatar" :src="avatarUrl" alt="Avatar" />
      <div class="nickname-settings">
        <p class="nickname">{{ nickName }}</p>
      </div>
    </div>

    <!-- 我的操作 -->
    <div class="order-actions">
      <div class="order-item">
        <uni-icons type="heart" size="24" color="#ff6600"></uni-icons>
        <p>我的关注</p>
      </div>
      <div class="order-item">
        <uni-icons type="chat" size="24" color="#ff6600"></uni-icons>
        <p>我的评论</p>
      </div>
      <div class="order-item"  @click="goToFavoritesPage">
        <uni-icons type="star" size="24" color="#ff6600"></uni-icons>
        <p>我的收藏</p>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="feature-list">
      <div class="feature-item" @click="goToPersonPage">
        <uni-icons type="gear" size="20" color="#ff6600"></uni-icons>
        <p>信息修改</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="feature-item" @click="goToAuthenticationPage">
        <uni-icons type="gear" size="20" color="#ff6600"></uni-icons>
        <p>信息认证</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="feature-item" @click="goToUniversePage">
        <uni-icons type="settings" size="20" color="#ff6600"></uni-icons>
        <p>通用管理</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="feature-item">
        <uni-icons type="info" size="20" color="#ff6600"></uni-icons>
        <p>关于我们</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
    </div>
  </div>
</template>

<script>
import {baseUrl} from "@/utils/env";

export default {
  data() {
    return {
      avatarUrl: '', // 初始化头像URL
      nickName: '',
    };
  },
  onLoad(){
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
    goToFavoritesPage() {
      uni.navigateTo({
        url: '/pages/favorites/index'
      });
    },
    goToPersonPage() {
      uni.navigateTo({
        url: '/pages/person/editInfo'
      });
    },
    goToAuthenticationPage() {
      uni.navigateTo({
        url: '/pages/person/authentication'
      });
    },
    goToUniversePage() {
      uni.navigateTo({
        url: '/pages/person/universe'
      });
    }
  }
};
</script>

<style scoped>
.profile-page {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.nickname-settings {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.nickname {
  font-size: 16px;
  color: #333;
}

.order-actions {
  display: flex;
  justify-content: space-around;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.order-item {
  text-align: center;
}

.order-item p {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.feature-list {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  position: relative;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-item p {
  flex-grow: 1;
  font-size: 14px;
  color: #333;
}

.arrow-right {
  position: absolute;
  right: 10px;
}
</style>
