<script setup lang="ts">

import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'

</script>

<template>
  <view class="container">
    <uni-nav-bar
      dark
      shadow
      color="#f7f7f7"
      backgroundColor="#92e666"
      height="80rpx"
      :fixed="true"
      statusBar="false"
      title="消息列表"  />

  <view>
    <text>message</text>
  </view>
  </view>
</template>

<style scoped lang="scss">

</style>
