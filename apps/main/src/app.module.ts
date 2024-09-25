import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomMiddleware } from '@libs/middlewares';
import { AuthModule } from './auth/auth.module';

import { CommonModule } from '@libs/common';
import { ChatroomModule } from './chatroom/chatroom.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { DemandModule } from './demand/demand.module';
@Module({
  imports: [ 
    CommonModule,
    DemandModule,
    AuthModule,
    ChatroomModule,
    PostModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //全局日志监听
    consumer.apply(CustomMiddleware).forRoutes('user', 'pal', 'auth');
  }
}
