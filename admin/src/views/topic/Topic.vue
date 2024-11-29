<template>
  <div class="content-wrapper">
    <div class="dashboard-container">
      <div class="container">
        <!-- 搜索栏 -->
        <div class="tableBar">
          <label style="margin-right:5px">话题内容：</label>
          <el-input v-model="username" placeholder="请输入话题内容" style="width:15%" />
          <el-button type="primary" style="margin-left:25px" @click="pageQuery">
            查询
          </el-button>
        </div>

        <div v-if="records.length > 0">
          <div v-for="topic in records" :key="topic.id" class="topic-item">
            <el-descriptions
                direction="vertical"
                border
                style="margin-top: 20px"
            >
              <!-- 图片预览部分 -->
              <el-descriptions-item
                  label="Photo"
                  align="center"
              >
                <div class="image-preview">
                  <el-image
                      :key="index"
                      :src="topic.imgURLs[0]"
                      :preview-src-list="topic.imgURLs"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      fit="cover"
                      class="topic-image"
                  />
                </div>
              </el-descriptions-item>
              <!-- 发帖人名称 -->
              <el-descriptions-item label="Student ID">
                <strong>{{ topic.authorUsername }}</strong>
              </el-descriptions-item>
              <!-- 创建时间 -->
              <el-descriptions-item label="Created Time">
                {{ formatDate(topic.createdAt) }}
              </el-descriptions-item>
              <!-- 话题内容 -->
              <el-descriptions-item label="Content">
                {{ topic.content }}
              </el-descriptions-item>
              <!-- 评论部分 -->
              <el-descriptions-item label="Comment">
                <el-collapse v-model="activeNames[topic.id]" @change="handleChange(topic.id)">
                  <el-collapse-item title="点击展开评论" name="1">
                    <div v-for="comment in topic.comments" :key="comment.id">
                      <p><strong>{{ comment.user.username }}:</strong> {{ comment.content }}</p>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-descriptions-item>
              <!-- 话题删除部分 -->
              <el-descriptions-item label="Delete">
                <el-button
                    type="danger"
                    size="small"
                    @click="handleDeleteTopic(topic.id)"
                    style="margin-top: 10px; margin-left: auto; display: block;"
                >
                  删除话题
                </el-button>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

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

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {ElMessage} from 'element-plus';
import {getTopicList,deleteTopic} from '@/api/topic';
import {getStudentById} from '@/api/student'
import {getCommentListByTopicId} from '@/api/comment';

const username = ref('');
const page = ref(1);
const pageSize = ref(5);
const total = ref(0);
const records = ref([]);
const activeNames = ref<Record<number, Array<string>>>({});

const getUsername = async (authorID: number) => {
  try {
    const response = await getStudentById(authorID);
    return response.data.username || '未知';
  } catch (error) {
    console.error('Error fetching username:', error);
    return '未知';
  }
};

const pageQuery = async () => {
  const params = {
    username: username.value,
    page: page.value,
    pageSize: pageSize.value
  };
  try {
    const res = await getTopicList(params);
    if (res.code === 1) {
      records.value = await Promise.all(
          res.data.records.map(async (topic: any) => {
            if (!topic.authorUsername) {
              topic.authorUsername = await getUsername(topic.authorID);
            }
            return topic;
          })
      );
      total.value = res.data.total;
    } else {
      ElMessage.error('获取话题列表失败');
    }
  } catch (err: any) {
    ElMessage.error('请求失败: ' + err.message);
  }
};

const fetchComments = async (topicId: number) => {
  try {
    const response = await getCommentListByTopicId(topicId);
    const topic = records.value.find((t: any) => t.id === topicId);
    if (topic) {
      topic.comments = await Promise.all(
          response.data.list.map(async (comment: any) => {
            const userResponse = await getStudentById(comment.userId);
            comment.user = userResponse.data;
            return comment;
          })
      );
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const handleDeleteTopic = async (topicId: number) => {
  try {
    const response = await deleteTopic(topicId);
    if (response.code === 1) {
      ElMessage.success('删除成功');
      await pageQuery();
    } else {
      ElMessage.error('删除失败，请稍后再试');
    }
  } catch (error) {
    ElMessage.error('删除话题失败: ' + error.message);
  }
};

const formatDate = (dateTime: string | null) => {
  if (!dateTime) return '未知';
  const date = new Date(dateTime);
  return date.toLocaleString();
};

const handleSizeChange = async (newSize: number) => {
  pageSize.value = newSize;
  await pageQuery();
};

const handleCurrentChange = async (newPage: number) => {
  page.value = newPage;
  await pageQuery();
};

const handleChange = async (topicId: number) => {
  console.log(`Topic ID ${topicId} collapse changed`);
  await fetchComments(topicId);
};

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
  margin-bottom: 20px; /* 添加 tableBar 下方的间距 */
}

.topic-item {
  margin-bottom: 20px;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 添加间距 */
}

.topic-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.pageList {
  margin-top: 20px; /* 添加分页组件上方的间距 */
}
</style>
