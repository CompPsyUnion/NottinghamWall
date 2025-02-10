<template>
      <uni-card
          v-for="(record, index) in records"
          :key="index"
          @click="onClick(record)"
      >
        <view class="image-container">
          <image
              v-for="(img, imgIndex) in (record.imgURLs || [])"
              :key="imgIndex"
              :src="img"
              :class="['cover-image', {'two-images': record.imgURLs?.length === 2, 'one-image': record.imgURLs?.length === 1}]"
          />
        </view>
        <text class="uni-body content">{{ record.content }}</text>
        <view slot="actions" class="card-actions">
          <view class="action-item" @click.stop="handleLike(record)">
            <uni-icons :type="record.isLiked ? 'heart-filled' : 'heart'" size="18" :color="record.isLiked ? '#f00' : '#999'"></uni-icons>
            <text class="action-item-text">
              {{ record.isLiked ? '已点赞' : '点赞' }} {{ record.likeCount }}
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
</template>

<script>
import uniLoadMore from "@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue";
import uniCard from "@dcloudio/uni-ui/lib/uni-card/uni-card.vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import uniSection from "@dcloudio/uni-ui/lib/uni-section/uni-section.vue";

import { likeTopic, unlikeTopic } from "@/api/like";
import {collectTopic, uncollectTopic} from "@/api/collect";
import View from "@/pages/topic/view.vue";

export default {
  components: {
    View,
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
  methods: {
    onClick(record) {
      uni.navigateTo({
        url: `/pages/topic/view?topicId=${record.id}`,
      });
    },
    async handleLike(record) {
      try {
        if (record.isLiked) {
          await unlikeTopic(record.id);
          record.isLiked = false;
          record.likeCount = Math.max(0, record.likeCount - 1);
          uni.showToast({ title: "取消点赞成功", icon: "success" });
        } else {
          await likeTopic(record.id);
          record.isLiked = true;
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
        if (record.isCollected) {
          await uncollectTopic(record.id);
          record.isCollected = false;
          record.collectCount = Math.max(0, record.collectCount - 1);
          await uni.showToast({ title: "取消收藏成功", icon: "success" });
        } else {
          await collectTopic(record.id);
          record.isCollected = true;
          record.collectCount += 1;
          await uni.showToast({ title: "收藏成功", icon: "success" });
        }
      } catch (error) {
        console.error("收藏操作失败:", error);
        await uni.showToast({ title: "操作失败", icon: "none" });
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
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.cover-image {
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
}

.cover-image.two-images {
  width: calc(33.33% - 7px);
}

.cover-image.one-image {
  width: calc(33.33% - 7px);
}

.cover-image:not(.two-images):not(.one-image) {
  flex: 1;
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
