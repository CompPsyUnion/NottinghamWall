<script setup>
import {
  House,
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

</script>

<template>
  <el-container class="layout-container">
    <el-header>
      <div><strong>Yiming</strong>的文档管理系统</div>
      <el-dropdown placement="bottom-end">
        <span class="el-dropdown__box">
          <el-avatar :src="avatar" />
          <el-icon>
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile" :icon="User">
              基本资料
            </el-dropdown-item>
            <el-dropdown-item command="avatar" :icon="Crop">
              更换头像
            </el-dropdown-item>
            <el-dropdown-item command="password" :icon="EditPen">
              重置密码
            </el-dropdown-item>
            <el-dropdown-item command="logout" :icon="SwitchButton">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-container>
        <el-aside width="200px">
          <div class="el-aside__logo" />
          <el-menu active-text-color="#ffd04b" background-color="#f1f1f1" text-color="#999" router>
            <el-menu-item index="/user/front">
              <el-icon>
                <House />
              </el-icon>
              <span>首页公告</span>
            </el-menu-item>
            <el-menu-item index="/article/category">
              <el-icon>
                <Management />
              </el-icon>
              <span>文章分类</span>
            </el-menu-item>
            <el-menu-item index="/article/manage">
              <el-icon>
                <Promotion />
              </el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-sub-menu>
              <template #title>
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>个人中心</span>
              </template>
              <el-menu-item index="/user/info">
                <el-icon>
                  <User />
                </el-icon>
                <span>基本资料</span>
              </el-menu-item>
              <el-menu-item>
                <el-icon>
                  <Crop />
                </el-icon>
                <span>更换头像</span>
              </el-menu-item>
              <el-menu-item>
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>重置密码</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>Yiming的文档管理系统@版权归yiming所有</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #f1f1f1;

    &__logo {
      height: 120px;
      background: url('') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #dddddd;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
