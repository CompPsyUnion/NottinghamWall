<template>
  <div class="common-layout">
    <el-container class="full-screen">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="!isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <div class="logo-container">
          <img v-if="isCollapse" src="../assets/logo/logo.png" alt="Logo" class="logo">
        </div>
        <el-menu-item index="1" @click="navigateTo('/')">
          <el-icon>
            <Location />
          </el-icon>
          <template #title>
            <span>公告栏</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Document />
            </el-icon>
            <span>互动管理</span>
          </template>
          <el-menu-item index="2-1" @click="navigateTo('/manage/topic')">
            <span>话题管理</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span>活动管理</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span>举报管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>人员管理</span>
          </template>
          <el-menu-item index="3-1" @click="navigateTo('/manage/admin')">
            <span>管理员管理</span>
          </el-menu-item>
          <el-menu-item index="3-2" @click="navigateTo('/manage/student')">
            <span>学生管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-container key="container" class="main-container">
        <el-header class="header">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :value="true">
              延展
            </el-radio-button>
            <el-radio-button :value="false">
              收缩
            </el-radio-button>
          </el-radio-group>
          <div class="spacer" />
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="username">{{ username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="changePassword">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-avatar
            src="http://blog.yiming1234.cn/wp-content/uploads/2024/01/Weixin-Image_20231117094822.jpg"
            class="avatar"
          />
        </el-header>
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {
  Document,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {userLogoutService} from '@/api/admin'
import {useAdminStore} from '@/store/admin';

const isCollapse = ref(true)
const username = useAdminStore().admin
const router = useRouter()

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const navigateTo = (path) => {
  router.push(path)
}

const handleCommand = (command) => {
  switch (command) {
    case 'changePassword':
      console.log('修改密码')
      router.push('/manage/password')
      break
    case 'logout':
      userLogoutService().then(() => {
        router.push('/login')
      })
      break
    default:
      break
  }
}

</script>

<style>
.full-screen {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.el-menu-vertical-demo {
  height: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
}

.logo {
  height: 40px;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
  justify-content: space-between;
}

.spacer {
  flex-grow: 1;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.el-dropdown-link:focus {
  outline: none;
}

.username {
  margin-right: 10px;
  font-size: 14px;
  color: #333;
}

.avatar {
  width: 40px;
  height: 40px;
}
</style>
