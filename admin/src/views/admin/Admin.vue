<template>
  <div class="content-wrapper">
    <div class="dashboard-container">
      <div class="container">
        <div class="tableBar">
          <label style="margin-right:5px">管理员姓名：</label>
          <el-input v-model="name" placeholder="请输入管理员姓名" style="width:15%" />
          <el-button type="primary" style="margin-left:25px" @click="pageQuery">
            查询
          </el-button>
          <el-button type="primary" style="float: right" @click="handleAddAdmin">
            添加管理员
          </el-button>
        </div>
        <!-- 使用 v-if 来条件渲染 table 或 el-empty -->
        <el-table v-if="records.length > 0" :data="records" stripe style="width: 100%">
          <el-table-column prop="name" label="管理员姓名" width="180" />
          <el-table-column prop="username" label="帐号" width="180" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="status" label="账号状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-text="点击禁用"
                inactive-text="点击启用"
                :disabled="scope.row.username === 'Pleasure1234' || scope.row.username === currentAdmin"
                @change="handleStatusChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最后操作时间" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="primary" size="small"
                :disabled="scope.row.username === 'Pleasure1234' || scope.row.username !== currentAdmin"
                @click="handleUpdateAdmin(scope.row)"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
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
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getAdminList, statusChangeAdmin } from '@/api/admin';
import {useAdminStore} from '@/store/admin';

const router = useRouter();

const currentAdmin = useAdminStore().admin;

// 定义响应式变量
const name = ref('');
const page = ref(1);
const pageSize = ref(5);
const total = ref(0);
const records = ref([]);
// 分页查询函数
const pageQuery = async () => {
  const params = {
    name: name.value,
    page: page.value,
    pageSize: pageSize.value
  };
  try {
    const res = await getAdminList(params);
    if (res.code === 1) {
      records.value = res.data.records.sort((a, b) => {
        if (a.username === 'Pleasure1234') return -1;
        if (b.username === 'Pleasure1234') return 1;
        return a.username.localeCompare(b.username);
      }); // 处理 records
      total.value = res.data.total; // 处理 total
    } else {
      ElMessage.error('获取管理员列表失败');
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

// 启用或禁用管理员
const handleStatusChange = async (row) => {
  if (row.username === 'Pleasure1234') {
    ElMessage.error('超级管理员不允许操作！');
    return;
  }
  try {
    const res = await statusChangeAdmin(row.id, row.status);
    if (res.code === 1) {
      ElMessage.success('账号状态修改成功！');
      await pageQuery();
    } else {
      ElMessage.error('修改状态失败');
    }
  } catch (err) {
    ElMessage.error('请求失败: ' + err.message);
  }
};

// 新增管理员
const handleAddAdmin = () => {
  router.push('/manage/add');
};

// 修改管理员信息
const handleUpdateAdmin = (row) => {
  if (row.username === 'Pleasure1234') {
    ElMessage.error('超级管理员不允许操作！');
    return;
  }
  router.push({
    path: '/manage/add',
    query: { id: row.id }
  });
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
