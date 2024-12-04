# 概述

ONCEPAL后端Monorepos(Nest.js + MongoDB replica set + Prisma ORM).

# 功能
- JWT 登录鉴权
- Wechat 微信生态集成
- RBAC 角色权限分配
- Swagger 文档集成
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
- Common 统一封装微服务统一架构
- Mongoose Schema 操作支持
- Prisma ORM 集成 

# 环境要求
- Nest.js 10
```js
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

> ####如果很慢，记得在配置docker镜像源
>  "registry-mirrors": [
>    "https://dockerproxy.com",
>    "https://docker.m.daocloud.io"
>  ]

## MongoDB Replica Set 副本集
<!-- 1. Create volume for each MongoDB node
```bash
docker volume create --name mongodb_repl_data1 -d local
docker volume create --name mongodb_repl_data2 -d local
docker volume create --name mongodb_repl_data3 -d local
``` -->

2. 创建启动docker服务
```bash
docker-compose up -d
```
<!-- 
3. Start an interactive MongoDb shell session on the primary node
```bash
docker exec -it mongo0 mongosh --port 30000

# in the shell
config={"_id":"rs0","members":[{"_id":0,"host":"mongo0:30000"},{"_id":1,"host":"mongo1:30001"},{"_id":2,"host":"mongo2:30002"}]}
rs.initiate(config);
``` -->

<!-- 1. Connect to MongoDB and check the status of the replica set
```
mongosh "mongodb://localhost:30000,localhost:30001,localhost:30002/?replicaSet=rs0"
``` -->


## Nest
1. 安装依赖

```
pnpm install
```

2. 生成 Prisma 客户端类型
    
```
npm run db:generate
```

3. 推送 MongoDB Schema （非必须）

```
npm run db:push
```


4. 启动主服务

```
npm run dev
```
