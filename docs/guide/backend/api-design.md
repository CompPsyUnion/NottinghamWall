# API 设计

Base URLs:

开发环境：`http://localhost:8080`

生产环境：`https://nottinghamwall.yiming1234.cn`

# 用户端公共接口

## POST 学生上传文件

POST /student/common/upload

上传文件

> Body 请求参数

```yaml
files: string

```

### 请求参数

| 名称    | 位置   | 类型           | 必选 | 说明 |
| ------- | ------ | -------------- | ---- | ---- |
| token   | header | string         | 否   | none |
| body    | body   | object         | 否   | none |
| » files | body   | string(binary) | 是   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                    |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultListString](#schemaresultliststring) |

## POST 学生删除文件

POST /student/common/delete

删除文件

> Body 请求参数

```json
{
  "key": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                          | 必选 | 说明 |
| ----- | ------ | ----------------------------- | ---- | ---- |
| token | header | string                        | 否   | none |
| body  | body   | [MapString](#schemamapstring) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": [
    ""
  ]
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                    |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultListString](#schemaresultliststring) |

# 用户端学生接口

## POST 微信登录

POST /student/login/login

微信登录

> Body 请求参数

```json
{
  "code": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                                      | 必选 | 说明 |
| ----- | ------ | ----------------------------------------- | ---- | ---- |
| token | header | string                                    | 否   | none |
| body  | body   | [StudentLoginDTO](#schemastudentlogindto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "token": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                            |
| ------ | ------------------------------------------------------- | ---- | --------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudentLoginVO](#schemaresultstudentloginvo) |

## POST 微信获取手机号

POST /student/login/getPhoneNumber

微信获取手机号

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| code  | query  | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                            |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultString](#schemaresultstring) |

## GET 获取当前用户信息

GET /student/get/currentUserInfo

获取当前用户信息

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "": {}
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                  |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultMapObject](#schemaresultmapobject) |

## GET 获取学生信息

GET /student/get/info

获取学生信息

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "studentid": "",
    "username": "",
    "email": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "avatar": "",
    "createTime": "",
    "updateTime": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudent](#schemaresultstudent) |

## GET 根据id获取学生信息

GET /student/get/info/{id}

根据id获取学生信息

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "studentid": "",
    "username": "",
    "email": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "avatar": "",
    "createTime": "",
    "updateTime": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudent](#schemaresultstudent) |

## GET 根据用户名获取学生信息

GET /student/get/info/username/{username}

根据用户名获取学生信息

### 请求参数

| 名称     | 位置   | 类型   | 必选 | 说明 |
| -------- | ------ | ------ | ---- | ---- |
| username | path   | string | 是   | none |
| token    | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "studentid": 0,
    "username": "",
    "email": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "avatar": "",
    "createTime": "",
    "updateTime": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudent](#schemaresultstudent) |

## PUT 更新学生信息

PUT /student/update/info

更新学生信息

> Body 请求参数

```json
{
  "id": 0,
  "studentid": 0,
  "username": "string",
  "name": "string",
  "avatar": "string",
  "email": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                            | 必选 | 说明 |
| ----- | ------ | ------------------------------- | ---- | ---- |
| token | header | string                          | 否   | none |
| body  | body   | [StudentDTO](#schemastudentdto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## GET 获取发布的帖子（分页）

GET /student/get/publish

获取发布的帖子（分页）

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明 |
| -------- | ------ | ------- | ---- | ---- |
| page     | query  | integer | 是   | none |
| pageSize | query  | integer | 是   | none |
| token    | header | string  | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "records": [
      {
        "id": 0,
        "content": "",
        "authorID": 0,
        "imgURLs": [
          ""
        ],
        "createdAt": "",
        "updatedAt": ""
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                              |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageResultTopic](#schemaresultpageresulttopic) |

## GET 获取评论的帖子（分页）

GET /student/get/comment

获取评论的帖子（分页）

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明 |
| -------- | ------ | ------- | ---- | ---- |
| page     | query  | integer | 是   | none |
| pageSize | query  | integer | 是   | none |
| token    | header | string  | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "records": [
      {
        "id": 0,
        "content": "",
        "authorID": 0,
        "imgURLs": [
          ""
        ],
        "createdAt": "",
        "updatedAt": ""
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                              |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageResultTopic](#schemaresultpageresulttopic) |

## GET 获取收藏的帖子（分页）

GET /student/get/collect

获取收藏的帖子（分页）

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明 |
| -------- | ------ | ------- | ---- | ---- |
| page     | query  | integer | 是   | none |
| pageSize | query  | integer | 是   | none |
| token    | header | string  | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "records": [
      {
        "id": 0,
        "content": "",
        "authorID": 0,
        "imgURLs": [
          ""
        ],
        "createdAt": "",
        "updatedAt": ""
      }
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                              |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageResultTopic](#schemaresultpageresulttopic) |

# 用户端话题接口

## POST 创建话题

POST /student/post/topic

创建话题

> Body 请求参数

```json
{
  "id": 0,
  "content": "string",
  "imgURLs": [
    "string"
  ],
  "authorID": 0,
  "createdAt": "string",
  "updatedAt": "string",
  "isDraft": true
}
```

### 请求参数

| 名称  | 位置   | 类型                        | 必选 | 说明 |
| ----- | ------ | --------------------------- | ---- | ---- |
| token | header | string                      | 否   | none |
| body  | body   | [TopicDTO](#schematopicdto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## DELETE 删除话题

DELETE /student/delete/topic/{id}

删除话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## POST 新建草稿

POST /student/save/draft

新建草稿

> Body 请求参数

```json
{
  "id": 0,
  "content": "string",
  "imgURLs": [
    "string"
  ],
  "authorID": 0,
  "createdAt": "string",
  "updatedAt": "string",
  "isDraft": true
}
```

### 请求参数

| 名称  | 位置   | 类型                        | 必选 | 说明 |
| ----- | ------ | --------------------------- | ---- | ---- |
| token | header | string                      | 否   | none |
| body  | body   | [TopicDTO](#schematopicdto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## GET 获取草稿

GET /student/get/draft

获取草稿

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "content": "",
    "authorID": 0,
    "imgURLs": [
      ""
    ],
    "createdAt": "",
    "updatedAt": "",
    "isDraft": false
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                          |
| ------ | ------------------------------------------------------- | ---- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultTopic](#schemaresulttopic) |

## DELETE 删除草稿

DELETE /student/delete/draft/{id}

删除草稿

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## GET 检查是否存在草稿

GET /student/isexist/draft

检查是否存在草稿

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": false
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultBoolean](#schemaresultboolean) |

## GET 实现话题无限滚动

GET /student/get/topic

实现话题无限滚动

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明 |
| -------- | ------ | ------- | ---- | ---- |
| name     | query  | string  | 否   | none |
| tags     | query  | string  | 否   | none |
| username | query  | string  | 否   | none |
| page     | query  | integer | 否   | none |
| pageSize | query  | integer | 否   | none |
| token    | header | string  | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "records": [
      {}
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                              |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageResultTopic](#schemaresultpageresulttopic) |

## GET 根据id获取话题详情

GET /student/topic/{id}

根据id获取话题详情

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "content": "",
    "authorID": 0,
    "imgURLs": [
      ""
    ],
    "createdAt": "",
    "updatedAt": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                          |
| ------ | ------------------------------------------------------- | ---- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultTopic](#schemaresulttopic) |

## POST 点赞话题

POST /student/like/topic/{id}

点赞话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## POST 取消点赞话题

POST /student/unlike/topic/{id}

取消点赞话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## GET 是否点赞话题

GET /student/islike/topic/{id}

是否点赞话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": false
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultBoolean](#schemaresultboolean) |

## GET 获取点赞计数

GET /student/like/count/{id}

获取点赞计数

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultInteger](#schemaresultinteger) |

## POST 收藏话题

POST /student/collect/topic/{id}

收藏话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## POST 取消收藏话题

POST /student/uncollect/topic/{id}

取消收藏话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## GET 是否收藏话题

GET /student/iscollect/topic/{id}

是否收藏话题

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": false
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultBoolean](#schemaresultboolean) |

## GET 获取收藏计数

GET /student/collect/count/{id}

获取收藏计数

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultInteger](#schemaresultinteger) |

# 用户端评论接口

## POST 评论话题

POST /student/comment/topic/{id}

评论话题

> Body 请求参数

```json
{
  "id": 0,
  "topicId": 0,
  "userId": 0,
  "content": "string",
  "parentId": 0,
  "createdAt": "string",
  "updatedAt": "string",
  "user": {
    "id": 0,
    "studentid": 0,
    "username": "string",
    "name": "string",
    "avatar": "string",
    "email": "string",
    "phone": "string",
    "sex": "string",
    "idNumber": "string"
  },
  "replies": [
    {
      "id": 0,
      "topicId": 0,
      "userId": 0,
      "content": "string",
      "parentId": 0,
      "createdAt": "string",
      "updatedAt": "string",
      "user": {
        "id": 0,
        "studentid": 0,
        "username": "string",
        "name": "string",
        "avatar": "string",
        "email": "string",
        "phone": "string",
        "sex": "string",
        "idNumber": "string"
      },
      "replies": [
        {
          "id": 0,
          "topicId": 0,
          "userId": 0,
          "content": "string",
          "parentId": 0,
          "createdAt": "string",
          "updatedAt": "string",
          "user": {
            "id": null,
            "studentid": null,
            "username": null,
            "name": null,
            "avatar": null,
            "email": null,
            "phone": null,
            "sex": null,
            "idNumber": null
          },
          "replies": [
            {}
          ]
        }
      ]
    }
  ]
}
```

### 请求参数

| 名称  | 位置   | 类型                            | 必选 | 说明 |
| ----- | ------ | ------------------------------- | ---- | ---- |
| id    | path   | string                          | 是   | none |
| token | header | string                          | 否   | none |
| body  | body   | [CommentDTO](#schemacommentdto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## DELETE 删除评论

DELETE /student/delete/comment/{id}

删除评论

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## POST 点赞评论

POST /student/like/comment/{id}

点赞评论

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## POST 取消点赞评论

POST /student/unlike/comment/{id}

取消点赞评论

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                        |
| ------ | ------------------------------------------------------- | ---- | ------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultVoid](#schemaresultvoid) |

## GET 检查是否点赞评论

GET /student/islike/comment/{id}

检查是否点赞评论

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": false
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultBoolean](#schemaresultboolean) |

## GET 获取评论点赞计数

GET /student/like/comment/count/{id}

获取评论点赞计数

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultInteger](#schemaresultinteger) |

## GET 获取评论

GET /student/get/comments/{topicId}

获取指定话题的所有评论，并进行分页处理。

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明            |
| -------- | ------ | ------- | ---- | --------------- |
| topicId  | path   | string  | 是   | 话题ID          |
| page     | query  | integer | 是   | 页码（从1开始） |
| pageSize | query  | integer | 是   | 每页大小        |
| token    | header | string  | 否   | none            |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "list": [
      {
        "id": 0,
        "topicId": 0,
        "userId": 0,
        "content": "",
        "parentId": 0,
        "createdAt": "",
        "updatedAt": "",
        "user": {
          "id": 0,
          "studentid": 0,
          "username": "",
          "name": "",
          "avatar": "",
          "email": "",
          "phone": "",
          "sex": "",
          "idNumber": ""
        },
        "replies": [
          {
            "id": 0,
            "topicId": 0,
            "userId": 0,
            "content": "",
            "parentId": 0,
            "createdAt": "",
            "updatedAt": "",
            "user": {
              "id": 0,
              "studentid": 0,
              "username": "",
              "name": "",
              "avatar": "",
              "email": "",
              "phone": "",
              "sex": "",
              "idNumber": ""
            },
            "replies": []
          }
        ]
      }
    ],
    "pageNum": 0,
    "pageSize": 0,
    "size": 0,
    "startRow": 0,
    "endRow": 0,
    "pages": 0,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": false,
    "isLastPage": false,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 0,
    "navigatepageNums": [
      0
    ],
    "navigateFirstPage": 0,
    "navigateLastPage": 0
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                                    |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageInfoCommentDTO](#schemaresultpageinfocommentdto) |

## GET 获取评论计数

GET /student/comment/count/{id}

获取评论计数

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultInteger](#schemaresultinteger) |

# 用户端举报接口

## POST 举报

POST /student/report/insert

> Body 请求参数

```json
{
  "id": 0,
  "topicId": 0,
  "commentId": 0,
  "authorId": 0,
  "userId": 0,
  "tags": "string",
  "detailedDescription": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                          | 必选 | 说明 |
| ----- | ------ | ----------------------------- | ---- | ---- |
| token | header | string                        | 否   | none |
| body  | body   | [ReportDTO](#schemareportdto) | 否   | none |

> 返回示例

```json
null
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | string   |

# 管理端公共接口

## POST 管理员上传文件

POST /admin/common/upload

上传文件

> Body 请求参数

```yaml
file: string

```

### 请求参数

| 名称   | 位置   | 类型           | 必选 | 说明 |
| ------ | ------ | -------------- | ---- | ---- |
| token  | header | string         | 否   | none |
| body   | body   | object         | 否   | none |
| » file | body   | string(binary) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                            |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultString](#schemaresultstring) |

## POST 管理员删除文件

POST /admin/common/delete

删除文件

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| file  | query  | string | 否   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                            |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultString](#schemaresultstring) |

# 管理端管理员接口

## POST 登录

POST /admin/manage/login

登录

> Body 请求参数

```json
{
  "username": "string",
  "password": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                                  | 必选 | 说明 |
| ----- | ------ | ------------------------------------- | ---- | ---- |
| token | header | string                                | 否   | none |
| body  | body   | [AdminLoginDTO](#schemaadminlogindto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "userName": "",
    "name": "",
    "token": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                        |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultAdminLoginVO](#schemaresultadminloginvo) |

## POST 退出

POST /admin/manage/logout

退出

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": ""
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                            |
| ------ | ------------------------------------------------------- | ---- | ----------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultString](#schemaresultstring) |

## POST 新增管理员

POST /admin/manage

新增管理员

> Body 请求参数

```json
{
  "id": 0,
  "username": "string",
  "name": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                        | 必选 | 说明 |
| ----- | ------ | --------------------------- | ---- | ---- |
| token | header | string                      | 否   | none |
| body  | body   | [AdminDTO](#schemaadmindto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                |
| ------ | ------------------------------------------------------- | ---- | ----------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [Result](#schemaresult) |

## PUT 修改管理员

PUT /admin/manage

修改管理员

> Body 请求参数

```json
{
  "id": 0,
  "username": "string",
  "name": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string"
}
```

### 请求参数

| 名称  | 位置   | 类型                        | 必选 | 说明 |
| ----- | ------ | --------------------------- | ---- | ---- |
| token | header | string                      | 否   | none |
| body  | body   | [AdminDTO](#schemaadmindto) | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                |
| ------ | ------------------------------------------------------- | ---- | ----------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [Result](#schemaresult) |

## POST 启用或停用管理员

POST /admin/manage/status/{status}

启用或停用管理员

### 请求参数

| 名称   | 位置   | 类型    | 必选 | 说明 |
| ------ | ------ | ------- | ---- | ---- |
| status | path   | string  | 是   | none |
| id     | query  | integer | 否   | none |
| token  | header | string  | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                |
| ------ | ------------------------------------------------------- | ---- | ----------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [Result](#schemaresult) |

## GET 分页查询管理员

GET /admin/manage/page

管理员分页查询

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明           |
| -------- | ------ | ------- | ---- | -------------- |
| name     | query  | string  | 否   | 员工姓名       |
| page     | query  | integer | 否   | 页码           |
| pageSize | query  | integer | 否   | 每页显示记录数 |
| token    | header | string  | 否   | none           |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "records": [
      {}
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                    |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageResult](#schemaresultpageresult) |

## GET 根据id查询管理员

GET /admin/manage/{id}

根据id查询管理员

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "username": "",
    "name": "",
    "password": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "status": 0,
    "createTime": "",
    "updateTime": "",
    "createUser": 0,
    "updateUser": 0
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                          |
| ------ | ------------------------------------------------------- | ---- | --------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultAdmin](#schemaresultadmin) |

# 管理端学生接口

## GET 分页查询学生

GET /admin/student/page

学生分页查询

### 请求参数

| 名称     | 位置   | 类型    | 必选 | 说明           |
| -------- | ------ | ------- | ---- | -------------- |
| username | query  | string  | 否   | 用户姓名       |
| page     | query  | integer | 否   | 页码           |
| pageSize | query  | integer | 否   | 每页显示记录数 |
| token    | header | string  | 否   | none           |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "total": 0,
    "records": [
      {}
    ]
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                                    |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultPageResult](#schemaresultpageresult) |

## GET 根据id查询学生

GET /admin/student/{id}

根据id查询学生

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| id    | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "studentid": "",
    "username": "",
    "email": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "avatar": "",
    "createTime": "",
    "updateTime": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudent](#schemaresultstudent) |

## GET 根据学号查询学生

GET /admin/student/{studentId}

根据学号查询学生

### 请求参数

| 名称      | 位置   | 类型   | 必选 | 说明 |
| --------- | ------ | ------ | ---- | ---- |
| studentId | path   | string | 是   | none |
| token     | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "studentid": "",
    "username": "",
    "email": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "avatar": "",
    "createTime": "",
    "updateTime": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudent](#schemaresultstudent) |

## GET 根据邮箱查询学生

GET /admin/student/{email}

根据邮箱查询学生

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| email | path   | string | 是   | none |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": 0,
    "openid": "",
    "studentid": "",
    "username": "",
    "email": "",
    "phone": "",
    "sex": "",
    "idNumber": "",
    "avatar": "",
    "createTime": "",
    "updateTime": ""
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultStudent](#schemaresultstudent) |

# uniapp管理接口

## GET 获取状态

GET /student/uniapp/status

学生端获取状态

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultInteger](#schemaresultinteger) |

## PUT 设置状态

PUT /admin/uniapp/{ststus}

设置状态

### 请求参数

| 名称   | 位置   | 类型   | 必选 | 说明 |
| ------ | ------ | ------ | ---- | ---- |
| status | path   | string | 是   | none |
| token  | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                |
| ------ | ------------------------------------------------------- | ---- | ----------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [Result](#schemaresult) |

## GET 获取状态

GET /admin/uniapp/status

管理端获取状态

### 请求参数

| 名称  | 位置   | 类型   | 必选 | 说明 |
| ----- | ------ | ------ | ---- | ---- |
| token | header | string | 否   | none |

> 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": 0
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型                              |
| ------ | ------------------------------------------------------- | ---- | ------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | [ResultInteger](#schemaresultinteger) |

# 数据模型

<h2 id="tocS_StudentLoginVO">StudentLoginVO</h2>

<a id="schemastudentloginvo"></a>
<a id="schema_StudentLoginVO"></a>
<a id="tocSstudentloginvo"></a>
<a id="tocsstudentloginvo"></a>

```json
{
  "id": 0,
  "openid": "string",
  "token": "string"
}

```

### 属性

| 名称   | 类型    | 必选  | 约束 | 中文名 | 说明 |
| ------ | ------- | ----- | ---- | ------ | ---- |
| id     | integer | false | none |        | none |
| openid | string  | false | none |        | none |
| token  | string  | false | none |        | none |

<h2 id="tocS_AdminLoginVO">AdminLoginVO</h2>

<a id="schemaadminloginvo"></a>
<a id="schema_AdminLoginVO"></a>
<a id="tocSadminloginvo"></a>
<a id="tocsadminloginvo"></a>

```json
{
  "id": 0,
  "userName": "string",
  "name": "string",
  "token": "string"
}

```

### 属性

| 名称     | 类型    | 必选  | 约束 | 中文名 | 说明    |
| -------- | ------- | ----- | ---- | ------ | ------- |
| id       | integer | false | none |        | 主键值  |
| userName | string  | false | none |        | 用户名  |
| name     | string  | false | none |        | 姓名    |
| token    | string  | false | none |        | jwt令牌 |

<h2 id="tocS_ResultInteger">ResultInteger</h2>

<a id="schemaresultinteger"></a>
<a id="schema_ResultInteger"></a>
<a id="tocSresultinteger"></a>
<a id="tocsresultinteger"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": 0
}

```

### 属性

| 名称 | 类型    | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ------- | ----- | ---- | ------ | ------------------------------ |
| code | integer | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string  | false | none |        | 错误信息                       |
| data | integer | false | none |        | 数据                           |

<h2 id="tocS_TopicDTO">TopicDTO</h2>

<a id="schematopicdto"></a>
<a id="schema_TopicDTO"></a>
<a id="tocStopicdto"></a>
<a id="tocstopicdto"></a>

```json
{
  "id": 0,
  "content": "string",
  "imgURLs": [
    "string"
  ],
  "authorID": 0,
  "createdAt": "string",
  "updatedAt": "string",
  "isDraft": true
}

```

### 属性

| 名称      | 类型     | 必选  | 约束 | 中文名 | 说明 |
| --------- | -------- | ----- | ---- | ------ | ---- |
| id        | integer  | false | none |        | none |
| content   | string   | false | none |        | none |
| imgURLs   | [string] | false | none |        | none |
| authorID  | integer  | false | none |        | none |
| createdAt | string   | false | none |        | none |
| updatedAt | string   | false | none |        | none |
| isDraft   | boolean  | false | none |        | none |

<h2 id="tocS_ResultVoid">ResultVoid</h2>

<a id="schemaresultvoid"></a>
<a id="schema_ResultVoid"></a>
<a id="tocSresultvoid"></a>
<a id="tocsresultvoid"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": null
}

```

### 属性

| 名称 | 类型    | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ------- | ----- | ---- | ------ | ------------------------------ |
| code | integer | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string  | false | none |        | 错误信息                       |
| data | null    | false | none |        | 数据                           |

<h2 id="tocS_ResultListString">ResultListString</h2>

<a id="schemaresultliststring"></a>
<a id="schema_ResultListString"></a>
<a id="tocSresultliststring"></a>
<a id="tocsresultliststring"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": [
    "string"
  ]
}

```

### 属性

| 名称 | 类型     | 必选  | 约束 | 中文名 | 说明                           |
| ---- | -------- | ----- | ---- | ------ | ------------------------------ |
| code | integer  | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string   | false | none |        | 错误信息                       |
| data | [string] | false | none |        | 数据                           |

<h2 id="tocS_ReportDTO">ReportDTO</h2>

<a id="schemareportdto"></a>
<a id="schema_ReportDTO"></a>
<a id="tocSreportdto"></a>
<a id="tocsreportdto"></a>

```json
{
  "id": 0,
  "topicId": 0,
  "commentId": 0,
  "authorId": 0,
  "userId": 0,
  "tags": "string",
  "detailedDescription": "string"
}

```

### 属性

| 名称                | 类型    | 必选  | 约束 | 中文名 | 说明 |
| ------------------- | ------- | ----- | ---- | ------ | ---- |
| id                  | integer | false | none |        | none |
| topicId             | integer | false | none |        | none |
| commentId           | integer | false | none |        | none |
| authorId            | integer | false | none |        | none |
| userId              | integer | false | none |        | none |
| tags                | string  | false | none |        | none |
| detailedDescription | string  | false | none |        | none |

<h2 id="tocS_ResultStudentLoginVO">ResultStudentLoginVO</h2>

<a id="schemaresultstudentloginvo"></a>
<a id="schema_ResultStudentLoginVO"></a>
<a id="tocSresultstudentloginvo"></a>
<a id="tocsresultstudentloginvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "openid": "string",
    "token": "string"
  }
}

```

### 属性

| 名称 | 类型                                    | 必选  | 约束 | 中文名 | 说明                           |
| ---- | --------------------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                                 | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                                  | false | none |        | 错误信息                       |
| data | [StudentLoginVO](#schemastudentloginvo) | false | none |        | 数据                           |

<h2 id="tocS_ResultAdminLoginVO">ResultAdminLoginVO</h2>

<a id="schemaresultadminloginvo"></a>
<a id="schema_ResultAdminLoginVO"></a>
<a id="tocSresultadminloginvo"></a>
<a id="tocsresultadminloginvo"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "userName": "string",
    "name": "string",
    "token": "string"
  }
}

```

### 属性

| 名称 | 类型                                | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ----------------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                             | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                              | false | none |        | 错误信息                       |
| data | [AdminLoginVO](#schemaadminloginvo) | false | none |        | 数据                           |

<h2 id="tocS_Result«TopicDTO»">Result«TopicDTO»</h2>

<a id="schemaresult«topicdto»"></a>
<a id="schema_Result«TopicDTO»"></a>
<a id="tocSresult«topicdto»"></a>
<a id="tocsresult«topicdto»"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "content": "string",
    "imgURLs": [
      "string"
    ],
    "authorID": 0,
    "createdAt": "string",
    "updatedAt": "string",
    "isDraft": true
  }
}

```

### 属性

| 名称 | 类型                        | 必选  | 约束 | 中文名 | 说明                           |
| ---- | --------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer¦null                | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string¦null                 | false | none |        | 错误信息                       |
| data | [TopicDTO](#schematopicdto) | false | none |        | 数据                           |

<h2 id="tocS_MapString">MapString</h2>

<a id="schemamapstring"></a>
<a id="schema_MapString"></a>
<a id="tocSmapstring"></a>
<a id="tocsmapstring"></a>

```json
{
  "key": "string"
}

```

### 属性

| 名称 | 类型   | 必选  | 约束 | 中文名 | 说明 |
| ---- | ------ | ----- | ---- | ------ | ---- |
| key  | string | false | none |        | none |

<h2 id="tocS_StudentLoginDTO">StudentLoginDTO</h2>

<a id="schemastudentlogindto"></a>
<a id="schema_StudentLoginDTO"></a>
<a id="tocSstudentlogindto"></a>
<a id="tocsstudentlogindto"></a>

```json
{
  "code": "string"
}

```

### 属性

| 名称 | 类型   | 必选  | 约束 | 中文名 | 说明 |
| ---- | ------ | ----- | ---- | ------ | ---- |
| code | string | false | none |        | none |

<h2 id="tocS_AdminLoginDTO">AdminLoginDTO</h2>

<a id="schemaadminlogindto"></a>
<a id="schema_AdminLoginDTO"></a>
<a id="tocSadminlogindto"></a>
<a id="tocsadminlogindto"></a>

```json
{
  "username": "string",
  "password": "string"
}

```

### 属性

| 名称     | 类型   | 必选  | 约束 | 中文名 | 说明   |
| -------- | ------ | ----- | ---- | ------ | ------ |
| username | string | false | none |        | 用户名 |
| password | string | false | none |        | 密码   |

<h2 id="tocS_TopicUploadDTO">TopicUploadDTO</h2>

<a id="schematopicuploaddto"></a>
<a id="schema_TopicUploadDTO"></a>
<a id="tocStopicuploaddto"></a>
<a id="tocstopicuploaddto"></a>

```json
{
  "Content": "string",
  "ImgURL": "string"
}

```

### 属性

| 名称    | 类型        | 必选  | 约束 | 中文名 | 说明         |
| ------- | ----------- | ----- | ---- | ------ | ------------ |
| Content | string¦null | false | none |        | 话题内容     |
| ImgURL  | string¦null | false | none |        | 话题图片链接 |

<h2 id="tocS_ResultString">ResultString</h2>

<a id="schemaresultstring"></a>
<a id="schema_ResultString"></a>
<a id="tocSresultstring"></a>
<a id="tocsresultstring"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": "string"
}

```

### 属性

| 名称 | 类型    | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ------- | ----- | ---- | ------ | ------------------------------ |
| code | integer | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string  | false | none |        | 错误信息                       |
| data | string  | false | none |        | 数据                           |

<h2 id="tocS_Object">Object</h2>

<a id="schemaobject"></a>
<a id="schema_Object"></a>
<a id="tocSobject"></a>
<a id="tocsobject"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_key">key</h2>

<a id="schemakey"></a>
<a id="schema_key"></a>
<a id="tocSkey"></a>
<a id="tocskey"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_"></h2>

<a id="schema"></a>
<a id="schema_"></a>
<a id="tocS"></a>
<a id="tocs"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_Result">Result</h2>

<a id="schemaresult"></a>
<a id="schema_Result"></a>
<a id="tocSresult"></a>
<a id="tocsresult"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {}
}

```

### 属性

| 名称 | 类型                    | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ----------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                 | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                  | false | none |        | 错误信息                       |
| data | [Object](#schemaobject) | false | none |        | 数据                           |

<h2 id="tocS_PageInfoCommentDTO">PageInfoCommentDTO</h2>

<a id="schemapageinfocommentdto"></a>
<a id="schema_PageInfoCommentDTO"></a>
<a id="tocSpageinfocommentdto"></a>
<a id="tocspageinfocommentdto"></a>

```json
{
  "total": 0,
  "list": [
    {
      "id": 0,
      "topicId": 0,
      "userId": 0,
      "content": "string",
      "parentId": 0,
      "createdAt": "string",
      "updatedAt": "string",
      "user": {
        "id": 0,
        "studentid": 0,
        "username": "string",
        "name": "string",
        "avatar": "string",
        "email": "string",
        "phone": "string",
        "sex": "string",
        "idNumber": "string"
      },
      "replies": [
        {
          "id": 0,
          "topicId": 0,
          "userId": 0,
          "content": "string",
          "parentId": 0,
          "createdAt": "string",
          "updatedAt": "string",
          "user": {
            "id": null,
            "studentid": null,
            "username": null,
            "name": null,
            "avatar": null,
            "email": null,
            "phone": null,
            "sex": null,
            "idNumber": null
          },
          "replies": [
            {}
          ]
        }
      ]
    }
  ],
  "pageNum": 0,
  "pageSize": 0,
  "size": 0,
  "startRow": 0,
  "endRow": 0,
  "pages": 0,
  "prePage": 0,
  "nextPage": 0,
  "isFirstPage": true,
  "isLastPage": true,
  "hasPreviousPage": true,
  "hasNextPage": true,
  "navigatePages": 0,
  "navigatepageNums": [
    0
  ],
  "navigateFirstPage": 0,
  "navigateLastPage": 0
}

```

### 属性

| 名称              | 类型                              | 必选  | 约束 | 中文名 | 说明 |
| ----------------- | --------------------------------- | ----- | ---- | ------ | ---- |
| total             | integer                           | false | none |        | none |
| list              | [[CommentDTO](#schemacommentdto)] | false | none |        | none |
| pageNum           | integer                           | false | none |        | none |
| pageSize          | integer                           | false | none |        | none |
| size              | integer                           | false | none |        | none |
| startRow          | integer                           | false | none |        | none |
| endRow            | integer                           | false | none |        | none |
| pages             | integer                           | false | none |        | none |
| prePage           | integer                           | false | none |        | none |
| nextPage          | integer                           | false | none |        | none |
| isFirstPage       | boolean                           | false | none |        | none |
| isLastPage        | boolean                           | false | none |        | none |
| hasPreviousPage   | boolean                           | false | none |        | none |
| hasNextPage       | boolean                           | false | none |        | none |
| navigatePages     | integer                           | false | none |        | none |
| navigatepageNums  | [integer]                         | false | none |        | none |
| navigateFirstPage | integer                           | false | none |        | none |
| navigateLastPage  | integer                           | false | none |        | none |

<h2 id="tocS_MapObject">MapObject</h2>

<a id="schemamapobject"></a>
<a id="schema_MapObject"></a>
<a id="tocSmapobject"></a>
<a id="tocsmapobject"></a>

```json
{
  "key": {}
}

```

### 属性

| 名称 | 类型              | 必选  | 约束 | 中文名 | 说明 |
| ---- | ----------------- | ----- | ---- | ------ | ---- |
| key  | [key](#schemakey) | false | none |        | none |

<h2 id="tocS_AdminDTO">AdminDTO</h2>

<a id="schemaadmindto"></a>
<a id="schema_AdminDTO"></a>
<a id="tocSadmindto"></a>
<a id="tocsadmindto"></a>

```json
{
  "id": 0,
  "username": "string",
  "name": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string"
}

```

### 属性

| 名称     | 类型    | 必选  | 约束 | 中文名 | 说明 |
| -------- | ------- | ----- | ---- | ------ | ---- |
| id       | integer | false | none |        | none |
| username | string  | false | none |        | none |
| name     | string  | false | none |        | none |
| phone    | string  | false | none |        | none |
| sex      | string  | false | none |        | none |
| idNumber | string  | false | none |        | none |

<h2 id="tocS_Student">Student</h2>

<a id="schemastudent"></a>
<a id="schema_Student"></a>
<a id="tocSstudent"></a>
<a id="tocsstudent"></a>

```json
{
  "id": 0,
  "openid": "string",
  "studentid": 0,
  "username": "string",
  "email": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string",
  "avatar": "string",
  "createTime": "string",
  "updateTime": "string"
}

```

### 属性

| 名称       | 类型    | 必选  | 约束 | 中文名 | 说明             |
| ---------- | ------- | ----- | ---- | ------ | ---------------- |
| id         | integer | false | none |        | none             |
| openid     | string  | false | none |        | 微信用户唯一标识 |
| studentid  | integer | false | none |        | 学号             |
| username   | string  | false | none |        | 姓名             |
| email      | string  | false | none |        | 邮箱             |
| phone      | string  | false | none |        | 手机号           |
| sex        | string  | false | none |        | 性别 0 女 1 男   |
| idNumber   | string  | false | none |        | 身份证号         |
| avatar     | string  | false | none |        | 头像             |
| createTime | string  | false | none |        | 注册时间         |
| updateTime | string  | false | none |        | 更新时间         |

<h2 id="tocS_Topic">Topic</h2>

<a id="schematopic"></a>
<a id="schema_Topic"></a>
<a id="tocStopic"></a>
<a id="tocstopic"></a>

```json
{
  "id": 0,
  "content": "string",
  "authorID": 0,
  "imgURLs": [
    "string"
  ],
  "createdAt": "string",
  "updatedAt": "string",
  "isDraft": true
}

```

### 属性

| 名称      | 类型     | 必选  | 约束 | 中文名 | 说明 |
| --------- | -------- | ----- | ---- | ------ | ---- |
| id        | integer  | false | none |        | none |
| content   | string   | false | none |        | none |
| authorID  | integer  | false | none |        | none |
| imgURLs   | [string] | false | none |        | none |
| createdAt | string   | false | none |        | none |
| updatedAt | string   | false | none |        | none |
| isDraft   | boolean  | false | none |        | none |

<h2 id="tocS_ResultPageInfoCommentDTO">ResultPageInfoCommentDTO</h2>

<a id="schemaresultpageinfocommentdto"></a>
<a id="schema_ResultPageInfoCommentDTO"></a>
<a id="tocSresultpageinfocommentdto"></a>
<a id="tocsresultpageinfocommentdto"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "total": 0,
    "list": [
      {
        "id": 0,
        "topicId": 0,
        "userId": 0,
        "content": "string",
        "parentId": 0,
        "createdAt": "string",
        "updatedAt": "string",
        "user": {
          "id": 0,
          "studentid": 0,
          "username": "string",
          "name": "string",
          "avatar": "string",
          "email": "string",
          "phone": "string",
          "sex": "string",
          "idNumber": "string"
        },
        "replies": [
          {
            "id": null,
            "topicId": null,
            "userId": null,
            "content": null,
            "parentId": null,
            "createdAt": null,
            "updatedAt": null,
            "user": null,
            "replies": null
          }
        ]
      }
    ],
    "pageNum": 0,
    "pageSize": 0,
    "size": 0,
    "startRow": 0,
    "endRow": 0,
    "pages": 0,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": true,
    "hasNextPage": true,
    "navigatePages": 0,
    "navigatepageNums": [
      0
    ],
    "navigateFirstPage": 0,
    "navigateLastPage": 0
  }
}

```

### 属性

| 名称 | 类型                                            | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ----------------------------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                                         | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                                          | false | none |        | 错误信息                       |
| data | [PageInfoCommentDTO](#schemapageinfocommentdto) | false | none |        | 数据                           |

<h2 id="tocS_ResultMapObject">ResultMapObject</h2>

<a id="schemaresultmapobject"></a>
<a id="schema_ResultMapObject"></a>
<a id="tocSresultmapobject"></a>
<a id="tocsresultmapobject"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "key": {}
  }
}

```

### 属性

| 名称 | 类型                          | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ----------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                       | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                        | false | none |        | 错误信息                       |
| data | [MapObject](#schemamapobject) | false | none |        | 数据                           |

<h2 id="tocS_List">List</h2>

<a id="schemalist"></a>
<a id="schema_List"></a>
<a id="tocSlist"></a>
<a id="tocslist"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_ResultStudent">ResultStudent</h2>

<a id="schemaresultstudent"></a>
<a id="schema_ResultStudent"></a>
<a id="tocSresultstudent"></a>
<a id="tocsresultstudent"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "openid": "string",
    "studentid": 0,
    "username": "string",
    "email": "string",
    "phone": "string",
    "sex": "string",
    "idNumber": "string",
    "avatar": "string",
    "createTime": "string",
    "updateTime": "string"
  }
}

```

### 属性

| 名称 | 类型                      | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                   | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                    | false | none |        | 错误信息                       |
| data | [Student](#schemastudent) | false | none |        | 数据                           |

<h2 id="tocS_StudentDTO">StudentDTO</h2>

<a id="schemastudentdto"></a>
<a id="schema_StudentDTO"></a>
<a id="tocSstudentdto"></a>
<a id="tocsstudentdto"></a>

```json
{
  "id": 0,
  "studentid": 0,
  "username": "string",
  "name": "string",
  "avatar": "string",
  "email": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string"
}

```

### 属性

| 名称      | 类型    | 必选  | 约束 | 中文名 | 说明 |
| --------- | ------- | ----- | ---- | ------ | ---- |
| id        | integer | false | none |        | none |
| studentid | integer | false | none |        | none |
| username  | string  | false | none |        | none |
| name      | string  | false | none |        | none |
| avatar    | string  | false | none |        | none |
| email     | string  | false | none |        | none |
| phone     | string  | false | none |        | none |
| sex       | string  | false | none |        | none |
| idNumber  | string  | false | none |        | none |

<h2 id="tocS_ResultTopic">ResultTopic</h2>

<a id="schemaresulttopic"></a>
<a id="schema_ResultTopic"></a>
<a id="tocSresulttopic"></a>
<a id="tocsresulttopic"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "content": "string",
    "authorID": 0,
    "imgURLs": [
      "string"
    ],
    "createdAt": "string",
    "updatedAt": "string",
    "isDraft": true
  }
}

```

### 属性

| 名称 | 类型                  | 必选  | 约束 | 中文名 | 说明                           |
| ---- | --------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer               | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                | false | none |        | 错误信息                       |
| data | [Topic](#schematopic) | false | none |        | 数据                           |

<h2 id="tocS_PageResult">PageResult</h2>

<a id="schemapageresult"></a>
<a id="schema_PageResult"></a>
<a id="tocSpageresult"></a>
<a id="tocspageresult"></a>

```json
{
  "total": 0,
  "records": [
    {}
  ]
}

```

### 属性

| 名称    | 类型     | 必选  | 约束 | 中文名 | 说明           |
| ------- | -------- | ----- | ---- | ------ | -------------- |
| total   | integer  | false | none |        | 总记录数       |
| records | [object] | false | none |        | 当前页数据集合 |

<h2 id="tocS_ResultBoolean">ResultBoolean</h2>

<a id="schemaresultboolean"></a>
<a id="schema_ResultBoolean"></a>
<a id="tocSresultboolean"></a>
<a id="tocsresultboolean"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": true
}

```

### 属性

| 名称 | 类型    | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ------- | ----- | ---- | ------ | ------------------------------ |
| code | integer | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string  | false | none |        | 错误信息                       |
| data | boolean | false | none |        | 数据                           |

<h2 id="tocS_ResultPageResult">ResultPageResult</h2>

<a id="schemaresultpageresult"></a>
<a id="schema_ResultPageResult"></a>
<a id="tocSresultpageresult"></a>
<a id="tocsresultpageresult"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "total": 0,
    "records": [
      {}
    ]
  }
}

```

### 属性

| 名称 | 类型                            | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ------------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                         | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                          | false | none |        | 错误信息                       |
| data | [PageResult](#schemapageresult) | false | none |        | 数据                           |

<h2 id="tocS_CommentDTO">CommentDTO</h2>

<a id="schemacommentdto"></a>
<a id="schema_CommentDTO"></a>
<a id="tocScommentdto"></a>
<a id="tocscommentdto"></a>

```json
{
  "id": 0,
  "topicId": 0,
  "userId": 0,
  "content": "string",
  "parentId": 0,
  "createdAt": "string",
  "updatedAt": "string",
  "user": {
    "id": 0,
    "studentid": 0,
    "username": "string",
    "name": "string",
    "avatar": "string",
    "email": "string",
    "phone": "string",
    "sex": "string",
    "idNumber": "string"
  },
  "replies": [
    {
      "id": 0,
      "topicId": 0,
      "userId": 0,
      "content": "string",
      "parentId": 0,
      "createdAt": "string",
      "updatedAt": "string",
      "user": {
        "id": 0,
        "studentid": 0,
        "username": "string",
        "name": "string",
        "avatar": "string",
        "email": "string",
        "phone": "string",
        "sex": "string",
        "idNumber": "string"
      },
      "replies": [
        {
          "id": 0,
          "topicId": 0,
          "userId": 0,
          "content": "string",
          "parentId": 0,
          "createdAt": "string",
          "updatedAt": "string",
          "user": {
            "id": null,
            "studentid": null,
            "username": null,
            "name": null,
            "avatar": null,
            "email": null,
            "phone": null,
            "sex": null,
            "idNumber": null
          },
          "replies": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

| 名称      | 类型                              | 必选  | 约束 | 中文名 | 说明     |
| --------- | --------------------------------- | ----- | ---- | ------ | -------- |
| id        | integer                           | false | none |        | 评论ID   |
| topicId   | integer                           | false | none |        | 话题ID   |
| userId    | integer                           | false | none |        | 用户ID   |
| content   | string                            | false | none |        | 评论内容 |
| parentId  | integer                           | false | none |        | none     |
| createdAt | string                            | false | none |        | none     |
| updatedAt | string                            | false | none |        | none     |
| user      | [StudentDTO](#schemastudentdto)   | false | none |        | none     |
| replies   | [[CommentDTO](#schemacommentdto)] | false | none |        | none     |

<h2 id="tocS_Admin">Admin</h2>

<a id="schemaadmin"></a>
<a id="schema_Admin"></a>
<a id="tocSadmin"></a>
<a id="tocsadmin"></a>

```json
{
  "id": 0,
  "username": "string",
  "name": "string",
  "password": "string",
  "phone": "string",
  "sex": "string",
  "idNumber": "string",
  "status": 0,
  "createTime": "string",
  "updateTime": "string",
  "createUser": 0,
  "updateUser": 0
}

```

### 属性

| 名称       | 类型    | 必选  | 约束 | 中文名 | 说明                                         |
| ---------- | ------- | ----- | ---- | ------ | -------------------------------------------- |
| id         | integer | false | none |        | none                                         |
| username   | string  | false | none |        | none                                         |
| name       | string  | false | none |        | none                                         |
| password   | string  | false | none |        | none                                         |
| phone      | string  | false | none |        | none                                         |
| sex        | string  | false | none |        | none                                         |
| idNumber   | string  | false | none |        | none                                         |
| status     | integer | false | none |        | none                                         |
| createTime | string  | false | none |        | @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") |
| updateTime | string  | false | none |        | @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") |
| createUser | integer | false | none |        | none                                         |
| updateUser | integer | false | none |        | none                                         |

<h2 id="tocS_ResultAdmin">ResultAdmin</h2>

<a id="schemaresultadmin"></a>
<a id="schema_ResultAdmin"></a>
<a id="tocSresultadmin"></a>
<a id="tocsresultadmin"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "id": 0,
    "username": "string",
    "name": "string",
    "password": "string",
    "phone": "string",
    "sex": "string",
    "idNumber": "string",
    "status": 0,
    "createTime": "string",
    "updateTime": "string",
    "createUser": 0,
    "updateUser": 0
  }
}

```

### 属性

| 名称 | 类型                  | 必选  | 约束 | 中文名 | 说明                           |
| ---- | --------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer               | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                | false | none |        | 错误信息                       |
| data | [Admin](#schemaadmin) | false | none |        | 数据                           |

<h2 id="tocS_PageResultTopic">PageResultTopic</h2>

<a id="schemapageresulttopic"></a>
<a id="schema_PageResultTopic"></a>
<a id="tocSpageresulttopic"></a>
<a id="tocspageresulttopic"></a>

```json
{
  "total": 0,
  "records": [
    {
      "id": 0,
      "content": "string",
      "authorID": 0,
      "imgURLs": [
        "string"
      ],
      "createdAt": "string",
      "updatedAt": "string",
      "isDraft": true
    }
  ]
}

```

### 属性

| 名称    | 类型                    | 必选  | 约束 | 中文名 | 说明 |
| ------- | ----------------------- | ----- | ---- | ------ | ---- |
| total   | integer                 | false | none |        | none |
| records | [[Topic](#schematopic)] | false | none |        | none |

<h2 id="tocS_ResultPageResultTopic">ResultPageResultTopic</h2>

<a id="schemaresultpageresulttopic"></a>
<a id="schema_ResultPageResultTopic"></a>
<a id="tocSresultpageresulttopic"></a>
<a id="tocsresultpageresulttopic"></a>

```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "total": 0,
    "records": [
      {
        "id": 0,
        "content": "string",
        "authorID": 0,
        "imgURLs": [
          "string"
        ],
        "createdAt": "string",
        "updatedAt": "string",
        "isDraft": true
      }
    ]
  }
}

```

### 属性

| 名称 | 类型                                      | 必选  | 约束 | 中文名 | 说明                           |
| ---- | ----------------------------------------- | ----- | ---- | ------ | ------------------------------ |
| code | integer                                   | false | none |        | 编码：1成功，0和其它数字为失败 |
| msg  | string                                    | false | none |        | 错误信息                       |
| data | [PageResultTopic](#schemapageresulttopic) | false | none |        | 数据                           |

