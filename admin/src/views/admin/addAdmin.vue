<template>
  <div class="content-wrapper">
    <div class="addBrand-container">
      <div class="container">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="180px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="管理员姓名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="ruleForm.sex" label="1">
              男
            </el-radio>
            <el-radio v-model="ruleForm.sex" label="2">
              女
            </el-radio>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="ruleForm.idNumber" />
          </el-form-item>
          <div class="subBox">
            <el-button type="primary" @click="submitForm">
              保存
            </el-button>
            <el-button v-if="optType === 'add'" type="primary" @click="resetForm">
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
import {ref, reactive, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {addAdmin, getAdminById, updateAdmin} from '@/api/admin';

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref(null);

const ruleForm = reactive({
  name: '',
  username: '',
  sex: '1',
  phone: '',
  idNumber: '',
});

const optType = ref(route.query.id ? 'update' : 'add');

const rules = reactive({
  name: [{required: true, message: '请输入管理员姓名', trigger: 'blur'}],
  username: [{required: true, message: '请输入编号', trigger: 'blur'}],
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号'));
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      },
    },
  ],
  idNumber: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入身份证号'));
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          callback(new Error('请输入正确的身份证号'));
        } else {
          callback();
        }
      },
    },
  ],
});

onMounted(() => {
  if (optType.value === 'update') {
    getAdminById(route.query.id).then((res) => {
      if (res.code === 1) {
        ruleForm.name = res.data.name;
        ruleForm.username = res.data.username;
        ruleForm.sex = res.data.sex;
        ruleForm.phone = res.data.phone;
        ruleForm.idNumber = res.data.idNumber;
      }
    });
  }
});

const resetForm = () => {
  ruleForm.name = '';
  ruleForm.username = '';
  ruleForm.sex = '1';
  ruleForm.phone = '';
  ruleForm.idNumber = '';
};

const submitForm = () => {
  if (!ruleFormRef.value) {
    console.error('Form reference is null');
    return;
  }
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (optType.value === 'add') {
        addAdmin(ruleForm).then((res) => {
          if (res.code === 1) {
            router.push('/manage/admin');
          }
        });
      } else {
        updateAdmin(ruleForm).then((res) => {
          if (res.code === 1) {
            router.push('/manage/admin');
          }
        });
      }
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
