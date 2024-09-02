# 概述

ONCEPAL后端Monorepos(Nest.js + MongoDB replica set + Prisma ODM).

# 功能
- JWT 登录鉴权
- CASL 权限控制集成
- Data 分页排序过滤
- Exception Filters 异常过滤
- Validation Pipes 参数管道控制
- Docker Compose 部署集成
- MongoDB Replica Set 副本集
- Serializers 序列化
- Helmet 头保护
- Throttler 限流
- CORS 跨域支持

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

2. Start the Docker containers using docker-compose
```bash
docker-compose up -d
```

3. Start an interactive MongoDb shell session on the primary node
```bash
docker exec -it mongo0 mongosh --port 30000

# in the shell
config={"_id":"rs0","members":[{"_id":0,"host":"mongo0:30000"},{"_id":1,"host":"mongo1:30001"},{"_id":2,"host":"mongo2:30002"}]}
rs.initiate(config);
```

4 Update hosts file
```bash
sudo nano /etc/hosts

# write in the file
127.0.0.1 mongo0 mongo1 mongo2
```

5. Connect to MongoDB and check the status of the replica set
```
mongosh "mongodb://localhost:30000,localhost:30001,localhost:30002/?replicaSet=rs0"
```


## Nest
1. 安装依赖

```
pnpm install
```

2. 生成 Prisma 客户端类型
    
```
npm run db:generate
```

3. 推送 MongoDB Schema 

```
npm run db:push
```


4. Start the application

```
npm run start:dev
```

## JWT

### AuthGuard
By default, `AuthGuard` will look for a JWT in the `Authorization` header with the scheme `Bearer`. You can customize this behavior by passing an options object to the `AuthGuard` decorator.
All routes that are protected by the `AuthGuard` decorator will require a valid JWT token in the `Authorization` header of the incoming request.
    
```typescript
// app.module.ts

providers: [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
]
```

### SkipAuth
You can skip authentication for a route by using the `SkipAuth` decorator.

```typescript
// app.controller.ts

@SkipAuth()
@Get()
async findAll() {
    return await this.appService.findAll();
}
```

## CASL

### Roles configuration

Define roles for app:

```typescript
// app.roles.ts

export enum Roles {
  admin = 'admin',
  customer = 'customer',
}
```

## CaslUser decorator
CaslUser decorator provides access to lazy loaded user, obtained from request or user hook and cached on request object.

```typescript
    @UseGuards(AuthGuard, AccessGuard)
    @UseAbility(Actions.update, Post)
    async updatePostConditionParamNoHook(
      @Args('input') input: UpdatePostInput,
      @CaslUser() userProxy: UserProxy<User>
    ) {
    const user = await userProxy.get();
    }
```

## Prisma 

### Configuration

---
title: Configuration
---

`PrismaModule` provides a `forRoot(...)` and `forRootAsync(..)` method. They accept an option object of `PrismaModuleOptions` for the [PrismaService](#prismaservice-options) and [PrismaClient](#prismaclient-options).

## PrismaService options

### isGlobal

If `true`, registers `PrismaModule` as a [global](https://docs.nestjs.com/modules#global-modules) module. `PrismaService`will be available everywhere.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

### prismaServiceOptions.explicitConnect

If `true`, `PrismaClient` explicitly creates a connection pool and your first query will respond instantly.

For most use cases the [lazy connect](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management) behavior of `PrismaClient` will do. The first query of `PrismaClient` creates the connection pool.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
  ],
})
export class AppModule {}
```

## PrismaClient options

### prismaServiceOptions.prismaOptions

Pass `PrismaClientOptions` [options](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#prismaclient) directly to the `PrismaClient`.

### prismaServiceOptions.middlewares

Apply Prisma [middlewares](/docs/prisma-middlewares) to perform actions before or after db queries.

## Async configuration

Additionally, `PrismaModule` provides a `forRootAsync` to pass options asynchronously.

### useFactory

One option is to use a factory function:

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['info', 'query'],
        },
        explicitConnect: false,
      }),
    }),
  ],
})
export class AppModule {}
```

You can inject dependencies such as `ConfigModule` to load options from .env files.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: [configService.get('log')],
            datasources: {
              db: {
                url: configService.get('DATABASE_URL'),
              },
            },
          },
          explicitConnect: configService.get('explicit'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### useClass

Alternatively, you can use a class instead of a factory:

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
  ],
})
export class AppModule {}
```

Create the `PrismaConfigService` and extend it with the `PrismaOptionsFactory`

```ts
import { Injectable } from '@nestjs/common';
import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query'],
      },
      explicitConnect: true,
    };
  }
}
```

### Prisma Middleware

Apply [Prisma Middlewares](https://www.prisma.io/docs/concepts/components/prisma-client/middleware) with `PrismaModule`

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [
          async (params, next) => {
            // Before query: change params
            const result = await next(params);
            // After query: result
            return result;
          },
        ], // see example loggingMiddleware below
      },
    }),
  ],
})
export class AppModule {}
```

Here is an example for using a [Logging middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware).

Create your Prisma Middleware and export it as a `function`

```ts
// src/logging-middleware.ts
import { Prisma } from '@prisma/client';

export function loggingMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    );

    return result;
  };
}
```

Now import your middleware and add the function into the `middlewares` array.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './logging-middleware';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
  ],
})
export class AppModule {}
```