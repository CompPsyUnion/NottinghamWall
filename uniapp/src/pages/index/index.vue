<template>
  <view>
    <CustomSwiper :imgList="imgList" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="500"/>
    <FabComponent />
  </view>
</template>

<script>
import {userLoginService} from '@/api/login';
import CustomSwiper from './components/swipper.vue'; // 引入自定义的 swiper 组件
import FabComponent from './components/fab.vue'; // 引入自定义的 fab 组件
export default {
  components: {
    CustomSwiper,
    FabComponent
  },
  data() {
    return {
      //轮播图固定图片
      imgList: [
        {img: '/static/carousel/image1.jpg'},
        {img: '/static/carousel/image2.jpg'},
        {img: '/static/carousel/image3.jpg'},
        {img: '/static/carousel/image4.jpg'},
        {img: '/static/carousel/image5.jpg'},
        {img: '/static/carousel/image6.jpg'},
      ],
    };
  },
  onLoad() {
    //自动登录
    uni.login({
      provider: 'weixin', // 使用微信登录
      success: async function (loginRes) {
        if (loginRes.errMsg === 'login:ok') {
          console.log('-=-=-=-=loginRes-=-=-=', loginRes);
        }
        const params = {
          code: loginRes.code // 添加 code 到请求体
        };
        await userLoginService(params);
      }
    });
  },
};
</script>
