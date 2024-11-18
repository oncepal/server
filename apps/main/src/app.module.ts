import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomMiddleware } from '@libs/middlewares';
import { AuthModule } from './auth/auth.module';
import { SwaggerModule } from '@nestjs/swagger';

import { CommonModule } from '@libs/common';
import { ChatroomModule } from './chatroom/chatroom.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { DemandModule } from './demand/demand.module';
import { LoggerModule } from 'nestjs-pino';

const isDev = process.env.NODE_ENV !== 'production';

@Module({
  imports: [
    CommonModule,
    DemandModule,
    AuthModule,
    ChatroomModule,
    PostModule,
    UserModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: isDev ? 'debug' : 'info',
        transport: isDev
          ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          }
          : undefined,
      },
    }),
    SwaggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //全局日志监听
    consumer.apply(CustomMiddleware).forRoutes('user', 'pal', 'auth');
  }
}
