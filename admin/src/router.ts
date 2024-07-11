import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index.vue";
// import {
//   getToken,
//   setToken,
//   removeToken,
//   getStoreId,
//   setStoreId,
//   removeStoreId,
//   setUserInfo,
//   getUserInfo,
//   removeUserInfo
// } from "@/utils/cookies";
import store from "@/store";

Vue.use(Router);
/**
 * 路由配置
 */
const router = new Router({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login.vue"),
      meta: { title: "宁波诺丁汉大学校园墙", hidden: true, notNeedAuth: true }
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: { title: "宁波诺丁汉大学校园墙", hidden: true, notNeedAuth: true }
    },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          component: () =>  import("@/views/Dashboard/index.vue"),
          name: "Dashboard",
          meta: {
            title: "工作台",
            icon: "dashboard",
            affix: true
          }
        },
		    {
          path: "/statistics",
          component: () => import("@/views/statistics/index.vue"),
          meta: {
            title: "数据统计",
            icon: "icon-statistics"
          }
        },
        {
          path: "order",
          component: () => import("@/views/orderDetails/index.vue"),
          meta: {
            title: "订单管理",
            icon: "icon-order"
          }
        },
        {
          path: "topic",
          component: () => import("@/views/topic/index.vue"),
          meta: {
            title: "话题管理",
            icon: "icon-inform"
          }
        },
        {
          path:"comment",
          component: () => import("@/views/Comments/index.vue"),
          meta: {
            title: "点赞和评论管理",
            icon: "icon-combo"
          }
        },
        {
          path: "admin",
          component: () => import("@/views/Admin/index.vue"),
          meta: {
            title: "管理员管理",
            icon: "icon-employee"
          }
        },
        {
          path: "user",
          component: () => import("@/views/User/index.vue"),
          meta: {
            title: "学生管理",
            icon: "icon-user"
          }
        },

        {
          path: "/manage/add",
          component: () => import("@/views/Admin/addAdmin.vue"),
          meta: {
            title: "添加/修改管理员",
            hidden: true
          }
        },
      ]
    },
    {
      path: "*",
      redirect: "/404",
      meta: { hidden: true }
    }
  ]
});

export default router;
