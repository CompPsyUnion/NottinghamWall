# Admin Overview

## 项目概述

本项目是基于 **Vue 3** 框架开发的后端管理面板，采用模块化设计思想，具备良好的扩展性和维护性。

该系统包含用户管理、学生管理、公告管理、话题管理等核心功能，通过简洁清晰的界面和高效的 API 调用，帮助管理员实现快速高效的后台操作。

## 开发环境配置

1. **必备工具**
    - Node.js：`>=16.0.0`
    - 包管理工具：pnpm
    - IDE：WebStorm 或 VSCode（推荐安装 `Vetur`、`Prettier` 插件）。

2. **环境变量**
    - `.env.development`：开发环境变量配置。
    - `.env.production`：生产环境变量配置。

3. **安装依赖**
   ```bash
   pnpm install
   ```

4. **开发启动**
   ```bash
   pnpm run dev
   ```

5. **构建生产包**
   ```bash
   pnpm run build
   ```

6. **代码规范**
    - 配置文件：`.eslintrc.cjs`
    - Lint 检查：
      ```bash
      pnpm run lint
      ```

## 技术栈

1. **前端框架**
    - Vue 3：现代化渐进式 JavaScript 框架，用于构建用户界面。
    - Vite：快速构建工具，提供高效的开发体验和优化的生产构建。

2. **状态管理**
    - Pinia（可扩展为 Vuex）：集中式状态管理，处理全局状态，如用户 token 和权限。

3. **路由管理**
    - Vue Router：负责页面的动态导航和权限管理。

4. **请求工具**
    - Axios：用于封装 HTTP 请求，结合 `request.js` 和 `requestOptimize.js` 提供统一的请求和响应拦截。

5. **样式与 UI**
    - CSS + SCSS：灵活的样式支持，主样式入口为 `assets/main.scss`。
    - Icon：内置的 `logo` 图标集，满足各种场景需求。