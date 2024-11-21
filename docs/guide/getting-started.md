# 相关链接

* [项目小程序端](https://github.com/NottinghamWall/NottinghamWall/tree/main/uniapp)

* [项目后台管理端](https://github.com/NottinghamWall/NottinghamWall/tree/main/admin)

* [项目服务器端](https://github.com/NottinghamWall/NottinghamWall/tree/main/backend)

* [项目接口文档](https://apifox.com/apidoc/shared-4f188e54-2808-4958-9fd1-8acbb4c4072c)


特别说明：接口文档中Header参数部分使用的token为每次登录时生成的JWT令牌，无默认有效值。

管理端默认用户名：Pleasure1234 密码：123456 

由于写入数据库时进行了md5编码，导入sql文件时应在admin数据表中添加 Pleasure1234 e10adc3949ba59abbe56e057f20f883e 1

开发者需自行在数据库中进行添加编辑

# 相关功能及技术栈

## 简单介绍

* NottinghamWall-backend主要使用SpringBoot进行编写，同时运用MySQL，MyBatis等工具。

* NottinghamWall-Admin主要使用Vue3进行编写，搭配Element-plus组件库来实现页面效果，同时运用Vite项目管理器以及pnpm包管理工具。

* NottinghamWall-uniapp主要用uniapp进行编写，搭配uni-ui组件库来实现页面效果。

P.S. 特别说明

1. 简介中提到的工具，如果是在开发环境中，需要自行提前安装，暂未尝试针对其他构建工具的适配。由于笔者能力有限，一些关于自动化测试部分的内容创建但没有书写。采用的是最朴素的日志，接口工具以及前后端联调等方式进行的测试。

2. 小程序端由于资质认证备案以及上线比较困难，所以部分功能的测试是在**小程序测试号**中进行。

3. 微信官方为了防止相关接口的滥用，需要在小程序测试号中配置合法的服务器域名，如果不想将NottinghamWall-backend上传至服务器，可以选择将本地启动的服务器端进行内网穿透，填写在合法域名栏中，推荐CPOLAR。

## 技术栈相关知识

如果你对相关的技术还不熟悉，可以前往我的博客看看整理的相关文章。就不在这里过多赘述占据篇幅了。

![截图于2024年7月31日](https://github.com/user-attachments/assets/e7330c69-d0d9-4551-8a23-bb53b6552652)

* [前置知识专栏](https://blog.csdn.net/2302_79791164/category_12589142.html)

* [前后端的比较](https://yiming1234.blog.csdn.net/article/details/136700267)

* [Vue前置知识](https://yiming1234.blog.csdn.net/article/details/136977577)

* [前端专有名词介绍](https://yiming1234.blog.csdn.net/article/details/140828434)

* [SpringBoot中一些常见的技术](https://yiming1234.blog.csdn.net/article/details/138284767)

* [SpringBoot常见目录的作用](https://yiming1234.blog.csdn.net/article/details/138380736)