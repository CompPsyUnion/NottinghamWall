# 项目结构

```
项目根目录
├── pom.xml                   // 父项目的 Maven 配置文件
├── README.md                 // 项目说明文件
├── wall-common                           // 公共模块
│   ├── pom.xml
│   └── src
│       └── main/java/cn/yiming1234/NottinghamWall
│           ├── constant      // 常量类
│           ├── context       // 上下文处理
│           ├── enumeration   // 枚举类型
│           ├── exception     // 自定义异常
│           ├── json          // JSON 处理
│           ├── properties    // 配置属性类
│           ├── result        // 统一返回结果封装
│           └── utils         // 工具类
├── wall-pojo                             // 实体类模块
│   ├── pom.xml
│   └── src
│       └── main/java/cn/yiming1234/NottinghamWall
│           ├── dto           // 数据传输对象
│           ├── entity        // 实体类
│           ├── typehandler   // 类型处理器
│           └── vo            // 视图对象
└── wall-server                          // 服务模块
    ├── pom.xml
    └── src
        ├── main/java/cn/yiming1234/NottinghamWall
        │   ├── WallApplication.java     // 启动类
        │   ├── annotation               // 自定义注解
        │   ├── aspect                   // 切面编程
        │   ├── config                   // 配置类
        │   ├── controller               // 控制层
        │   │   ├── admin                // 管理员相关接口
        │   │   └── student              // 学生相关接口
        │   ├── handler                  // 全局异常处理
        │   ├── interceptor              // 拦截器
        │   ├── mapper                   // 数据访问层
        │   └── service                  // 业务逻辑层
        └── main/resources
            ├── application.yml          // 主配置文件
            ├── application-dev.yml      // 开发环境配置文件
            ├── application-prod.yml     // 生产环境配置文件
            └── mapper                   // MyBatis 映射文件

```