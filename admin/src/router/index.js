import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue';

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: Dashboard,
        // path: '/', component: Dashboard, children: [
        //     { path: '/user/front', component: FrontPageVue },
        //     { path: '/article/category', component: ArticleCategoryVue},
        //     { path: '/user/info', component: UserInfoVue },
        //     { path: '/article/manage', component: ArticleManageVue }
        // ]
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
