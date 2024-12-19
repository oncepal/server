# 概述

ONCEPAL后端Monorepos(Nest.js + MongoDB replica set + Prisma ORM).

# 功能
- JWT 登录鉴权
- Wechat 微信生态集成
- RBAC 角色权限分配
- Swagger 文档集成
- Dto 自动生成
- CASL 支持同构静态的权限控制
- Filter/Sort 分页排序过滤
- Response Interceptor 统一返回处理封装
- Exception Filters 异常过滤
- Validation Pipes 参数管道控制
- Docker Compose 部署集成
- MongoDB Replica Set 副本集
- Serializers 序列化
- Helmet 请求头保护
- Throttler 限流
- WebSocket 实时通讯集成
- CORS 跨域请求
- Common 微服务架构
- Mongoose Schema 操作支持
- Prisma ORM 集成 

# 环境要求
- Nest.js 10
```js
// 全局安装cli
npm i -g @nestjs/cli
```
- Docker
- Docker Compose
- Node.js 20
- NPM
- PNPM 
```js
npm i -g pnpm
```

# 开发

需要先在电脑上安装docker，安装对应的数据库。

## 开启docker上的服务
```bash
docker-compose up -d
```

> 如果很慢或者报错，记得在配置docker镜像源
>  "registry-mirrors": [
>    "https://dockerproxy.com",
>    "https://docker.m.daocloud.io"
>  ]


## Nest
1. 安装依赖

```
pnpm install
```

2. 生成 Prisma 客户端类型
    
```
npm run prisma
```

1. 启动主服务

```
npm run dev
```

# 项目结构

代码整体还是一个基于package.json的正常node结构，根目录是一些常用的配置文件，比如typescript设置，git设置，env环境等，根目录的docker文件夹包含了docker相关的配置。

由于是微服务架构，所以根目录下是apps文件夹，里面是对应的各个微服务，目前只有main这一个，main下面就是常规的nest文件目录，基于controller模块和server组织的。

而每个微服务项目所需要的nest相关的中间件或者数据库controller，以及一些utils工具放在libs文件夹进行了统一封装。

最后是根目录下的prisma，这里放了数据库字段schema还有生成的dto