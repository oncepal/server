import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { InvokeRecordInterceptor } from './common/interceptors/invokeRecord.Interceptor';

import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
async function starter() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const user = app.connectMicroservice<MicroserviceOptions>({
    
  // })
 // 全局参数自动过滤
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
 
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalInterceptors(new InvokeRecordInterceptor()) 
  
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(1996);
}
starter();
