import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@libs/interceptors';
import { InvokeRecordInterceptor } from '@libs/interceptors';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@libs/filters';
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
