import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomMiddleware } from '@libs/middlewares';
import { AuthModule } from './auth/auth.module';

import { CommonModule } from '@libs/common';
import { ChatroomModule } from './chatroom/chatroom.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { PalModule } from './pal/pal.module';
@Module({
  imports: [
    PalModule,
    AuthModule,
    ChatroomModule,
    PostModule,
    UserModule,
    CommonModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //全局日志监听
    consumer.apply(CustomMiddleware).forRoutes('user', 'pal', 'auth');
  }
}
