<template>
  <view class="home">
    <view class="index_banner_box">
      <!-- 顶部banner,同时配置对应参数 -->
      <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
        <!-- 从图片数组中取出对应图片并展示在页面上 -->
        <swiper-item v-for="(item, index) in topBanner" :key="index">
          <image class="banner" :src="item.img_url" mode=""></image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      //多张图片，用数组存放
      //写死
      topBanner: [
        { img_url: '/static/nottingham_1.jpg' },
        { img_url: '/static/nottingham_2.jpg' },
        { img_url: '/static/nottingham_3.jpg' },
      ],

    }
  },
  methods: {

  },
  mounted(){
    // //vue的生命周期函数
    // uni.request({
    //   url: "http://html5.bjsxt.cn/api/index/banner",
    //   //注意：网络请求必须要按照下面的方式发起，不能使用新语法等
    //   success: (res) => {
    //     // console.log(res)
    //     this.topBanner = res.data.top_banner
    //   }
    // })
  },
  components:{
  }
}
</script>


<!-- 使用scss的语法 -->
<style lang="scss">
.home {
  //flex：盒子模型
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  .index_banner_box {
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    .swiper{
      width: 100%;
      height: 300rpx;
      .banner{
        width: 700rpx;
        height: 300rpx;
      }
    }
  }
}
</style>
