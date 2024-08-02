// 添加全局路由守卫
export function setupRouterGuard(router) {
    router.beforeEach((to, from, next) => {
        // 从 localStorage 中获取 token
        const token = localStorage.getItem('token');

        if (!token && to.path !== '/login') {
            next('/login');
        } else {
            next();
        }
    });
}
