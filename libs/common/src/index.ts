import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor, InvokeRecordInterceptor } from '@libs/interceptors';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@libs/filters';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as PrismaModel from "prisma/dto"


export const startCommonServer = (
  module: any,
  port: 1996,
  options = {},
) => {
  async function starter() {
    const app = await NestFactory.create(module, { cors: true });
    const { } = options;

    // 创建 Swagger 文档
    const config = new DocumentBuilder()
      .setTitle('API 文档')
      .setDescription('API 描述')
      .setVersion('1.0')
      .addTag('api')
      .addServer('/api-json')
      .build();
      
    const document = SwaggerModule.createDocument(app, config,{
      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => methodKey,
     extraModels:Object.values(PrismaModel)
    });
    SwaggerModule.setup('api', app, document);
   
    // 使用 nestjs-pino 日志记录器
    app.useLogger(app.get(Logger));

    // 全局参数自动过滤
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        // disableErrorMessages: true,
        // whitelist: true,
      }),
    );
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalInterceptors(new InvokeRecordInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(helmet());
    await app.listen(port);
  }
  starter();
};

export * from './common.module';
export * from './common.service';