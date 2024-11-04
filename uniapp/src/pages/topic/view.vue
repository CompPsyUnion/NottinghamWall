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
        <view class="card-actions-item" @click.stop="actionsClick(hasLiked ? '取消点赞' : '点赞', topicRecord)">
          <uni-icons :type="hasLiked ? 'heart-fill' : 'heart'" size="18" :color="hasLiked ? '#f00' : '#999'"></uni-icons>
          <text class="card-actions-item-text">{{ hasLiked ? '已点赞' : '点赞' }}</text>
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

    <!-- 评论展示区域 -->
    <view v-if="comments.length" class="comments-section">
      <view v-for="(comment, index) in comments" :key="comment.commentId" class="comment-item">
        <image v-if="comment.user" :src="comment.user.avatar" class="comment-avatar"></image>
        <view class="comment-content">
          <view class="comment-username">{{ comment.user ? comment.user.username : '匿名用户' }}</view>
          <view class="comment-text">{{ comment.content }}</view>
          <view class="comment-date">{{ comment.createdAt }}</view>
          <view class="comment-actions">
            <view class="like-button" @click="likeComment(comment)">
              <uni-icons :type="comment.hasLiked ? 'heart-fill' : 'heart'" size="18" :color="comment.hasLiked ? '#f00' : '#999'"></uni-icons>
              <text class="like-button-text">{{ comment.hasLiked ? '已点赞' : '点赞' }}</text>
            </view>
            <view class="reply-button" @click="replyToComment(comment)">
              <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
              <text class="reply-button-text">回复</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 评论输入框 -->
    <view v-if="showCommentInput" class="comment-input-container">
      <textarea
          v-model="commentContent"
          class="comment-input"
          placeholder="请输入评论内容..."
          autofocus
      ></textarea>
      <button @click="submitComment">提交</button>
    </view>
  </view>
</template>

<script>
import {baseUrl} from "@/utils/env";

export default {
  data() {
    return {
      topicRecord: null, // 当前话题记录
      userInfoMap: {}, // 存储 authorID 对应的用户信息
      hasLiked: false, // 是否已点赞
      commentContent: "", // 评论内容
      showCommentInput: false, // 是否显示评论输入框
      comments: [], // 评论列表
    };
  },
  onLoad(options) {
    // 从URL参数中获取 topicId
    const topicId = options.topicId;
    this.fetchTopic(topicId)
    this.checkIfLiked(topicId);
    this.fetchComments(topicId);
    console.log("Received topicId:", topicId); // Debugging log
  },
  methods: {

    /**
     * 异步获取点赞数据
     * @param topicId
     * @returns {Promise<void>}
     */
    async checkIfLiked(topicId) {
      try {
        const res = await uni.request({
          url: baseUrl + "/student/islike/topic/" + topicId,
          method: "GET",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          console.log("检查是否已点赞:", res.data.data);
          this.hasLiked = res.data.data;
        } else {
          this.hasLiked = false;
        }
      } catch (error) {
        console.error("检查是否已点赞失败:", error);
        this.hasLiked = false;
      }
    },

    /**
     * 异步获取评论列表
     * @param topicId
     * @returns {Promise<void>}
     */
    async fetchComments(topicId) {
      try {
        const res = await uni.request({
          url:  baseUrl + "/student/get/comments/" + topicId,
          method: "GET",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.comments = res.data.data;
        } else {
          uni.showToast({ title: "获取评论失败", icon: "none" });
        }
      } catch (error) {
        console.error("获取评论失败:", error);
        uni.showToast({ title: "获取评论失败", icon: "none" });
      }
    },

    /**
     * 点击操作按钮
     * @param action
     * @returns {Promise<void>}
     */
    async actionsClick(action) {
      if (action === '点赞') {
        await this.likeTopic();
      } else if (action === '取消点赞') {
        await this.unlikeTopic();
      } else if (action === '评论') {
        this.showCommentInput = true; // 显示评论输入框
      } else if (action === '分享') {
        uni.showToast({ title: "分享功能暂未开放", icon: "none" });
      }
    },

    /**
     * 提交评论
     * @returns {Promise<void>}
     */
    async submitComment() {
      if (!this.commentContent.trim()) {
        uni.showToast({ title: "评论内容不能为空", icon: "none" });
        return;
      }
      try {
        const res = await uni.request({
          url: baseUrl + "/student/comment/topic/" + this.topicRecord.id,
          method: "POST",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
          data: {
            content: this.commentContent,
          },
        });
        if (res.data.code === 1) {
          uni.showToast({ title: "评论成功", icon: "success" });
          this.commentContent = ""; // 清空评论输入框内容
          this.showCommentInput = false; // 隐藏评论输入框
        } else {
          uni.showToast({ title: "评论失败", icon: "none" });
        }
      } catch (error) {
        console.error("评论失败:", error);
        uni.showToast({ title: "评论失败", icon: "none" });
      }
    },

    /**
     * 回复评论
     * @param comment
     */
    async replyToComment(comment) {
      await uni.showToast({title: "回复评论功能暂未开放", icon: "none"});
      // TODO
    },

    /**
     * 点赞评论
     * @param comment
     */
    async likeComment(comment) {
      await uni.showToast({title: "点赞评论功能暂未开放", icon: "none"});
      // TODO
    },

    /**
     * 点赞话题
     * @returns {Promise<void>}
     */
    async likeTopic() {
      try {
        const res = await uni.request({
          url: baseUrl + "/student/like/topic/" + this.topicRecord.id,
          method: "POST",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.hasLiked = true;
          uni.showToast({ title: "点赞成功", icon: "success" });
        } else {
          uni.showToast({ title: "点赞失败", icon: "none" });
        }
      } catch (error) {
        console.error("点赞失败:", error);
      }
    },

    /**
     * 取消点赞话题
     * @returns {Promise<void>}
     */
    async unlikeTopic() {
      try {
        const res = await uni.request({
          url: baseUrl + "/student/unlike/topic/" + this.topicRecord.id,
          method: "POST",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.hasLiked = false;
          uni.showToast({ title: "取消点赞成功", icon: "success" });
        } else {
          uni.showToast({ title: "取消点赞失败", icon: "none" });
        }
      } catch (error) {
        console.error("取消点赞失败:", error);
      }
    },

    /**
     * 异步获取用户信息
     * @param authorID
     * @returns {Promise<void>}
     */
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

    /**
     * 获取用户信息
     * @param authorID
     * @returns {{nickname: string, avatar: string}}
     */
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

    /**
     * 异步获取话题数据
     * @param topicId
     * @returns {Promise<void>}
     */
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

.comment-input-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.comment-input {
  width: 100%;
  height: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
}

.comments-section {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f8f8;
}

.comment-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-content {
  flex: 1;
}

.comment-username {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.comment-text {
  margin-top: 4px;
  font-size: 13px;
  color: #666;
}

.comment-date {
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

/* 点赞和回复按钮容器 */
.comment-actions {
  display: flex;
  gap: 20px; /* 控制点赞和回复按钮之间的间距 */
  margin-top: 6px;
}

.like-button,
.reply-button {
  display: flex;
  align-items: center;
}

.like-button-text,
.reply-button-text {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
}

</style>
