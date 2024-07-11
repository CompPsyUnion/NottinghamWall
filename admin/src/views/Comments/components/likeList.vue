<template>
  <div class="dashboard-container">
    <div class="container">
      <h2>
        点赞实时信息
      </h2>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column
          label="Date"
          prop="date"
          sortable>
        </el-table-column>
        <el-table-column
          label="Name"
          prop="name"
          sortable>
        </el-table-column>
        <el-table-column
          label="Topic"
          prop="topic">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        topic: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        topic: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        topic: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        topic: '上海市普陀区金沙江路 1516 弄'
      }],
      search: ''
    }
  },
}
</script>

<style scoped lang="scss">

</style>
