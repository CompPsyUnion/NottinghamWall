<template>
  <div class="settings-page">
    <!-- 权限管理 -->
    <div class="header">
    <h2>权限管理</h2>
    </div>
    <div class="section">
      <div class="item">
        <p>隐私设置</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="item">
        <p>权限设置</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
    </div>

    <!-- 通用管理 -->
    <div class="header">
      <h2>通用管理</h2>
    </div>
    <div class="section">
      <div class="item">
        <p>地址管理</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="item">
        <p>消息通知</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="item">
        <p>修改学校</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
      <div class="item">
        <p>账号注销</p>
        <uni-icons type="arrow-right" size="16" color="#ccc" class="arrow-right"></uni-icons>
      </div>
    </div>
  </div>
</template>

<script>
import UniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';

export default {
  components: {
    UniIcons
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 18px;
  color: #333;
}

.section {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
}

.section h2 {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
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

.item p {
  font-size: 14px;
  color: #333;
}

.right-text {
  color: #666;
}

.arrow-right {
  position: absolute;
  right: 10px;
}
</style>
