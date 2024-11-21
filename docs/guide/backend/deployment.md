# 项目部署

## 环境配置

1. 安装 JDK：确保已安装 JDK 1.8 或以上版本，并配置好 JAVA_HOME 环境变量。

2. 安装 Maven：下载并安装 Maven，配置 MAVEN_HOME 环境变量。

3. 安装 MySQL：安装 MySQL 数据库，并创建项目所需的数据库。

- 数据库所需文件在仓库根目录下的 `nottinghamwall.sql` 中

4. 安装 Redis：安装并启动 Redis 服务。

5. 配置阿里云 OSS：在阿里云控制台获取访问密钥，并创建存储空间。

6. 配置文件修改

- 进入 `wall-server/src/main/resources` 目录，根据环境修改以下配置文件：

**数据库配置**（`application.yml`）：

   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/your_database_name?useSSL=false&useUnicode=true&characterEncoding=UTF-8
       username: your_username
       password: your_password
   ```

**Redis 配置**：

   ```yaml
   spring:
     redis:
       host: localhost
       port: 6379
   ```

**阿里云 OSS 配置**（`application.yml` 或自定义配置文件）：

   ```yaml
   oss:
     endpoint: your_oss_endpoint
     accessKeyId: your_access_key_id
     accessKeySecret: your_access_key_secret
     bucketName: your_bucket_name
   ```

**JWT 配置**：

   ```yaml
   jwt:
     secret: your_jwt_secret
     expiration: token_expiration_time_in_seconds
   ```

## 构建与运行

1. **使用 Maven 构建项目**：

   在项目根目录下执行下面的命令来安装该部分所需的依赖，
    
    或者点击IDEA右侧栏中`maven`生命周期中的install选项

   ```bash
   mvn clean install
   ```

2. **运行项目**：

    - **方法一**：使用 IDE（如 IntelliJ IDEA）运行 `WallApplication` 的 `main` 方法。
    - **方法二**：在终端中运行打包后的 JAR 文件：

      ```bash
      cd wall-server/target
      java -jar wall-server-1.0-SNAPSHOT.jar
      ```