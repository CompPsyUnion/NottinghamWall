<template>
  <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
           :direction="direction" @trigger="trigger"/>
</template>

<script>
import uniFab from '@dcloudio/uni-ui/lib/uni-fab/uni-fab.vue';

export default {
  components: {
    uniFab
  },
  data() {
    return {
      title: 'uni-fab',
      directionStr: '垂直',
      horizontal: 'right',
      vertical: 'bottom',
      direction: 'horizontal',
      pattern: {
        color: '#7A7E83',
        backgroundColor: '#fff',
        selectedColor: '#007AFF',
        buttonColor: '#007AFF',
        iconColor: '#fff'
      },
      is_color_type: false,
      content: [
        {
          iconPath: '/static/icon/topic.png',
          selectedIconPath: '/static/icon/topic-active.png',
          text: '发布话题',
          active: false
        },
        {
          iconPath: '/static/icon/star.png',
          selectedIconPath: '/static/icon/star-active.png',
          text: '我的收藏',
          active: false
        }
      ]
    }
  },
  methods: {
    trigger(e) {
      console.log(e)
      this.content[e.index].active = !e.item.active
      if (e.item.text === '发布话题') {
        this.navigateToTopicPage();
      } else if (e.item.text === '我的收藏') {
        this.navigateToFavoritesPage();
      }
    },
    navigateToTopicPage() {
      uni.navigateTo({
        url: '/pages/topic/create'
      });
    },
    navigateToFavoritesPage() {
      uni.navigateTo({
        url: '/pages/favorites/index'
      });
    }
  }
}
</script>

<style lang="scss">
.warp {
  padding: 10px;
}

.button {
  margin-bottom: 10px;
}
</style>
