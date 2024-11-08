<template>
  <view class="container">
    <!-- 投诉类型选择 -->
    <view class="section">
      <text class="section-title">请选择投诉类型</text>
      <view class="options">
        <view
            class="option"
            v-for="(item, index) in complaintTypes"
            :key="index"
            :class="{'selected': selectedTypes.includes(index)}"
            @click="selectType(index)"
        >
          <text>{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 详细原因 -->
    <view class="section">
      <text class="section-title">详细原因</text>
      <textarea placeholder="提供更多信息有助于快速处理哦~" v-model="detailReason"></textarea>
    </view>

    <!-- 提交按钮 -->
    <button class="submit-btn" @click="submitComplaint">提交</button>
  </view>
</template>

<script>
import {baseUrl} from "@/utils/env";
import {getCurrentUserInfo} from "@/api/user";

export default {
  data() {
    return {
      topicId: '',
      commentId: '',
      userId: '',
      complaintTypes: [
        "涉黄信息", "有害信息", "网络暴力", "人身攻击", "违法信息", "饭圈违规",
        "不实信息", "违规营销", "侵犯个人权益", "不良价值导向", "涉未成年人", "诈骗信息", "涉企侵权"
      ],
      selectedTypes: [],
      detailReason: ''
    };
  },
  async onLoad(options) {
    const currentUser =  await getCurrentUserInfo();
    this.userId = currentUser.userId;
    console.log(this.userId);
    this.topicId = options.topicId;
    this.commentId = options.topicId;
  },
  methods: {
    selectType(index) {
      if (this.selectedTypes.includes(index)) {
        this.selectedTypes = this.selectedTypes.filter(i => i !== index);
      } else if (this.selectedTypes.length < 3) {
        this.selectedTypes.push(index);
      } else {
        uni.showToast({ title: "最多选择3个投诉类型", icon: "none" });
      }
    },
    async submitComplaint() {
      if (this.selectedTypes.length === 0) {
        uni.showToast({ title: "请选择投诉类型", icon: "none" });
        return;
      }
      if (!this.detailReason) {
        uni.showToast({ title: "请填写详细原因", icon: "none" });
        return;
      }
      const reportData = {
        topicId: this.topicId,
        commentId: this.commentId,
        userId: this.userId,
        tags: this.selectedTypes.map(index => this.complaintTypes[index]).join(','),
        detailedDescription: this.detailReason
      };
      console.log(reportData);
      try {
        await uni.request({
          url: `${baseUrl}/student/report/insert`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'token': uni.getStorageSync('token'),
          },
          data: reportData,
          success: (res) => {
            if (res.data === "举报成功") {
              uni.showToast({ title: res.data, icon: "success" });
              setTimeout(() => {
                uni.navigateBack();
              }, 1000);
            } else {
              uni.showToast({ title: `举报失败: ${res.data}`, icon: "none" });
              setTimeout(() => {
                uni.navigateBack();
              }, 1000);
            }
          },
          fail: (err) => {
            console.error("检查评论点赞状态失败:", err);
            uni.showToast({ title: "投诉提交失败", icon: "none" });
          },
        });
      } catch (error) {
        uni.showToast({ title: error.response?.data || "投诉提交失败", icon: "none" });
      }
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.header text {
  font-size: 24px;
}

.section {
  margin-top: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.options {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-between;
}
.option {
  background-color: #f5f5f5;
  padding: 8px 10px;
  border-radius: 5px;
  text-align: center;
  width: 26%;
  font-size: 12px;
}
.selected {
  background-color: #333;
  color: #fff;
}

textarea {
  width: 95%;
  height: 80px;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.submit-btn {
  margin-top: 20px;
  width: 80%;
  height: 45px;
  background-color: #000;
  color: #fff;
  border-radius: 25px;
  text-align: center;
}
</style>
