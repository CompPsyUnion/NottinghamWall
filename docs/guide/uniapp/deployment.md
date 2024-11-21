# 项目部署

## 执行步骤

1.  **启动开发环境**
    - 微信小程序开发：
      ```bash
      pnpm run dev:mp-weixin
      ```

2.  **生产构建**
   - 在`mianfest.json`中，绑定对应的 AppID
   - 微信小程序生产环境编译构建：
     ```bash
     pnpm run build:mp-weixin
     ```
3.  **微信小程序部署**
    - 构建输出到 `dist/dev/mp-weixin` 文件夹。
    - 导入微信开发者工具并上传代码。