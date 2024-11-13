<template>
  <view class="container">
    <uni-section title="创建帖子" type="line">
      <textarea class="textarea" placeholder="说你想说的..." v-model="content"></textarea>

      <!-- 图片选择计数显示 -->
      <view class="image-count">
        <text>已选择: {{ imgUrls.length }}/9</text>
      </view>

      <!-- 照片墙 -->
      <view class="image-grid">
        <!-- 照片墙中的图片 -->
        <view class="image-item" v-for="(img, index) in imgUrls" :key="index">
          <image :src="img" mode="aspectFill" class="preview-image" @click="previewImage(index)"></image>
          <button class="delete-button" @click="deleteImage(index)">×</button>
        </view>

        <!-- 添加图片按钮 -->
        <view class="image-item add-button" v-if="imgUrls.length < 9" @click="chooseImages">
          <text class="add-icon">+</text>
        </view>
      </view>

      <view class="options">
        <button class="small-button" type="primary">
          <text class="button-text">选择话题</text>
        </button>
        <button class="small-button">
          <text class="button-text">分身发帖</text>
        </button>
      </view>
    </uni-section>

    <view class="footer">
      <button class="publish-button" @click="onSubmit">发布帖子</button>
    </view>
  </view>
</template>

<script>
import { toRaw } from 'vue';
import {
  uploadSingleFile,
  deleteSingleFile,
  uploadTopic,
  getDraft,
  saveDraft,
  checkDraftExistence,
} from '@/api/topic';
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue';
import View from '@/pages/topic/create.vue';

export default {
  components: {
    View,
    uniSection
  },
  data() {
    return {
      id: null,
      content: '',
      imgUrls: [],
      submitted: false,
      isDraft: false
    };
  },
  mounted() {
    this.checkDraft();
  },
  beforeUnmount() {
    this.saveDraft();
  },
  methods: {

    /**
     * 检查是否存在草稿，并直接加载草稿内容
     */
    checkDraft() {
      checkDraftExistence()
          .then(response => {
            if (response) {
              this.loadDraft();
            }
          })
          .catch(error => {
            console.error('检查草稿失败:', error);
          });
    },

    /**
     * 加载草稿
     */
    loadDraft() {
      getDraft()
          .then(response => {
            const draft = response;
            console.log('加载草稿:', draft);
            if (draft) {
              this.id = draft.id || null;
              this.content = draft.content || '';
              this.imgUrls = draft.imgURLs || [];
              this.isDraft = true;
            }
          })
          .catch(error => {
            console.error('加载草稿失败:', error);
          });
    },

    /**
     * 保存草稿
     */
    saveDraft() {
      if (this.submitted) {
        return;
      }
      if (this.content.trim() !== '' || this.imgUrls.length > 0) {
        console.log('保存草稿:', this.id);
        const draftData = {
          id: this.id,
          content: this.content,
          imgURLs: toRaw(this.imgUrls),
          isDraft: 1
        };
        saveDraft(draftData);
      }
    },

    /**
     * 提交帖子
     */
    onSubmit() {
      if (this.content.trim() === '') {
        uni.showToast({
          icon: 'none',
          title: '请输入话题内容',
          duration: 2000
        });
        return;
      }
      this.uploadTopic();
      console.log('提交帖子:', this.content, toRaw(this.imgUrls));
    },

    /**
     * 上传帖子
     */
    uploadTopic() {
      const data = {
        content: this.content,
        imgURLs: toRaw(this.imgUrls),
        isDraft: false
      };

      uploadTopic(data)
          .then(() => {
            this.submitted = true;
            uni.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
              complete: () => {
                setTimeout(() => {
                  uni.reLaunch({
                    url: '/pages/index/index'
                  });
                }, 1000);
              }
            });
          })
          .catch((err) => {
            console.error('发布失败:', err);
            uni.showToast({
              title: '发布失败，请检查网络',
              icon: 'none',
              duration: 2000
            });
          });
    },

    /**
     * 选择图片
     */
    chooseImages() {
      const maxSelect = 9 - this.imgUrls.length;
      if (maxSelect <= 0) {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      uni.chooseImage({
        count: maxSelect,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          const tempFiles = res.tempFilePaths;
          this.uploadToServer(tempFiles);
        },
        fail: err => {
          console.error('选择图片失败:', err);
        }
      });
    },

    /**
     * 上传图片到服务器
     */
    uploadToServer(filePaths) {
      const uploadPromises = filePaths.map(filePath => uploadSingleFile(filePath));
      Promise.all(uploadPromises)
          .then(results => {
            this.imgUrls.push(...results);
            console.log('所有图片上传成功:', this.imgUrls);
            uni.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            });
          })
          .catch(error => {
            console.error('图片上传失败:', error);
            uni.showToast({
              title: '上传失败,请分开上传或重新选择图片',
              icon: 'none',
              duration: 2000
            });
          });
    },

    /**
     * 删除图片
     */
    deleteImage(index) {
      const urlToDelete = this.imgUrls[index];
      deleteSingleFile(urlToDelete)
          .then(() => {
            this.imgUrls.splice(index, 1);
            console.log('图片删除成功，当前图片列表:', this.imgUrls);
          })
          .catch(error => {
            console.error('删除文件失败:', error);
            uni.showToast({
              title: '删除失败',
              icon: 'none',
              duration: 2000
            });
          });
    },

    /**
     * 预览图片
     */
    previewImage(index) {
      uni.previewImage({
        current: this.imgUrls[index],
        urls: this.imgUrls
      });
    }
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

/* 照片墙样式 */
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

/* 添加图片按钮样式 */
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
