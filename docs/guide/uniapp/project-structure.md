# 项目结构

1. **核心文件**
    - `index.html`：H5 项目的主入口。
    - `vite.config.js`：Vite 的配置文件。
    - `manifest.json`：项目多端打包配置文件。
    - `pages.json`：应用页面及路由配置。
    - `App.vue`：全局页面布局。

2. **业务模块**
    - `src/pages`：存放应用的业务逻辑页面，按功能划分子文件夹（如 `favorites`、`order`）。
    - `src/api`：封装所有接口请求逻辑，模块化处理。

3. **UI 组件**
    - `src/pages/index/components`：存放业务相关的自定义组件（如 `fab.vue`、`swipper.vue`）。

4. **静态资源**
    - `src/static`：存放图片、图标等静态资源。
    - 按功能划分文件夹（如 `carousel`、`icon`、`logo`）。

5. **工具类**
    - `src/utils/env.js`：存放环境变量配置。
    - `src/utils/request.js`：封装 Axios 网络请求。