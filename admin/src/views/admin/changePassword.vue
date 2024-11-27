<template>
  <div class="content-wrapper">
    <div class="addBrand-container">
      <div class="container">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="180px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input type="password" v-model="ruleForm.confirmPassword" />
          </el-form-item>
          <div class="subBox">
            <el-button type="primary" @click="submitForm">
              保存
            </el-button>
            <el-button @click="resetForm">
              重置
            </el-button>
            <el-button @click="() => $router.push('/manage/admin')">
              返回
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {changePassword} from '@/api/admin';

const router = useRouter();
const ruleFormRef = ref(null);

const ruleForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const rules = reactive({
  oldPassword: [{
    required: true,
    message: '请输入旧密码',
    trigger: 'blur'
  }],
  newPassword: [{
    required: true,
    message: '请输入新密码',
    trigger: 'blur'
  }],
  confirmPassword: [
    {
      required: true,
      message: '请确认新密码',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.newPassword) {
          callback(new Error('两次输入的新密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
});

const resetForm = () => {
  ruleForm.oldPassword = '';
  ruleForm.newPassword = '';
  ruleForm.confirmPassword = '';
};

const submitForm = () => {
  if (!ruleFormRef.value) {
    console.error('Form reference is null');
    return;
  }
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      changePassword(ruleForm).then((res) => {
        if (res.code === 1) {
          router.push('/manage/admin');
        }
      }).catch(error => {
        console.error('Change password failed', error);
      });
    } else {
      console.error('Form validation failed');
      return false;
    }
  });
};
</script>

<style scoped>
.addBrand-container {
  margin: 30px;
  margin-top: 30px;
}

.container {
  position: relative;
  z-index: 1;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
}

.subBox {
  padding-top: 30px;
  text-align: center;
}

.content-wrapper {
  background-color: #f0f0f0; /* 打底框颜色 */
  padding: 20px;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 29px;
}

.el-input {
  width: 293px;
}
</style>
