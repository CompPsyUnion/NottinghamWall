<template>
  <div class="settings-page">
    <!-- 个人信息认证标题 -->
    <div class="header">
      <h2>个人信息认证</h2>
    </div>

    <!-- 账号管理 -->
    <div class="section">
      <div class="item">
        <p class="label">手机号</p>
        <div class="right-section">
          <p class="right-text">151****4032</p>
          <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right" @click="goToGetPhone"></uni-icons>
        </div>
      </div>
      <div class="item">
        <p class="label">实名认证</p>
        <div class="right-section">
          <p class="right-text">已认证</p>
          <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
        </div>
      </div>
      <div class="item">
        <p class="label">学校邮箱认证</p>
        <div class="right-section">
          <p class="right-text">scyyw24@nottingham.edu.cn</p>
          <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToGetPhone() {
      uni.navigateTo({
        url: '/pages/person/getPhone'
      });
    }
  }
};
</script>

<style scoped>
.settings-page {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.header h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.section {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  position: relative;
}

.item:last-child {
  border-bottom: none;
}

.label {
  font-size: 14px;
  color: #333;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-text {
  font-size: 14px;
  color: #666;
  margin-right: 10px;
}

.arrow-right {
  position: relative;
}
</style>
