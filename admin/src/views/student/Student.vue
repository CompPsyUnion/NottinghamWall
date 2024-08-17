<template>
  <div class="content-wrapper">
    <div class="dashboard-container">
      <div class="container">
        <div class="tableBar">
          <label style="margin-right:5px">学生姓名：</label>
          <el-input v-model="username" placeholder="请输入学生昵称" style="width:15%" />
          <el-button type="primary" style="margin-left:25px" @click="pageQuery">
            查询
          </el-button>
        </div>
        <!-- 使用 v-if 来条件渲染 table 或 el-empty -->
        <el-table v-if="records.length > 0" :data="records" stripe style="width: 100%">
          <!-- 显示头像 -->
          <el-table-column label="头像" width="180">
            <template #default="scope">
              <img :src="scope.row.avatar" alt="头像" style="width: 50px; height: 50px; border-radius: 50%">
            </template>
          </el-table-column>
          <el-table-column prop="username" label="昵称" width="180" />
          <!-- 显示性别 -->
          <el-table-column label="性别">
            <template #default="scope">
              {{ Number(scope.row.sex) ===1 ? '男':'女' }}
            </template>
          </el-table-column>
          <el-table-column prop="studentid" label="学生号" />
          <el-table-column prop="email" label="教育邮箱" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="updateTime" label="最后更新时间" />
        </el-table>
        <!-- 当 records 为空时显示 el-empty 组件 -->
        <el-empty v-else description="暂无数据" />

        <el-pagination
          v-if="records.length > 0"
          class="pageList"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getStudentList } from '@/api/student';

// 定义响应式变量
const username = ref('');
const page = ref(1);
const pageSize = ref(5);
const total = ref(0);
const records = ref([]);
// 分页查询函数
const pageQuery = async () => {
  const params = {
    username: username.value,
    page: page.value,
    pageSize: pageSize.value
  };
  try {
    const res = await getStudentList(params);
    if (res.code === 1) {
      records.value = res.data.records.sort((a, b) => {
        return a.id - b.id;
      });
      total.value = res.data.total; // 处理 total
    } else {
      ElMessage.error('获取学生列表失败');
    }
  } catch (err) {
    ElMessage.error('请求失败: ' + err.message);
  }
};

// 处理 pageSize 改变
const handleSizeChange = async (newSize) => {
  pageSize.value = newSize;
  await pageQuery();
};

// 处理 page 改变
const handleCurrentChange = async (newPage) => {
  page.value = newPage;
  await pageQuery();
};

// 在组件挂载时进行数据查询
onMounted(() => {
  pageQuery();
});
</script>

<style scoped>
.content-wrapper {
  background-color: #f0f0f0; /* 打底框颜色 */
  padding: 20px;
  border-radius: 8px;
}

.tableBar {
  margin-bottom: 20px; /* Add spacing below the tableBar */
}

.el-table {
  margin-bottom: 20px; /* Add spacing below the table */
}

.pageList {
  margin-top: 20px; /* Add spacing above the pagination */
}
</style>
