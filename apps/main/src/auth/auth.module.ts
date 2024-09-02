import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '@libs/guards';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' }
      }),
      inject: [ConfigService],
    })
   
  ],
  providers: [AuthService,{
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}