<template>
  <div class="dashboard-container">
    <commentList />
    <likeList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import commentList from '@/views/Comments/components/commentList.vue'
import likeList from '@/views/Comments/components/likeList.vue'

@Component({
  name: 'Comments',
  components: {
    commentList,
    likeList,
  },
})
export default class Comments extends Vue {}
</script>

<style scoped lang="scss">

</style>
