# Uniapp Overview

## 项目概述

本项目采用 **Uniapp** 框架进行开发，主要编译成微信小程序，具有模块化结构、清晰的代码组织及高扩展性。
目录结构包含必要的配置文件、页面组件、静态资源以及工具类文件，支持多端高效开发和维护。

## 开发环境

1. **必备工具**
    - IDE: HBuilderX（推荐）、WebStorm 或 VSCode。
    - Node.js 版本：`>=16.0.0`
    - 包管理工具：pnpm

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发环境**
    - 微信小程序开发：
      ```bash
      pnpm run dev:mp-weixin
      ```

4. **生产构建**
    - 微信小程序生产环境构建：
      ```bash
      pnpm run build:mp-weixin
      ```

## 技术栈

1. **框架与语言**
    - 开发框架：Uniapp
    - 核心语言：JavaScript (ES6+) / TypeScript (可选)

2. **构建工具**
    - Vite：提供快速、轻量的构建环境。
    - pnpm：高效的依赖管理工具。

3. **UI 组件**
    - 使用 `@dcloudio/uni-ui` 提供的组件（如 `uni-card`、`uni-icons` 等），实现一致的 UI 体验。

4. **后端接口**

   - 见`backend`部分

5. **多端兼容**
    - 主要兼容微信小程序，通过配置 `manifest.json` 和 `pages.json` 定义应用入口与页面结构。

