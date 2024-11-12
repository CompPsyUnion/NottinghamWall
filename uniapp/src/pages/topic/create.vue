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
        <button class="small-button" type="primary" @click="toggle('bottom')">
          <text class="button-text">选择话题</text>
        </button>
        <button class="small-button" :class="{ 'selected': isSelected }" @click="showConfirm">
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
import { baseUrl } from "@/utils/env";
import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue';

export default {
  components: {
    uniSection
  },
  data() {
    return {
      isSelected: false,
      content: '',
      imgUrls: []
    };
  },
  methods: {
    toggle(type) {
      this.type = type;
      this.$refs.popup.open(type);
    },
    showConfirm() {
      if (this.isSelected) {
        this.$refs.cancelPopupWrapper.open();
      } else {
        this.$refs.confirmPopupWrapper.open();
      }
    },
    onSubmit() {
      if (this.content.trim() === '') {
        uni.showToast({
          icon: 'none',
          title: '请输入话题内容'
        });
        return;
      }
      // 上传帖子
      this.uploadTopic(this.imgUrls);
    },

    /**
     * 选择图片并上传
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
     * 上传文件到服务器
     * @param {Array} filePaths
     */
    uploadToServer(filePaths) {
      const uploadPromises = filePaths.map(filePath => this.uploadSingleFile(filePath));
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
     * 上传单个文件
     * @param {String} filePath
     * @returns {Promise<String>} 服务器返回的图片URL
     */
    uploadSingleFile(filePath) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: baseUrl + '/student/common/upload',
          filePath: filePath,
          name: 'files',
          header: {
            token: uni.getStorageSync('token')
          },
          success: (res) => {
            try {
              const responseData = JSON.parse(res.data);
              if (responseData.code === 1) {
                resolve(responseData.data[0]);
              } else {
                reject('上传失败: ' + responseData.message);
              }
            } catch (e) {
              reject('解析失败');
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },

    /**
     * 删除图片并从服务器中删除
     * @param {Number} index
     */
    deleteImage(index) {
      const urlToDelete = this.imgUrls[index];
      this.deleteSingleFile(urlToDelete)
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
     * 删除单个文件
     * @param {String} urlToDelete
     * @returns {Promise<String>}
     */
    deleteSingleFile(urlToDelete) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: baseUrl + '/student/common/delete',
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            token: uni.getStorageSync('token')
          },
          data: JSON.stringify({ url: urlToDelete }),
          success: (res) => {
            if (res.data.code === 1) {
              resolve(urlToDelete);
            } else {
              reject('删除失败: ' + res.data.message);
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },

    /**
     * 预览图片
     * @param {Number} index
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
