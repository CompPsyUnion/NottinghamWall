<script>
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import Navbar from '@/pages/components/Navbar.vue'
import Swiper from '@/pages/components/Swiper.vue'
import comment from '@/pages/comment/comment.vue'

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  components:{
    CategoryPanel,
    Navbar,
    Swiper,
    comment
  }
}
</script>

<template>
  <Navbar />
  <view class="container">
      <!--轮播图 -->
      <Swiper />
      <!-- 分类面板 -->
      <CategoryPanel />
      <!--校园墙 -->
      <comment />


  </view>
</template>


<style lang="scss">
.page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroller-view {
  flex: 1;
}

</style>
