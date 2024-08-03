<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
//绑定数据，复用注册表单的数据模型
//表单数据校验
//登录函数
import {userLoginService} from '@/api/admin';
import { useTokenStore } from '@/store/token'
import { useRouter } from 'vue-router'
//定义注册模型
const LoginData = ref({
  username: '',
  password: '',
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
const tokenStore = useTokenStore()
const router = useRouter()
const login = async () => {
  //调用接口完成登录
  const result = await userLoginService(LoginData.value);
  /*if (result.code === 0) {
      alert(result.msg ? result.msg : '登录成功');
  } else {
      alert(result.msg ? result.msg : '登录失败');
  }*/
  //alert(result.msg ? result.msg : '登录成功');
  ElMessage.success(result.msg ? result.msg : '登录成功');
  //把得到的token储存到pinia中
  tokenStore.setToken(result.data)
  localStorage.setItem('token',result.data)
  //跳转到首页，借助路由完成跳转
  await router.push('/')

}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg" />
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" :model="LoginData" :rules="rules">
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

  .bg {
    background:
        url('@/assets/login_bg.png') no-repeat center / cover;
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
