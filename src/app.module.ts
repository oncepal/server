import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PalModule } from './pal/pal.module';
import { StatisticModule } from './statistic/statistic.module';
@Module({
  imports: [StatisticModule, PalModule,UserModule, MongooseModule.forRoot('mongodb://localhost:27017/oncepal'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user');
  }
}
