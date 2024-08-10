<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/store/token'
import { useAdminStore } from '@/store/admin'
import { userLoginService } from '@/api/admin';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const token = useTokenStore()
const admin = useAdminStore()
const router = useRouter()
//定义默认登录数据
const LoginData = ref({
  username: 'Pleasure1234',
  password: '123456',
})
//定义表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为 5 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为 5 到 16 个字符', trigger: 'blur' }
  ],
}
//登录函数
const login = async () => {
  try {
    const result = await userLoginService({
      username: LoginData.value.username,
      password: LoginData.value.password
    });
    console.log('Login service result:', result); // 添加日志
    if (result.code === 1) {
      ElMessage.success(result.msg ? result.msg : '登录成功');
      token.setToken(result.data.token);
      admin.setAdmin(result.data.userName);
      await router.push('/');
    } else {
      // 登录失败
      ElMessage.error(result.msg ? result.msg : '登录失败');
    }
  } catch (error) {
    // 处理请求失败
    if (error.response && error.response.data && error.response.data.msg) {
      // 后端返回的具体错误消息
      ElMessage.error(error.response.data.msg);
    } else {
      // 通用错误消息
      ElMessage.error('登录请求失败');
    }
    console.error('Login request failed', error); // 添加日志
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg" />
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" :model="LoginData" :rules="rules">
        <el-form-item class="logo-container">
          <img src="../assets/logo/icon_logo.png" alt="Logo" class="logo">
        </el-form-item>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="LoginData.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="LoginData.password" name="password" :prefix-icon="Lock" type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住密码</el-checkbox>
            <el-link type="primary" :underline="false">
              忘记密码？
            </el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .logo-container {
    text-align: center;
    margin-bottom: 20px;
  }

  .logo {
    width: 100%; /* 设置宽度为100% */
    height: auto; /* 保持宽高比 */
  }

  .bg {
    background:
        url('@/assets/logo/login_bg.png') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
