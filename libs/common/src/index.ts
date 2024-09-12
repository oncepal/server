import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor } from '@libs/interceptors';
import { InvokeRecordInterceptor } from '@libs/interceptors';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@libs/filters';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
export const startCommonServer = (
  module: any,port: 1996,
  options= {
    
  },
) => {
  async function starter() {
    const {  } = options;
    const app = await NestFactory.create(module, { cors: true });

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
