<template>
  <view>
    <uni-card
        v-if="topicRecord"
        :isFull="true"
        :title="getUserInfo(topicRecord.authorID).username"
        :sub-title="topicRecord.updatedAt"
        :thumbnail="getUserInfo(topicRecord.authorID).avatar"
    >
      <view v-if="topicRecord.content" class="content">
        <text>{{ topicRecord.content }}</text>
      </view>
      <view v-if="topicRecord.imgURLs && topicRecord.imgURLs.length" class="image-grid">
        <image
            v-for="(imgURL, index) in topicRecord.imgURLs"
            :key="index"
            :src="imgURL"
            class="grid-image"
            mode="aspectFill"
        />
      </view>
      <view slot="actions" class="card-actions">
        <view class="card-actions-item" @click.stop="actionsClick('点赞', topicRecord)">
          <uni-icons type="heart" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">点赞</text>
        </view>
        <view class="card-actions-item" @click.stop="actionsClick('评论', topicRecord)">
          <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">评论</text>
        </view>
        <view class="card-actions-item" @click.stop="actionsClick('分享', topicRecord)">
          <uni-icons type="redo" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">分享</text>
        </view>
      </view>
    </uni-card>
  </view>
</template>

<script>
import {baseUrl} from "@/utils/env";

export default {
  data() {
    return {
      topicRecord: null, // 当前话题记录
      userInfoMap: {}, // 存储 authorID 对应的用户信息
    };
  },
  onLoad(options) {
    // 从URL参数中获取 topicId
    const topicId = options.topicId;
    console.log("Received topicId:", topicId); // Debugging log
    this.fetchTopic(topicId);
  },
  methods: {
    actionsClick(action) {
      if (action === '点赞') {
        // 点赞逻辑
        uni.showToast({title: "点赞功能暂未开放", icon: "none"});
      } else if (action === '评论') {
        // 评论逻辑
        uni.showToast({title: "评论功能暂未开放", icon: "none"});
      } else if (action === '分享') {
        // 分享逻辑
        uni.showToast({title: "分享功能暂未开放", icon: "none"});
      }
    },
    async fetchUserInfo(authorID) {
      if (!this.userInfoMap[authorID]) {
        try {
          console.log("Received authorID:", authorID); // Debugging log
          const res = await uni.request({
            url: baseUrl + `/student/get/info/${authorID}`,
            method: "GET",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
          });
          if (res.data.code === 1) {
            this.$set(this.userInfoMap, authorID, res.data.data); // 保存用户信息到 userInfoMap
          } else {
            this.$set(this.userInfoMap, authorID, {nickname: "匿名用户", avatar: ""});
          }
        } catch (error) {
          console.error(`获取用户信息失败 authorID: ${authorID}`, error);
          this.$set(this.userInfoMap, authorID, {nickname: "匿名用户", avatar: ""});
        }
      }
    },
    getUserInfo(authorID) {
      if (!authorID) {
        console.error("authorID is undefined");
        return {nickname: "匿名用户", avatar: ""};
      }
      if (!this.userInfoMap[authorID]) {
        this.fetchUserInfo(authorID); // 异步获取用户信息
      }
      return this.userInfoMap[authorID] || {nickname: "匿名用户", avatar: ""}; // 返回用户信息
    },
    async fetchTopic(topicId) {
      try {
        // 使用 topicId 从服务器获取话题数据
        const res = await uni.request({
          url: baseUrl + "/student/topic/" + topicId,
          method: "GET",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.topicRecord = res.data.data; // 设置话题数据
          await this.fetchUserInfo(this.topicRecord.authorID); // 获取 authorID 对应的用户信息
        } else {
          uni.showToast({title: "获取话题失败", icon: "none"});
        }
      } catch (error) {
        console.error("获取话题失败:", error);
        uni.showToast({title: "获取话题失败", icon: "none"});
      }
    },
  },
};
</script>

<style lang="scss">
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.grid-image {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
}

.content {
  margin: 10px 0;
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
