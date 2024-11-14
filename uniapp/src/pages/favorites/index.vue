<template>
  <uni-section title="我的收藏" type="line">
    <TopicComponent :records="records" :loadMoreStatus="loadMoreStatus"/>
  </uni-section>
</template>

<script>
import uniNoticeBar from '@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue';
import uniSection from "@dcloudio/uni-ui/lib/uni-section/uni-section.vue";
import TopicComponent from './components/topic.vue';
import { fetchCollectedTopics} from "@/api/collect";

export default {
  components: {
    uniSection,
    TopicComponent,
    uniNoticeBar
  },
  data() {
    return {
      page: 1,
      records: [],
      loadMoreStatus: 'more',
      total: 0,
      shareTopicId: null,
      shareImageUrl: '',
    };
  },
  onLoad() {
    this.getRecords();
  },
  onReachBottom() {
    this.getRecords();
  },
  methods: {
    /**
     * 获取话题列表
     */
    async getRecords() {
      if (this.loadMoreStatus === 'loading' || this.loadMoreStatus === 'noMore') {
        return;
      }
      this.loadMoreStatus = 'loading';
      try {
        const data = await fetchCollectedTopics(this.page, 5);
        console.log('请求结果:', data);

        let newRecords = data.records;
        newRecords = newRecords.filter(record => !record.isDraft);

        if (newRecords.length === 0) {
          this.loadMoreStatus = 'noMore';
        } else {
          this.records = this.records.concat(newRecords);
          if (newRecords.length < 5) {
            this.loadMoreStatus = 'noMore';
          } else {
            this.loadMoreStatus = 'more';
            this.page++;
          }
        }
      } catch (error) {
        console.error('请求失败', error);
        this.loadMoreStatus = 'more';
        uni.showToast({ title: '加载失败', icon: 'none' });
      }
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  background-color: #ffffff;
}

.textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin: 10px 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
}

.image-count {
  padding: 0 10px;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 10px;
}

.image-item {
  position: relative;
  width: calc(30% - 10px);
  padding-top: calc(30% - 10px);
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.preview-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: calc(30% - 10px);
  padding-top: calc(30% - 10px);
  background-color: #f5f5f5;
  border-radius: 5px;
  border: 1px dashed #ccc;
}

.add-icon {
  position: absolute;
  font-size: 36px;
  color: #aaa;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.options {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
}

.small-button {
  background-color: #f5f5f5;
  color: #333;
  width: auto;
  padding: 5px 10px;
  border-radius: 14px;
  font-size: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.small-button.selected {
  background-color: #007bff;
  color: #fff;
}

.footer {
  position: fixed;
  bottom: 0;
  width: calc(100% - 30px);
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
}

.publish-button {
  background-color: #000;
  color: #fff;
  padding: 0 20px;
  border-radius: 30px;
  font-size: 18px;
  width: 90%;
  height: 40px;
  text-align: center;
}
</style>