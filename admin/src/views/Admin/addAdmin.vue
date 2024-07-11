<template>
  <div class="addBrand-container">
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
            <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="ruleForm.idNumber"></el-input>
        </el-form-item>
        <div class="subBox">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button v-if="this.optType === 'add'" type="primary" @click="resetForm">重置</el-button>
          <el-button @click="() => this.$router.push('/admin')">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {addAdmin, getAdminById, updateAdmin} from '@/api/admin'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        username: '',
        sex: '1',
        phone: '',
        idNumber: '',
      },
      rules:{
        name: [
          { required: true, message: '请输入管理员姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: (rule,value,callback) => {
            if (!value) {
              return callback(new Error('请输入手机号'));
            }
            if (value === "" || !/^1[3456789]\d{9}$/.test(value)) {
              return callback(new Error('请输入正确的手机号'));
            }
            callback();
          }}
        ],
        idNumber: [
          { required: true, trigger: 'blur', validator: (rule,value,callback) => {
            if (!value) {
              return callback(new Error('请输入身份证号'));
            }
            if (value === "" || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
              return callback(new Error('请输入正确的身份证号'));
            }
            callback();
          }}
        ]
      }
    }
  },
  // 修改时回显管理员信息
  created(){
    this.optType = this.$route.query.id ? 'update' : 'add'
    if (this.optType === 'update') {
      //alert(this.$route.query.id)
      getAdminById(this.$route.query.id).then(res => {
        if(res.data.code === 1){
          this.ruleForm = res.data.data
        }
      })
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      this.ruleForm ={
        name: '',
        username: '',
        sex: '1',
        phone: '',
        idNumber: '',
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.optType === 'add'){
            // 添加管理员
            addAdmin(this.ruleForm).then(res => {
              if(res.data.code === 1){
                this.$message.success('添加成功')
                this.$router.push('/admin')
              }else{
                this.$message.error('添加失败')
              }
            })
            }
          }else{
            // 修改管理员
            updateAdmin(this.ruleForm).then(res => {
              if(res.data.code === 1){
                this.$message.success('修改成功')
                this.$router.push('/admin')
              }else{
                this.$message.error('修改失败')
              }
            })
          }
        })
      }
    },
}
</script>

<style lang="scss" scoped>
.addBrand {
  &-container {
    margin: 30px;
    margin-top: 30px;
    .HeadLable {
      background-color: transparent;
      margin-bottom: 0px;
      padding-left: 0px;
    }
    .container {
      position: relative;
      z-index: 1;
      background: #fff;
      padding: 30px;
      border-radius: 4px;
      // min-height: 500px;
      .subBox {
        padding-top: 30px;
        text-align: center;
        border-top: solid 1px $gray-5;
      }
    }
    .idNumber {
      margin-bottom: 39px;
    }

    .el-form-item {
      margin-bottom: 29px;
    }
    .el-input {
      width: 293px;
    }
  }
}
</style>
