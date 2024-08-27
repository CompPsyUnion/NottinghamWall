<template>
  <view>
    <CustomSwiper :imgList="imgList" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="500"/>
    <TopicComponent :records="records" :loadMoreStatus="loadMoreStatus"/>
    <FabComponent />
  </view>
</template>

<script>
import { userLoginService } from '@/api/login';
import CustomSwiper from './components/swipper.vue'; // 引入自定义的 swiper 组件
import FabComponent from './components/fab.vue'; // 引入自定义的 fab 组件
import TopicComponent from './components/topic.vue';
import { baseUrl } from "@/utils/env"; // 引入自定义的 topic 组件
export default {
  components: {
    CustomSwiper,
    FabComponent,
    TopicComponent
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
      page: 1, // 当前页码
      records: [], // 话题记录列表
      loadMoreStatus: 'more', // 加载状态（'more', 'loading', 'noMore'）
      total: 0 // 总记录数
    };
  },
  onReachBottom() {
    this.getRecords(); // 页面滚动到底部时加载更多数据
  },
  onLoad() {
    //页面加载时获取话题数据
    this.getRecords();
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
      },
      fail: function (err) {
        console.log('login fail:', err);
      }
    });
  },
  methods: {
    // 获取记录数据
    async getRecords() {
      if (this.loadMoreStatus === 'loading' || this.loadMoreStatus === 'noMore') {
        return; // 如果正在加载或没有更多数据，则不再请求
      }

      this.loadMoreStatus = 'loading'; // 设置为加载中
      try {
        const res = await uni.request({
          url: baseUrl + '/student/get/topic?page=' + this.page + '&pageSize=10',
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'token': uni.getStorageSync('token')
          },
        });
        console.log('请求结果:', res);
        if (res.data.code === 1) {
          const newRecords = res.data.data.records;
          this.total = res.data.data.total;
          this.records = this.records.concat(newRecords); // 追加新数据到记录列表中

          if (this.records.length >= this.total) {
            this.loadMoreStatus = 'noMore'; // 如果数据已经加载完毕
          } else {
            this.loadMoreStatus = 'more'; // 继续可以加载
            this.page++; // 页码增加
          }
        } else {
          this.loadMoreStatus = 'more'; // 请求失败后重置为可加载状态
          uni.showToast({title: '加载失败', icon: 'none'});
        }
      } catch (error) {
        console.error('请求失败', error);
        this.loadMoreStatus = 'more'; // 请求失败后重置为可加载状态
        uni.showToast({title: '加载失败', icon: 'none'});
      }
    },
  }
};
</script>
