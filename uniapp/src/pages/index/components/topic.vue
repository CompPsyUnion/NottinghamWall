<template>
  <view>
    <uni-section title="最新话题" type="line">
      <uni-card
          v-for="(record, index) in records"
          :key="index"
          :title="getUserInfo(record.authorID).username"
          :sub-title="record.updatedAt"
          :thumbnail="getUserInfo(record.authorID).avatar"
          @click="onClick(record)"
          >
        <view class="image-container">
          <image
              v-for="(img, imgIndex) in record.imgURLs"
              :key="imgIndex"
              :src="img"
              :class="['cover-image', {'two-images': record.imgURLs.length === 2, 'one-image': record.imgURLs.length === 1}]"/>
        </view>
        <text class="uni-body content">{{ record.content }}</text>
        <view slot="actions" class="card-actions">
          <view class="card-actions-item" @click.stop="actionsClick('点赞', record)">
            <uni-icons type="heart" size="18" color="#999"></uni-icons>
            <text class="card-actions-item-text">点赞</text>
          </view>
          <view class="card-actions-item" @click.stop="actionsClick('评论', record)">
            <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
            <text class="card-actions-item-text">评论</text>
          </view>
          <view class="card-actions-item" @click.stop="actionsClick('分享', record)">
            <uni-icons type="redo" size="18" color="#999"></uni-icons>
            <text class="card-actions-item-text">分享</text>
          </view>
        </view>
      </uni-card>
      <uni-load-more :status="loadMoreStatus"/>
    </uni-section>
  </view>
</template>

<script>

import { baseUrl } from '@/utils/env';

export default {
  props: {
    records: {
      type: Array,
      required: true
    },
    loadMoreStatus: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userInfoMap: {} // 存储 authorID 对应的用户信息
    };
  },
  methods: {
    async fetchUserInfo(authorID) {
      if (!this.userInfoMap[authorID]) {
        try {
          const res = await uni.request({
            url: baseUrl + `/student/get/info/${authorID}`,
            method: 'GET',
            header: {
              'content-type': 'application/json',
              'token': uni.getStorageSync('token')
            },
          });
          if (res.data.code === 1) {
            this.$set(this.userInfoMap, authorID, res.data.data); // 保存用户信息到 userInfoMap
          } else {
            this.$set(this.userInfoMap, authorID, { nickname: '匿名用户', avatar: '' });
          }
        } catch (error) {
          console.error(`获取用户信息失败 authorID: ${authorID}`, error);
          this.$set(this.userInfoMap, authorID, { nickname: '匿名用户', avatar: '' });
        }
      }
    },
    getUserInfo(authorID) {
      if (!this.userInfoMap[authorID]) {
        this.fetchUserInfo(authorID); // 异步获取用户信息
      }
      return this.userInfoMap[authorID] || {}; // 返回用户信息
    },
    onClick(record) {
      uni.navigateTo({
        url: `/pages/topic/view?topicId=${record.id}` // 跳转到评论页面并传递 topicId
      });
    },
    actionsClick(action, record) {
      if (action === '点赞') {
        // 点赞逻辑
      } else if (action === '评论') {
        // 评论逻辑
          uni.navigateTo({
            url: `/pages/topic/view?topicId=${record.id}` // 跳转到评论页面并传递 topicId
          });
      } else if (action === '分享') {
        // 分享逻辑
      }
    }
  }
}
</script>

<style lang="scss">
.image-container {
  display: flex;
  justify-content: flex-start; /* 保证图片左对齐 */
  gap: 10px;
  margin-bottom: 10px;
}

.cover-image {
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
}

.cover-image.two-images {
  width: calc(33.33% - 7px); /* 每张图片占三分之一宽度 */
}

.cover-image.one-image {
  width: calc(33.33% - 7px); /* 单张图片占三分之一宽度 */
}

.cover-image:not(.two-images):not(.one-image) {
  flex: 1; /* 正常显示三张图片 */
}

.content {
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px #eee solid;
}

.card-actions-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-actions-item-text {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
}
</style>
