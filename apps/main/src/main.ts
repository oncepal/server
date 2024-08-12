import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { InvokeRecordInterceptor } from './common/interceptors/invokeRecord.Interceptor';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function starter() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const microserviceUser = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 19961,
    },
    
  });
  const microserviceRedis = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 19962,
    },
  });

 // 全局参数自动过滤
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
 
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalInterceptors(new InvokeRecordInterceptor()) 
  
  app.useGlobalFilters(new HttpExceptionFilter());  
  app.use(helmet());

  
  await app.startAllMicroservices();
  await app.listen(1996);
}
starter();
