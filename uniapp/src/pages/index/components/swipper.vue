<template>
  <view class="slideshowBox">
    <swiper class="swiper" :current="currentSwiper" circular :indicator-dots="indicatorDots"
            :autoplay="autoplay" :interval="interval" :duration="duration" @change="swiperChangeFun">
      <swiper-item v-for="(item, index) in imgList" :key="index">
        <view class="swiper-item">
          <image :src="item.img" mode="aspectFill" class="image" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      required: true
    },
    indicatorDots: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      currentSwiper: 0,
    };
  },
  methods: {
    swiperChangeFun(e) {
      this.currentSwiper = e.detail.current;
    },
  },
};
</script>

<style lang="scss">
.slideshowBox {
  height: 150px;
}

.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.image {
  width: 90%; /* 图片宽度设置为容器的90% */
  height: 90%; /* 图片高度设置为容器的90% */
  object-fit: cover;
  border-radius: 15px; /* 设置圆角 */
}
</style>
