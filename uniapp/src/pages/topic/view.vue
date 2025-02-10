<template>
  <view>
    <uni-card
        v-if="topicRecord"
        :isFull="true"
        :title="topicRecord.username"
        :sub-title="topicRecord.updatedAt"
        :thumbnail="topicRecord.avatar"
        class="card-container"
        @click.stop
    >
      <uni-icons @click="showActionSheet" type="more" size="24" class="three-dots-icon"></uni-icons>
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
        <view class="action-item" @click.stop="handleLike">
          <uni-icons :type="topicRecord.isLiked ? 'heart-filled' : 'heart'" size="18" :color="topicRecord.isLiked ? '#f00' : '#999'"></uni-icons>
          <text class="action-item-text">
            {{ topicRecord.isLiked ? '已点赞' : '点赞' }} {{ topicRecord.likeCount }}
          </text>
        </view>
        <view class="action-item" @click.stop="openCommentPopup">
          <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
          <text class="action-item-text">评论 {{ topicRecord.commentCount }}</text>
        </view>
        <view class="action-item" @click.stop="handleCollect">
          <uni-icons :type="topicRecord.isCollected ? 'star-filled' : 'star'" size="18" :color="topicRecord.isCollected ? '#ffcc00' : '#999'"></uni-icons>
          <text class="action-item-text">
            {{ topicRecord.isCollected ? '已收藏' : '收藏' }} {{ topicRecord.collectCount }}
          </text>
        </view>
        <view class="action-item share-item" @click.stop>
          <uni-icons type="redo" size="18" color="#999"></uni-icons>
          <text class="action-item-text">分享</text>
          <button
              open-type="share"
              data-share-type="topic"
              class="share-button"
              @click.stop
          ></button>
        </view>
      </view>
    </uni-card>

    <!-- 评论展示区域 -->
    <view v-if="comments.length" class="comments-section">
      <uni-card
          v-for="(comment, index) in comments"
          :key="comment.id"
          :isFull="true"
          :title="comment.username"
          :sub-title="comment.createdAt"
          :thumbnail="comment.avatar"
          class="comment-card"
          @click.stop
      >
        <!-- 评论内容 -->
        <view v-if="comment.content" class="comment-text">
          <text>{{ comment.content }}</text>
        </view>

        <!-- 评论操作 -->
        <view slot="actions" class="card-actions">
          <view class="action-item" @click.stop="toggleCommentLike(comment)">
            <uni-icons :type="comment.isLiked ? 'heart-filled' : 'heart'" size="18" :color="comment.isLiked ? '#f00' : '#999'"></uni-icons>
            <text class="action-item-text">{{ comment.isLiked ? '已点赞' : '点赞' }} {{ comment.likeCount }}</text>
          </view>
          <view class="action-item" @click.stop="replyToComment(comment)">
            <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
            <text class="action-item-text">回复</text>
          </view>
          <view class="action-item" @click.stop="showCommentActionSheet(comment)">
            <uni-icons type="more" size="18" color="#999"></uni-icons>
          </view>
        </view>
      </uni-card>
      <uni-load-more :status="loadMoreStatus" @loadmore="loadComments"></uni-load-more>
    </view>

    <!-- 评论输入框 -->
    <uni-popup ref="commentPopup" type="bottom" :safe-area="true">
      <view class="comment-input-container">
        <uni-easyinput
            v-model="commentContent"
            placeholder="请输入评论内容..."
            :focus="true"
            class="comment-input"
        ></uni-easyinput>
        <button @click="submitComment" class="submit-button">提交</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniCard from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue';
import View from '@/pages/topic/view.vue';

import { deleteTopic, fetchTopic,} from "@/api/topic";

import {
  deleteComment,
  fetchComments,
  likeComment,
  submitComment,
  unlikeComment,
} from "@/api/comment";

import {likeTopic, unlikeTopic} from "@/api/like";
import {collectTopic, uncollectTopic} from "@/api/collect";
import {getCurrentUserInfo, getUserInfo as apiGetUserInfo} from "@/api/user";

export default {
  components: {
    View,
    uniCard,
    uniIcons,
    uniPopup,
    uniLoadMore,
    uniEasyinput,
  },
  data() {
    return {
      topicRecord: null,
      userInfoMap: {},
      isLiked: false,
      isCollected: false,
      commentContent: "",
      comments: [],
      loadMoreStatus: 'more',
      currentUserId: '',
      page: 1,
      pageSize: 5,
      commentCount: 0,
      likeCount: 0,
      collectCount: 0,
      commentLikeCount: 0,
    };
  },
  async onLoad(options) {
    const topicId = options.topicId;
    this.topicId = options.topicId;
    try {
      const currentUser = await getCurrentUserInfo();
      this.currentUserId = currentUser.userId;
      console.log("当前用户ID:", this.currentUserId);

      this.topicRecord = await fetchTopic(topicId);

      await this.loadComments();
      console.log("Received topicId:", topicId);
    } catch (error) {
      console.error("加载数据失败:", error);
      uni.showToast({
        title: '加载数据失败',
        icon: 'none'
      });
    }
  },
  onReachBottom() {
    this.loadComments();
  },
  methods: {
    /**
     * 异步获取用户信息
     */
    async fetchUserInfo(authorID) {
      if (!this.userInfoMap[authorID]) {
        try {
          const userInfo = await apiGetUserInfo(authorID);
          this.$set(this.userInfoMap, authorID, userInfo);
        } catch (error) {
          console.error(`获取用户信息失败 authorID: ${authorID}`, error);
          this.$set(this.userInfoMap, authorID, { username: "匿名用户", avatar: "" });
        }
      }
    },

    /**
     * 加载评论
     */
    async loadComments() {
      if (this.loadMoreStatus === 'loading' || this.loadMoreStatus === 'noMore') {
        return;
      }
      this.loadMoreStatus = 'loading';
      try {
        const res = await fetchComments(this.topicId, this.page, this.pageSize);
        console.log('请求结果:', res);
        if (res.length > 0) {
          this.comments = this.comments.concat(res);
          if (res.length < this.pageSize) {
            this.loadMoreStatus = 'noMore';
          } else {
            this.loadMoreStatus = 'more';
            this.page++;
          }
        } else {
          this.loadMoreStatus = 'noMore';
        }
      } catch (error) {
        console.error('请求失败', error);
        this.loadMoreStatus = 'more';
        uni.showToast({ title: '加载失败', icon: 'none' });
      }
    },

    /**
     * 显示操作菜单
     */
    showActionSheet() {
      const isAuthor = this.currentUserId === this.topicRecord.authorID;
      const itemList = isAuthor ? ['删除', '举报', '取消'] : ['举报', '取消'];

      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          if (isAuthor && res.tapIndex === 0) {
            this.deleteTopic();
          } else if ((isAuthor && res.tapIndex === 1) || (!isAuthor && res.tapIndex === 0)) {
            uni.navigateTo({
              url: `/pages/topic/report?topicId=${this.topicRecord.id}`,
            });
          }
        },
        fail: (res) => {
          console.log(res.errMsg);
        }
      });
    },

    /**
     * 显示评论操作菜单
     */
    showCommentActionSheet(comment) {
      const isAuthor = String(this.currentUserId) === String(comment.userId);
      const itemList = isAuthor ? ['删除', '举报', '取消'] : ['举报', '取消'];

      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          if (isAuthor && res.tapIndex === 0) {
            // 作者选择了“删除”
            this.deleteCommentAction(comment);
          } else if ((isAuthor && res.tapIndex === 1) || (!isAuthor && res.tapIndex === 0)) {
            uni.navigateTo({
              url: `/pages/topic/report?topicId=${this.topicRecord.id}&commentId=${comment.id}`,
            });
          }
        },
        fail: (res) => {
          console.log(res.errMsg);
        }
      });
    },

    /**
     * 打开评论弹窗
     */
    openCommentPopup() {
      this.$refs.commentPopup.open();
    },

    // 创建话题不在该页面
    /**
     * 删除话题
     */
    async deleteTopic() {
      try {
        await deleteTopic(this.topicRecord.id);
        await uni.showToast({ title: '删除成功', icon: 'success' });
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/index'
          });
        }, 1000);
      } catch (error) {
        console.error('删除失败:', error);
        await uni.showToast({ title: '删除失败', icon: 'none' });
      }
    },

    /**
     * 处理点赞操作
     */
    async handleLike() {
      try {
        if (this.topicRecord.isLiked) {
          await unlikeTopic(this.topicRecord.id);
          this.topicRecord.isLiked = false;
          this.topicRecord.likeCount = Math.max(0, this.topicRecord.likeCount - 1);
          await uni.showToast({ title: "取消点赞成功", icon: "success" });
        } else {
          await likeTopic(this.topicRecord.id);
          this.topicRecord.isLiked = true;
          this.topicRecord.likeCount += 1;
          await uni.showToast({ title: "点赞成功", icon: "success" });
        }
      } catch (error) {
        console.error("点赞操作失败:", error);
        await uni.showToast({ title: "操作失败", icon: "none" });
      }
    },

    /**
     * 处理收藏操作
     */
    async handleCollect() {
      try {
        if (this.topicRecord.isCollected) {
          await uncollectTopic(this.topicRecord.id);
          this.topicRecord.isCollected = false;
          this.topicRecord.collectCount = Math.max(0, this.topicRecord.collectCount - 1);
          await uni.showToast({ title: "取消收藏成功", icon: "success" });
        } else {
          await collectTopic(this.topicRecord.id);
          this.topicRecord.isCollected = true;
          this.topicRecord.collectCount += 1;
          await uni.showToast({ title: "收藏成功", icon: "success" });
        }
      } catch (error) {
        console.error("收藏操作失败:", error);
        await uni.showToast({ title: "操作失败", icon: "none" });
      }
    },

    /**
     * 提交评论
     */
    async submitComment() {
      if (!this.commentContent.trim()) {
        await uni.showToast({ title: "评论内容不能为空", icon: "none" });
        return;
      }
      try {
        await submitComment(this.topicRecord.id, this.commentContent);
        await uni.showToast({ title: "评论成功", icon: "success" });
        await this.refreshComments();
        this.commentContent = "";
        this.$refs.commentPopup.close();
      } catch (error) {
        console.error("评论失败:", error);
        await uni.showToast({ title: error , icon: "none" });
      }
    },

    /**
     * 刷新评论列表和计数
     */
    async refreshComments() {
      try {
        console.log("刷新评论列表", this.topicRecord.id);
        this.page = 1;
        this.comments = await fetchComments(this.topicRecord.id, this.page, this.pageSize);
        for (const comment of this.comments) {
          comment.isLiked = await checkIfCommentLiked(comment.id);
          await this.fetchUserInfo(comment.userId);
        }
        this.commentCount = await fetchCommentCount(this.topicRecord.id);
      } catch (error) {
        console.error("刷新评论失败:", error);
        uni.showToast({ title: "刷新评论失败", icon: "none" });
      }
    },

    /**
     * 删除评论
     */
    async deleteCommentAction(comment) {
      try {
        const res = await uni.showModal({
          title: '确认删除',
          content: '您确定要删除这条评论吗？',
          confirmText: '删除',
          cancelText: '取消',
        });

        if (res.confirm) {
          await deleteComment(comment.id);
          this.comments = this.comments.filter((c) => c.id !== comment.id);
          this.commentCount = Math.max(0, this.commentCount - 1);
          await uni.showToast({ title: '删除成功', icon: 'success' });
        }
      } catch (error) {
        console.error('删除评论失败:', error);
        await uni.showToast({ title: '删除失败', icon: 'none' });
      }
    },

    /**
     * 回复评论
     */
    async replyToComment(comment) {
      // TODO: 实现回复评论功能
      await uni.showToast({ title: "回复评论功能暂未开放", icon: "none" });
    },

    /**
     * 点赞/取消点赞评论
     */
    async toggleCommentLike(comment) {
      try {
        if (comment.isLiked) {
          await unlikeComment(comment.id);
          comment.isLiked = false;
          comment.likeCount = Math.max(0, comment.likeCount - 1);
          await uni.showToast({ title: "取消点赞成功", icon: "success" });
        } else {
          await likeComment(comment.id);
          comment.isLiked = true;
          comment.likeCount += 1;
          await uni.showToast({ title: "点赞成功", icon: "success" });
        }
      } catch (error) {
        console.error("评论点赞操作失败:", error);
        await uni.showToast({ title: "操作失败", icon: "none" });
      }
    }
  },
};
</script>

<style lang="scss">
.action-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  background-color: transparent;
  border: none;
  color: inherit;
  outline: none;
  box-shadow: none;
  font-family: inherit;
  position: relative;
}

.share-item {
  position: relative;
}

/* 隐藏的按钮样式，覆盖整个 share view */
.share-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1; /* 确保分享按钮的透明 button 只在分享 view 中生效 */
}

.action-item uni-icons {
  font-size: 16px;
  color: #666;
}

.action-item-text {
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

.card-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-top: 1px #eee solid;
}

.comment-actions {
  display: flex;
  gap: 15px;
  margin-top: 6px;
}

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

.comment-card {
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.comment-input-container {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ccc;
}

.comment-input {
  flex: 1;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
}

.submit-button {
  padding: 10px;
  color: #007aff;
  font-weight: bold;
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

.comment-more-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}

.card-container {
  position: relative;
}

.three-dots-icon {
  position: absolute;
  right: 10px;
  top: 20px;
}

.submit-button {
  padding: 4px 12px;
  margin-left: 10px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
  height: auto;
}

.submit-button:hover {
  background-color: #005bb5; /* 悬停时稍微变深 */
}

.submit-button:active {
  background-color: #004494; /* 点击时更深 */
}
</style>
