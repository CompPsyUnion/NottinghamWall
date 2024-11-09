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
              :class="['cover-image', {'two-images': record.imgURLs.length === 2, 'one-image': record.imgURLs.length === 1}]"
          />
        </view>
        <text class="uni-body content">{{ record.content }}</text>
        <view slot="actions" class="card-actions">
          <view class="action-item" @click.stop="handleLike(record)">
            <uni-icons :type="record.hasLiked ? 'heart-filled' : 'heart'" size="18" :color="record.hasLiked ? '#f00' : '#999'"></uni-icons>
            <text class="action-item-text">
              {{ record.hasLiked ? '已点赞' : '点赞' }} {{ record.likeCount }}
            </text>
          </view>
          <view class="action-item">
            <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
            <text class="action-item-text">评论 {{ record.commentCount }}</text>
          </view>
          <view class="action-item" @click.stop="handleCollect(record)">
            <uni-icons :type="record.isCollected ? 'star-filled' : 'star'" size="18" :color="record.isCollected ? '#ffcc00' : '#999'"></uni-icons>
            <text class="action-item-text">
              {{ record.isCollected ? '已收藏' : '收藏' }} {{ record.collectCount }}
            </text>
          </view>
        </view>
      </uni-card>
      <uni-load-more :status="loadMoreStatus" />
    </uni-section>
  </view>
</template>

<script>
import uniLoadMore from "@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue";
import uniCard from "@dcloudio/uni-ui/lib/uni-card/uni-card.vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import uniSection from "@dcloudio/uni-ui/lib/uni-section/uni-section.vue";

import { baseUrl } from "@/utils/env";
import { checkIfLiked, fetchLikeCount, likeTopic, unlikeTopic } from "@/api/like";
import { checkIfCollected, fetchCollectCount, toggleCollect } from "@/api/collect";
import { fetchCommentCount } from "@/api/comment";

export default {
  components: {
    uniLoadMore,
    uniCard,
    uniIcons,
    uniSection,
  },
  props: {
    records: {
      type: Array,
      required: true,
    },
    loadMoreStatus: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userInfoMap: {},
    };
  },
  watch: {
    records: {
      async handler(newRecords) {
        const promises = newRecords.map(async (record) => {
          await this.fetchUserInfo(record.authorID);
          record.hasLiked = await checkIfLiked(record.id);
          record.isCollected = await checkIfCollected(record.id);
          record.likeCount = await fetchLikeCount(record.id);
          record.collectCount = await fetchCollectCount(record.id);
          record.commentCount = await fetchCommentCount(record.id);
        });

        await Promise.all(promises);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchUserInfo(authorID) {
      if (!this.userInfoMap[authorID]) {
        try {
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
            this.$set(this.userInfoMap, authorID, { nickname: "匿名用户", avatar: "" });
          }
        } catch (error) {
          console.error(`获取用户信息失败 authorID: ${authorID}`, error);
          this.$set(this.userInfoMap, authorID, { nickname: "匿名用户", avatar: "" });
        }
      }
    },
    getUserInfo(authorID) {
      if (!this.userInfoMap[authorID]) {
        this.fetchUserInfo(authorID);
      }
      return this.userInfoMap[authorID] || {};
    },
    onClick(record) {
      uni.navigateTo({
        url: `/pages/topic/view?topicId=${record.id}`,
      });
    },
    async handleLike(record) {
      try {
        if (record.hasLiked) {
          await unlikeTopic(record.id);
          record.hasLiked = false;
          record.likeCount = Math.max(0, record.likeCount - 1);
          uni.showToast({ title: "取消点赞成功", icon: "success" });
        } else {
          await likeTopic(record.id);
          record.hasLiked = true;
          record.likeCount += 1;
          uni.showToast({ title: "点赞成功", icon: "success" });
        }
      } catch (error) {
        console.error("点赞操作失败:", error);
        uni.showToast({ title: "操作失败", icon: "none" });
      }
    },
    async handleCollect(record) {
      try {
        await toggleCollect(record.id, record.isCollected);
        record.isCollected = !record.isCollected;
        record.collectCount = record.isCollected ? record.collectCount + 1 : Math.max(0, record.collectCount - 1);
        const message = record.isCollected ? "收藏成功" : "取消收藏成功";
        uni.showToast({ title: message, icon: "success" });
      } catch (error) {
        console.error("收藏操作失败:", error);
        uni.showToast({ title: "操作失败", icon: "none" });
      }
    },

    async handleShare(record) {
      this.$emit('share', record);
    },
  },
};
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
`