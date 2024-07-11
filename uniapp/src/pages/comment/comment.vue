<script>
export default {
  components: {},
  data() {
    return {
      cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
      avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
      extraIcon:{
        color: '#4cd964',
        size: '22',
        type: 'gear-filled'
      }
    }
  },
  methods: {
    onClick(e){
      console.log(e)
    },
    actionsClick(text){
      uni.showToast({
        title:text,
        icon:'none'
      })
    }
  }
}
</script>


<template>
  <uni-section title="最新帖子" type="line" >
    <uni-card title="宁诺校园墙建立了！" sub-title="Pleasure1234" extra="额外信息" :thumbnail="avatar" @click="onClick">
      <text class="uni-body">测试帖子，尚未建立后端。写死。</text>
    </uni-card>
  </uni-section>
</template>

<style lang="scss">
.container {
  overflow: hidden;
}

.custom-cover {
  flex: 1;
  flex-direction: row;
  position: relative;
}

.cover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: rgba($color: #000000, $alpha: 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  color: #fff;
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
.cover-image {
  flex: 1;
  height: 150px;
}
.no-border {
  border-width: 0;
}
</style>
