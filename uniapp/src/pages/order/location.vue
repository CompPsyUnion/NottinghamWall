<template>
  <view class="map-box">
    <vue3-map @commitCheck="commitCheck" :mapKey='mapKey' :Radius='Radius' :showResetting='showResetting' :listIco='listIco' :orientationIco='orientationIco' :resettingIco='resettingIco' :configData='configData'></vue3-map>
  </view>
</template>

<script>

import {mapkey} from '@/utils/env'

export default {
  data() {
    return {
      mapKey: mapkey,
      address: '',
      latitude: '',
      longitude: '',
      listIco:'/uni_modules/vue3-map/static/item-inx.png',
      orientationIco:'/uni_modules/vue3-map/static/map-inx.png',
      resettingIco:"/uni_modules/vue3-map/static/position.png",
      showResetting:true,
      Radius:'',
      // 微信公众号jsSdk配置
      configData:{
        debug:false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:'',// 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '', // 必填，签名

      }
    };
  },
  methods: {
    commitCheck(e) {
      console.log(e, 565);
      uni.$emit('commitCheck', e);
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="scss">
.map-box {
  height: 100vh;
  width: 100vw;
}
</style>
