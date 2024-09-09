import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { CustomMiddleware } from '@libs/middlewares';
import { AuthModule } from './auth/auth.module';
import { PalModule } from './pal/pal.module';

import { CommonModule } from '@libs/common';
@Module({
  imports: [
    // PalModule,
    // UserModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //全局日志监听
    consumer.apply(CustomMiddleware).forRoutes('user', 'pal', 'auth');
  }
}
