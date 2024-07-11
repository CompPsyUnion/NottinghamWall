<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right:5px">管理员姓名：</label>
        <el-input v-model="name" placeholder="请输入管理员姓名" style="width:15%" />
        <el-button type="primary" style="margin-left:25px" @click="pageQuery()">查询</el-button>
        <el-button type="primary" style="float: right" @click="handleAddAdmin">添加管理员</el-button>
      </div>
      <el-table
        :data="records"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="管理员姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="status"
          label="账号状态">
          <template slot-scope="scope">
            {{scope.row.status === 0 ? '禁用' : '启用'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后操作时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleUpdateAdmin(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleStartOrStop(scope.row)">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageList"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import {getAdminList, startOrStopAdmin} from '@/api/admin'

export default  {
  data() {
    return {
      name: '',
      page: 1,
      pageSize: 5,
      total: 0,
      records:[]
    }
  },
  created() {
    this.pageQuery()
  },
  methods: {
  //分页查询
  pageQuery() {
      const params = {
        name: this.name,
        page: this.page,
        pageSize: this.pageSize
      }
      //发送ajax请求访问后端数据
      getAdminList(params).then(res => {
        //console.log(res)
        if(res.data.code === 1) {
          this.records = res.data.data.records
          this.total = res.data.data.total
        }
      }).catch(err => {
        this.$message.error('请求失败:'+err.message)
      })
    },
  //pageSize改变
  handleSizeChange(pageSize) {
    this.pageSize = pageSize
    this.pageQuery()
  },
  //page改变
  handleCurrentChange(page) {
      this.page = page
      this.pageQuery()
  },
    //启用或禁用
    handleStartOrStop(row) {
      if(row.username === 'Pleasure1234'){
        this.$message.error('超级管理员不允许操作！')
        return
      }
      //弹出提示框
      this.$confirm('是否修改该管理员的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const q = {
          id: row.id,
          status: row.status === 1 ? 0 : 1
        }
        //发送ajax请求访问后端数据
        startOrStopAdmin(q).then(res => {
          if(res.data.code === 200) {
            this.$message.success('账号状态修改成功！')
            this.pageQuery()
          }
        }).catch(err => {
          this.$message.error('请求失败:'+err.message)
        })
      })
    },
    //新增管理员
    handleAddAdmin() {
      this.$router.push('/manage/add')
    },
    //修改管理员
    handleUpdateAdmin(row) {
    if(row.username === 'Pleasure1234'){
        this.$message.error('超级管理员不允许操作！')
        return
    }
      this.$router.push({
        path: '/manage/add',
        query: {id: row.id}
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
