import {createRouter, createWebHistory} from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import DashboardVue from '@/views/Dashboard.vue'
import NoticeVue from '@/views/notice/Notice.vue'
import AdminVue from '@/views/admin/Admin.vue'
import StudentVue from '@/views/student/Student.vue'
import addAdminVue from '@/views/admin/addAdmin.vue'

//定义路由关系
const routes = [
    {path: '/login', component: LoginVue},
    {
        path: '/',
        component: DashboardVue,
        children: [
            {
                path: '/',
                component: NoticeVue,
            },
            {
                path: 'manage/admin',
                component: AdminVue,
            },
            {
                path: 'manage/student',
                component: StudentVue,
            },
            {
                path: 'manage/add',
                component: addAdminVue
            }
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(process.env.VITE_API_URL),
    routes
})

//添加全局路由守卫
router.beforeEach((to, from, next) => {
    // 从 localStorage 中获取 token
    const token = localStorage.getItem('token')
    console.log('Token:', token); // 添加日志输出
    if (!token || token === 'null') {
        if (to.path !== '/login') {
            console.log('No valid token found, redirecting to /login'); // 添加日志输出
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
})

//导出路由
export default router;
