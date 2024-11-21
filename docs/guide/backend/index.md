# Backend Overview

## 项目概述

本项目是一个基于 Java 的 Web 应用程序，旨在构建一个 NottinghamWall 平台，为用户提供交流和互动的空间。

该部分采用多模块的 Maven 项目结构，包括 wall-common、wall-pojo 和 wall-server 三个主要模块。

## 开发环境（本人使用）

* 操作系统：Windows、macOS 或 Linux。
* JDK：17 或以上版本。
* 数据库：MySQL 8.0 或以上版本。
* 缓存：Redis 5.0 或以上版本。
* 构建工具：Maven 3.6 或以上版本。

## 技术栈

### 后端技术：

* Spring Boot：用于构建独立运行的 Spring 应用程序。
* MyBatis：持久层框架，简化数据库操作。
* Redis：用于缓存和会话管理。
* 阿里云 OSS：用于文件存储和管理，以及**图片内容安全**的识别。
* JWT（JSON Web Token）：用于实现安全的用户身份认证。
* Lombok：简化实体类的编写。

### 数据库：

* MySQL：关系型数据库，用于存储核心业务数据。

### 其他：

* Maven：项目管理和构建工具。
* Git：版本控制系统。