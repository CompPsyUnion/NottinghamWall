<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right:5px">学生姓名：</label>
        <el-input v-model="name" placeholder="请输入学生姓名" style="width:15%" />
        <el-button type="primary" style="margin-left:25px" @click="pageQuery()">查询</el-button>
      </div>
      <el-table
        :data="records"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="studentid"
          label="学号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后操作时间">
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageList"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import {getUserList} from '@/api/user'
export default  {
  data() {
    return {
      name: '',
      page: 1,
      pageSize: 10,
      total: 0,
      records:[]
    }
  },
  created() {
    this.pageQuery()
  },
  methods: {
    pageQuery() {
      const params = {
        name: this.name,
        page: this.page,
        pageSize: this.pageSize
      }
      //发送ajax请求访问后端数据
      getUserList(params).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
