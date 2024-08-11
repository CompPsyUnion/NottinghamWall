<template>
  <view>
    <CustomSwiper :imgList="imgList" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="500" />
  </view>
</template>

<script>
import CustomSwiper from './components/swipper.vue'; // 引入自定义的 swiper 组件

export default {
  components: {
    CustomSwiper
  },
  data() {
    return {
      imgList: [
        { img: '/static/carousel/image1.jpg' },
        { img: '/static/carousel/image2.jpg' },
        { img: '/static/carousel/image3.jpg' },
        { img: '/static/carousel/image4.jpg' },
        { img: '/static/carousel/image5.jpg' },
        { img: '/static/carousel/image6.jpg' },
      ],
    };
  },
};
</script>
