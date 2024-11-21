# 项目部署

## 部署方案

1. **构建生产包**
    - 运行以下命令生成生产环境文件：
      ```bash
      pnpm run build
      ```
    - 打包文件输出至 `dist/` 目录。

2. **部署到服务器**
    - 使用 Nginx 部署：
        - 将 `dist/` 内容上传至服务器。
        - 配置 Nginx：
          ```nginx
          server {
              listen       80;
              server_name  yourdomain.com;
   
              location / {
                  root   /path/to/dist;
                  index  index.html;
                  try_files $uri $uri/ /index.html;
              }
          }
          ```
    - 验证部署成功后，通过浏览器访问域名。

3. **注意事项**
    - 配置 `.env.production` 确保环境变量正确。
    - 检查生产环境 API 接口和跨域配置。