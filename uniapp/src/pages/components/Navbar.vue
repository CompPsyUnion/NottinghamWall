<template>
  <view>
    <view class="example-body">
      <!--uni-nav-bar 中的 statusBar 主要是为了适配"齐刘海"，防止navbar遮盖住手机顶部的电量、时间等状态 -->
      <uni-nav-bar
        dark
        shadow
        color="#f7f7f7"
        backgroundColor="#92e666"
        height="80rpx"
        :fixed="false"
        statusBar="false"
        title="宁诺校园墙"  />

    </view>
  </view>
</template>

<script>
import uniNavBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    uniNavBar
  }
}
</script>

<style lang="scss">
.input-view {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  width: 600rpx;
  flex: 1;
  background-color: #f8f8f8;
  height: 30px;
  border-radius: 15px;
  padding: 0 15px;
  flex-wrap: nowrap;
  margin: 7px 0;
  line-height: 30px;
}

.input-uni-icon {
  line-height: 30px;
}

.nav-bar-input {
  height: 30px;
  line-height: 30px;
  /* #ifdef APP-PLUS-NVUE */
  width: 370rpx;
  /* #endif */
  padding: 0 5px;
  font-size: 28rpx;
  background-color: #f8f8f8;
}

.example-body {
  padding: 0;
}
</style>
