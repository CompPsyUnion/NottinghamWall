<template>
  <view>
    <uni-section title="最新话题" type="line">
      <uni-card v-for="(record, index) in records" :key="index" @click="onClick(record)">
        <view class="image-container">
          <image v-for="(img, imgIndex) in record.imgURLs" :key="imgIndex" :src="img" class="cover-image"/>
        </view>
        <text class="uni-body content">{{ record.content }}</text>
        <view slot="actions" class="card-actions">
          <view class="card-actions-item" @click.stop="actionsClick('分享', record)">
            <uni-icons type="redo" size="18" color="#999"></uni-icons>
            <text class="card-actions-item-text">分享</text>
          </view>
          <view class="card-actions-item" @click.stop="actionsClick('点赞', record)">
            <uni-icons type="heart" size="18" color="#999"></uni-icons>
            <text class="card-actions-item-text">点赞</text>
          </view>
          <view class="card-actions-item" @click.stop="actionsClick('评论', record)">
            <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
            <text class="card-actions-item-text">评论</text>
          </view>
        </view>
      </uni-card>
      <uni-load-more :status="loadMoreStatus"/>
    </uni-section>
  </view>
</template>

<script>
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
  methods: {
    onClick(record) {
      console.log('点击记录:', record);
    },
    actionsClick(action, record) {
      uni.showToast({
        title: `${action}: ${record.content}`,
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss">
.image-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px; /* 增加图片和内容之间的距离 */
}

.cover-image {
  flex: 1;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.content {
  margin-bottom: 10px; /* 增加内容和actions之间的距离 */
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
