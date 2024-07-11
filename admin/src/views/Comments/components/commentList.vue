<template>
  <div class="dashboard-container">
    <div class="container">
      <h2>
        评论管理
      </h2>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column
          type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="话题标题">
                <span>{{ props.row.topic }}</span>
              </el-form-item>
              <el-form-item label="话题内容">
                <span>{{ props.row.topicText }}</span>
              </el-form-item>
              <el-form-item label="发布者学号">
                <span>{{ props.row.studentId }}</span>
              </el-form-item>
              <el-form-item label="发布者">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
              <el-form-item label="话题图片">
                <img :src="props.row.topicPicture" />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="Date"
          prop="updateTime"
          sortable>
        </el-table-column>
        <el-table-column
          label="Name"
          prop="username"
          sortable>
        </el-table-column>
        <el-table-column
          label="Topic"
          prop="topic">
        </el-table-column>
        <el-table-column
          label="Comment"
          prop="commentText">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        topic:'校园墙建立了！',
        topicText:'校园墙建立了！',
        commentText:'校园墙建立了！',
        studentId:'20616304',
        username:'Pleasure1234',
        updateTime:'2024-06-23',
        topicPicture:'https://private-user-images.githubusercontent.com/144885467/341983961-f517638c-73be-4477-a4b0-ddb7c6c926b7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTkzODk4MDYsIm5iZiI6MTcxOTM4OTUwNiwicGF0aCI6Ii8xNDQ4ODU0NjcvMzQxOTgzOTYxLWY1MTc2MzhjLTczYmUtNDQ3Ny1hNGIwLWRkYjdjNmM5MjZiNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNjI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDYyNlQwODExNDZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hYjRmYWFiYjg0MzdlNjY0NzZmYjNiYWVhZWJhNTA4Mjg2ODRhZTgwZDQxNDEwNzU0Y2Y4NTI4N2I1MWYyOGY4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.AKHk_0D9ktt3axhkkw22khDlTY3ifixuWslsu3JsHLk',
      }, {
        topic:'校园墙建立了！',
        topicText:'校园墙建立了！',
        commentText:'校园墙建立了！',
        studentId:'20616304',
        username:'Pleasure1234',
        updateTime:'2024-06-24'
      }, {
        topic:'校园墙建立了！',
        topicText:'校园墙建立了！',
        commentText:'校园墙建立了！',
        studentId:'20616304',
        username:'Pleasure1234',
        updateTime:'2024-06-25'
      }, {
        topic:'校园墙建立了！',
        topicText:'校园墙建立了！',
        commentText:'校园墙建立了！',
        studentId:'20616304',
        username:'Pleasure1234',
        updateTime:'2024-06-26'
      }],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
}
</script>

<style  lang="scss" scoped >
.dashboard-container.home{
  margin-bottom: 0;
}
.disabled-text {
  color: #bac0cd !important;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
img {
  width: 100%;
  height: auto;
}
</style>

<style lang="scss">

</style>
