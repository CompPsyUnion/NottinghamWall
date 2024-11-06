<template>
  <view>
    <uni-card
        v-if="topicRecord"
        :isFull="true"
        :title="getUserInfo(topicRecord.authorID).username"
        :sub-title="topicRecord.updatedAt"
        :thumbnail="getUserInfo(topicRecord.authorID).avatar"
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
        <!-- 点赞按钮 -->
        <view class="action-item" @click.stop="actionsClick(hasLiked ? '取消点赞' : '点赞', topicRecord)">
          <uni-icons :type="hasLiked ? 'heart-filled' : 'heart'" size="18" :color="hasLiked ? '#f00' : '#999'"></uni-icons>
          <text class="action-item-text">
            {{ hasLiked ? '已点赞' : '点赞' }} {{ likeCount }}
          </text>
        </view>

        <!-- 评论按钮 -->
        <view class="action-item" @click.stop="actionsClick('评论', topicRecord)">
          <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
          <text class="action-item-text">评论 {{ commentCount }}</text>
        </view>

        <!-- 分享按钮 -->
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

        <!-- 收藏按钮 -->
        <view class="action-item" @click.stop="toggleCollect">
          <uni-icons :type="isCollected ? 'star-filled' : 'star'" size="18" :color="isCollected ? '#ffcc00' : '#999'"></uni-icons>
          <text class="action-item-text">
            {{ isCollected ? '已收藏' : '收藏' }} {{ collectCount }}
          </text>
        </view>

      </view>
    </uni-card>

    <!-- 评论展示区域 -->
    <view v-if="comments.length" class="comments-section">
      <uni-card
          v-for="(comment, index) in comments"
          :key="comment.id"
          :isFull="true"
          :title="getUserInfo(comment.userId).username"
          :sub-title="comment.createdAt"
          :thumbnail="getUserInfo(comment.userId).avatar"
          class="comment-card"
          @click.stop
      >
        <!-- 评论内容 -->
        <view v-if="comment.content" class="comment-text">
          <text>{{ comment.content }}</text>
        </view>

        <!-- 评论操作 -->
        <view slot="actions" class="card-actions">
          <!-- 点赞按钮 -->
          <view class="action-item" @click="comment.hasLiked ? unlikeComment(comment) : likeComment(comment)">
            <uni-icons :type="comment.hasLiked ? 'heart-filled' : 'heart'" size="18" :color="comment.hasLiked ? '#f00' : '#999'"></uni-icons>
            <text class="action-item-text">{{ comment.hasLiked ? '已点赞' : '点赞' }} {{ comment.likeCount }}</text>
          </view>
          <!-- 回复按钮 -->
          <view class="action-item" @click="replyToComment(comment)">
            <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
            <text class="action-item-text">回复</text>
          </view>
          <!-- 更多按钮 -->
          <view class="action-item" @click.stop="showCommentActionSheet(comment)">
            <uni-icons type="more" size="18" color="#999"></uni-icons>
          </view>
        </view>
      </uni-card>

      <uni-load-more :status="loadMoreStatus"></uni-load-more>
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
import {baseUrl} from "@/utils/env";

// TODO 首页卡片功能连接
// TODO 评论无线滚动
export default {
  data() {
    return {
      topicRecord: null, // 当前话题记录
      userInfoMap: {}, // 存储 authorID 对应的用户信息
      hasLiked: false, // 是否已点赞
      isCollected: false, // 是否已收藏
      commentContent: "", // 评论内容
      comments: [], // 评论列表
      loadMoreStatus: 'more', // 加载更多的状态
      currentUserId: '', // 当前用户的ID
      commentCount: 0,
      likeCount: 0,
      collectCount: 0,
    };
  },
  onLoad(options) {
    const topicId = options.topicId;
    this.fetchTopic(topicId);
    this.checkIfLiked(topicId);
    this.fetchComments(topicId);
    this.checkIfCollected(topicId);
    this.fetchCommentCount(topicId);
    this.fetchLikeCount(topicId);
    this.fetchCollectCount(topicId);
    this.fetchCurrentUserInfo();

    console.log("Received topicId:", topicId);
  },
  onShareAppMessage() {
    return {
      title: this.topicRecord ? this.topicRecord.content.slice(0, 20) : '分享一个有趣的内容',
      path: `/pages/topic/view?topicId=${this.topicRecord.id}`,
      imageUrl: this.topicRecord.imgURLs && this.topicRecord.imgURLs.length > 0 ? this.topicRecord.imgURLs[0] : ''
    };
  },
  methods: {
    /**
     * 获取当前用户信息
     * @returns {Promise<void>}
     */
    async fetchCurrentUserInfo() {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: baseUrl + '/student/get/currentUserInfo',
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
              'token': uni.getStorageSync('token'),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });

        if (res.data.code === 1) {
          // 假设返回的数据结构中包含 userId
          this.currentUserId = res.data.data.userId; // 根据实际返回字段调整
          console.log("当前用户ID:", this.currentUserId);
        } else {
          console.error('获取当前用户信息失败:', res.data.msg);
          uni.showToast({
            title: '获取用户信息失败',
            icon: 'none'
          });
          this.currentUserId = null; // 或者根据需求处理
        }
      } catch (error) {
        console.error('请求失败:', error);
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        });
        this.currentUserId = null; // 或者根据需求处理
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
     * 显示操作菜单
     */
    showActionSheet() {
      // 判断当前用户是否为话题作者
      const isAuthor = this.currentUserId === this.topicRecord.authorID;

      // 定义操作选项
      const itemList = isAuthor ? ['删除', '举报', '取消'] : ['举报', '取消'];

      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          if (isAuthor && res.tapIndex === 0) {
            // 作者选择了“删除”
            this.deleteItem();
          } else if ((isAuthor && res.tapIndex === 1) || (!isAuthor && res.tapIndex === 0)) {
            // 选择了“举报”
            this.reportTopic();
          }
        },
        fail: (res) => {
          console.log(res.errMsg);
        }
      });
    },

    /**
     * 显示评论操作菜单
     * @param {Object} comment
     */
    showCommentActionSheet(comment) {
      const isAuthor = String(this.currentUserId) === String(comment.userId);
      const itemList = isAuthor ? ['删除', '举报', '取消'] : ['举报', '取消'];

      uni.showActionSheet({
        itemList: itemList,
        success: (res) => {
          if (isAuthor && res.tapIndex === 0) {
            // 作者选择了“删除”
            this.deleteComment(comment);
          } else if ((isAuthor && res.tapIndex === 1) || (!isAuthor && res.tapIndex === 0)) {
            // 选择了“举报”
            this.reportComment(comment);
          }
        },
        fail: (res) => {
          console.log(res.errMsg);
        }
      });
    },

    /**
     * 删除话题
     * @returns {Promise<void>}
     */
    deleteItem() {
      uni.request({
        url: baseUrl + '/student/delete/topic/' + this.topicRecord.id,
        method: 'DELETE',
        header: {
          'Content-Type': 'application/json',
          'token': uni.getStorageSync('token')
        },
        success: function (res) {
          if (res.statusCode === 200) {
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            });
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/index/index'
              });
            }, 1000);
          } else {
            console.error('删除失败，状态码:', res.statusCode);
            uni.showToast({
              title: '删除失败',
              icon: 'none'
            });
          }
        },
        fail: function (error) {
          console.error('删除请求失败:', error);
          uni.showToast({
            title: '删除请求失败',
            icon: 'none'
          });
        }
      });
    },

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
        // 使用 Promise 包装 uni.request 以支持 await
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: baseUrl + "/student/get/comments/" + topicId,
            method: "GET",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });

        // 检查返回数据是否成功
        if (res.data.code === 1) {
          this.comments = res.data.data;
          console.log("Fetched comments:", this.comments);
          for (const comment of this.comments) {
            comment.hasLiked = await this.checkIfCommentLiked(comment.id);
          }
          // 获取评论者的用户信息
          this.comments.forEach((comment) => {
            if (comment.userId && !this.userInfoMap[comment.userId]) {
              this.fetchUserInfo(comment.userId);
            }
          });
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
    actionsClick(action) {
      if (action === '点赞') {
        this.likeTopic();
      } else if (action === '取消点赞') {
        this.unlikeTopic();
      } else if (action === '评论') {
        this.$refs.commentPopup.open();
      }
    },

    /**
     * 获取点赞计数
     * @param topicId
     * @returns {Promise<void>}
     */
    async fetchLikeCount(topicId) {
      try {
        const res = await uni.request({
          url: baseUrl + "/student/like/count/" + topicId,
          method: "GET",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.likeCount = res.data.data || 0;
        } else {
          this.likeCount = 0;
        }
      } catch (error) {
        console.error("获取点赞计数失败:", error);
        this.likeCount = 0;
      }
    },

    /**
     * 提交评论
     * @returns {Promise<void>}
     */
    async submitComment() {
      if (!this.commentContent.trim()) {
        await uni.showToast({ title: "评论内容不能为空", icon: "none" });
        return;
      }
      try {
        const [error, res] = await uni.request({
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
          await uni.showToast({ title: "评论成功", icon: "success" });
          await this.fetchComments(this.topicRecord.id);
          this.commentContent = "";
          this.$refs.commentPopup.close();
        } else {
          await uni.showToast({ title: res.data.msg || "评论失败", icon: "none" });
        }
      } catch (error) {
        console.error("评论失败:", error);
        await uni.showToast({ title: "评论失败", icon: "none" });
      }
    },

    /**
     * 获取评论计数
     * @param topicId
     * @returns {Promise<void>}
     */
    async fetchCommentCount(topicId) {
        try {
          const res = await uni.request({
            url: baseUrl + "/student/comment/count/" + topicId,
            method: "GET",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
          });
          if (res.data.code === 1) {
            this.commentCount = res.data.data || 0;
          } else {
            this.commentCount = 0;
          }
        } catch (error) {
          console.error("获取评论计数失败:", error);
          this.commentCount = 0;
        }
      },

    /**
     * 回复评论
     * @param comment
     */
    async replyToComment(comment) {
      // TODO: 实现回复评论功能
      await uni.showToast({ title: "回复评论功能暂未开放", icon: "none" });
    },

    /**
     * 点赞评论
     * @param comment
     */
    async likeComment(comment) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: baseUrl + "/student/like/comment/" + comment.id,
            method: "POST",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });
        if (res.data.code === 1) {
          comment.hasLiked = true;
          await uni.showToast({ title: "点赞成功", icon: "success" });
        } else {
          await uni.showToast({ title: res.data.msg || "点赞失败", icon: "none" });
        }
      } catch (error) {
        console.error("点赞评论失败:", error);
        await uni.showToast({ title: "点赞失败", icon: "none" });
      }
    },

    /**
     * 取消点赞评论
     * @param comment
     */
    async unlikeComment(comment) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: baseUrl + "/student/unlike/comment/" + comment.id,
            method: "POST",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });
        if (res.data.code === 1) {
          comment.hasLiked = false;
          await uni.showToast({ title: "取消点赞成功", icon: "success" });
          await uni.reLaunch({ url: `/pages/topic/view?topicId=${this.topicRecord.id}` });
        } else {
          await uni.showToast({ title: res.data.msg || "取消点赞失败", icon: "none" });
        }
      } catch (error) {
        console.error("取消点赞评论失败:", error);
        await uni.showToast({ title: "取消点赞失败", icon: "none" });
      }
    },

    /**
     * 检查当前用户是否已点赞某条评论
     * @returns {Promise<boolean>}
     * @param commentId
     */
    async checkIfCommentLiked(commentId) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: baseUrl + "/student/islike/comment/" + commentId,
            method: "GET",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });
        if (res.data.code === 1) {
          return res.data.data; // 返回 true 或 false
        } else {
          return false;
        }
      } catch (error) {
        console.error("检查评论点赞状态失败:", error);
        return false;
      }
    },

    /**
     * 删除评论
     * @param {Object} comment
     */
    async deleteComment(comment) {
      try {
        // 显示确认对话框
        const [error, res] = await uni.showModal({
          title: '确认删除',
          content: '您确定要删除这条评论吗？',
          confirmText: '删除',
          cancelText: '取消',
        });

        if (res.confirm) {
          // 用户确认删除
          const response = await uni.request({
            url: baseUrl + '/student/delete/comment/' + comment.id,
            method: 'DELETE',
            header: {
              'Content-Type': 'application/json',
              token: uni.getStorageSync('token'),
            },
          });

          if (response.data.code === 1) {
            await uni.showToast({ title: '删除成功', icon: 'success' });
            // 从评论列表中移除已删除的评论
            this.comments = this.comments.filter((c) => c.id !== comment.id);
            // 更新评论计数
            this.commentCount = Math.max(0, this.commentCount - 1);
          } else {
            await uni.showToast({ title: '删除失败', icon: 'none' });
          }
        }
      } catch (error) {
        console.error('删除评论失败:', error);
        await uni.showToast({ title: '删除失败', icon: 'none' });
      }
    },

    /**
     * 举报话题
     * @returns {Promise<void>}
     */
    async reportTopic() {
      await uni.showToast({ title: '举报功能暂未开放', icon: 'none' });
      // TODO: 实现举报功能
    },

    /**
     * 举报评论
     * @returns {Promise<void>}
     */
    async reportComment(comment) {
      await uni.showToast({ title: '举报功能暂未开放', icon: 'none' });
      // TODO: 实现举报功能
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
          this.likeCount += 1;
          await uni.showToast({title: "点赞成功", icon: "success"});
        } else {
          await uni.showToast({title: "点赞失败", icon: "none"});
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
          this.likeCount = Math.max(0, this.likeCount - 1);
          await uni.showToast({title: "取消点赞成功", icon: "success"});
        } else {
          await uni.showToast({title: "取消点赞失败", icon: "none"});
        }
      } catch (error) {
        console.error("取消点赞失败:", error);
      }
    },

    /**
     * 检查是否已收藏
     * @param topicId
     * @returns {Promise<void>}
     */
    async checkIfCollected(topicId) {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: baseUrl + "/student/iscollect/topic/" + topicId,
            method: "GET",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });
        if (res.data.code === 1) {
          this.isCollected = res.data.data;
          console.log("检查是否已收藏:", this.isCollected);
        } else {
          this.isCollected = false;
        }
      } catch (error) {
        console.error("检查是否已收藏失败:", error);
        this.isCollected = false;
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
          console.log("Received authorID:", authorID);
          const res = await uni.request({
            url: baseUrl + `/student/get/info/${authorID}`,
            method: "GET",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
          });
          if (res.data.code === 1) {
            this.$set(this.userInfoMap, authorID, res.data.data);
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
     * 收藏或取消收藏话题
     * @returns {Promise<void>}
     */
    async toggleCollect() {
      try {
        const url = this.isCollected
            ? baseUrl + "/student/uncollect/topic/" + this.topicRecord.id
            : baseUrl + "/student/collect/topic/" + this.topicRecord.id;

        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: url,
            method: "POST",
            header: {
              "content-type": "application/json",
              token: uni.getStorageSync("token"),
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });

        if (res.data.code === 1) {
          this.isCollected = !this.isCollected;
          const message = this.isCollected ? "收藏成功" : "取消收藏成功";
          this.collectCount = this.isCollected
              ? this.collectCount + 1
              : Math.max(0, this.collectCount - 1);
          await uni.showToast({ title: message, icon: "success" });
        } else {
          await uni.showToast({ title: "操作失败", icon: "none" });
        }
      } catch (error) {
        console.error("收藏操作失败:", error);
        await uni.showToast({ title: "收藏操作失败", icon: "none" });
      }
    },

    /**
     * 获取收藏计数
     * @param topicId
     * @returns {Promise<void>}
     */
    async fetchCollectCount(topicId) {
      try {
        const res = await uni.request({
          url: baseUrl + "/student/collect/count/" + topicId,
          method: "GET",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.collectCount = res.data.data || 0;
        } else {
          this.collectCount = 0;
        }
      } catch (error) {
        console.error("获取收藏计数失败:", error);
        this.collectCount = 0;
      }
    },

    /**
     * 异步获取话题数据
     * @param topicId
     * @returns {Promise<void>}
     */
    async fetchTopic(topicId) {
      try {
        const res = await uni.request({
          url: baseUrl + "/student/topic/" + topicId,
          method: "GET",
          header: {
            "content-type": "application/json",
            token: uni.getStorageSync("token"),
          },
        });
        if (res.data.code === 1) {
          this.topicRecord = res.data.data;
          await this.fetchUserInfo(this.topicRecord.authorID);
        } else {
          await uni.showToast({title: "获取话题失败", icon: "none"});
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