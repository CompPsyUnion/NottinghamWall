<template>
  <view class="container">
    <uni-section title="创建帖子" type="line">
      <textarea class="textarea" placeholder="说你想说的..." v-model="content"></textarea>
      <view class="example-body">
        <uni-file-picker limit="9" title="最多选择9张图片" @select="onFileChange"
                         @delete="onFileDelete"></uni-file-picker>
      </view>
      <view class="options">
        <button class="small-button" type="primary" @click="toggle('bottom')">
          <text class="button-text">选择话题</text>
        </button>
        <button class="small-button" :class="{ 'selected': isSelected }" @click="showConfirm">
          <text class="button-text">分身发帖</text>
        </button>
      </view>
      <view>
        <!-- 普通弹窗 -->
        <uni-popup ref="popup" background-color="#fff" @change="change">
          <view class="popup-content">
            <text class="text">开发中</text>
          </view>
        </uni-popup>
        <!-- 确认框 -->
        <uni-popup ref="confirmPopupWrapper">
          <uni-popup-dialog ref="confirmPopup" type="center" :title="'重要提醒'"
                            :content="'小程序已开启实名记录，请勿发布违规内容。确认分身发帖吗？'"
                            :show-cancel-button="true" @confirm="confirmSelection"
                            @cancel="closeDialog('confirmPopupWrapper')">
          </uni-popup-dialog>
        </uni-popup>
        <!-- 取消确认框 -->
        <uni-popup ref="cancelPopupWrapper">
          <uni-popup-dialog ref="cancelPopup" type="center" :title="'取消确认'" :content="'取消分身发帖吗？'"
                            :show-cancel-button="true" @confirm="confirmCancellation"
                            @cancel="closeDialog('cancelPopupWrapper')">
          </uni-popup-dialog>
        </uni-popup>
      </view>
    </uni-section>
    <view class="footer">
      <button class="publish-button" @click="onSubmit">发布帖子</button>
    </view>
  </view>
</template>

<script>
import {baseUrl} from "@/utils/env";

import uniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
import uniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue';
import uniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue';

export default {
  components: {
    uniSection,
    uniPopup,
    uniPopupDialog,
    uniFilePicker
  },
  data() {
    return {
      isSelected: false,
      content: '',
      imgUrls: []
    };
  },
  methods: {
    change(e) {
      console.log('当前模式：' + e.type + ',状态：' + e.show);
    },
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
    confirmSelection() {
      this.isSelected = true;
      this.$refs.confirmPopupWrapper.close();
    },
    confirmCancellation() {
      this.isSelected = false;
      this.$refs.cancelPopupWrapper.close();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    // 处理文件选择事件
    onFileChange(e) {
      if (e && e.tempFiles) {
        const filePaths = e.tempFiles.map(file => file.path);
        this.uploadToServer(filePaths);
      } else {
        console.log('No images selected');
      }
    },
    uploadFiles(files) {
      const filePaths = files.map(file => file.path);
      this.imgUrls = [];
      this.uploadToServer(filePaths);
    },
    // 上传文件并将返回的URL保存到imgUrls数组
    uploadToServer(filePaths) {
      const uploadPromises = filePaths.map(filePath => this.uploadSingleFile(filePath));
      Promise.all(uploadPromises)
          .then(results => {
            this.imgUrls.push(...results); // 将新上传的图片URL追加到imgUrls中
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
    // 单个文件的上传逻辑
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
                resolve(responseData.data[0]); // 返回上传成功的文件URL
                uni.showToast(
                    {
                      title: '上传成功',
                      icon: 'success',
                      duration: 2000
                    }
                )
              } else {
                reject('上传失败');
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
     * 处理文件删除事件
     * @param e
     */
    onFileDelete(e) {
      const urlToDelete = this.imgUrls[e.index]; // 获取要删除的图片URL

      this.deleteSingleFile(urlToDelete)
          .then(() => {
            this.removeUrlFromArray(urlToDelete);
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
     * @param urlToDelete
     * @returns {Promise<unknown>}
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
          data: JSON.stringify({url: urlToDelete}),
          success: (res) => {
            if (res.data.code === 1) {
              resolve(urlToDelete); // 返回删除成功的文件URL
            } else {
              reject('删除失败');
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },

    /**
     * 从imgUrls数组中移除指定的URL
     * @param urlToDelete
     */
    removeUrlFromArray(urlToDelete) {
      const index = this.imgUrls.indexOf(urlToDelete);
      if (index > -1) {
        this.imgUrls.splice(index, 1); // 从imgUrls数组中移除对应的URL
        console.log('URL removed from imgUrls:', urlToDelete);
        console.log('Current imgUrls:', this.imgUrls);
      } else {
        console.log('URL not found in imgUrls:', urlToDelete);
      }
    },
    onSubmit() {
      if (this.content === '') {
        uni.showToast({
          icon: 'none',
          title: '请输入话题内容'
        });
        return;
      }
      // 发布帖子操作，使用已经上传的图片URL数组
      this.uploadTopic(this.imgUrls);
    },

    /**
     * 上传话题
     * @param imgUrls
     */
    uploadTopic(imgUrls) {
      const data = {
        content: this.content,
        imgURLs: imgUrls,
      };
      console.log('Uploading topic with data:', JSON.stringify(data));
      uni.request({
        url: baseUrl + '/student/post/topic',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          token: uni.getStorageSync('token')
        },
        data: JSON.stringify(data),
        success: (res) => {
          if (res.data.code === 1) {
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
          } else {
            uni.showToast({
              title: '发布失败',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: (err) => {
          this.logError(err);
          uni.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    logError(error) {
      console.error('Error:', error);
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
  margin: 10px 10px; /* 修改为上下边距 */
  width: calc(100% - 20px); /* 确保左右边距相等 */
  box-sizing: border-box; /* 包括内边距和边框 */
}

.example-body {
  padding: 0 10px 10px;
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
  margin-right: 10px; /* 添加右边距 */
}

.small-button.selected {
  background-color: #007bff;
  color: #fff;
}

.footer {
  position: fixed;
  bottom: 0;
  width: calc(100% - 30px); /* 考虑左右边距 */
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
