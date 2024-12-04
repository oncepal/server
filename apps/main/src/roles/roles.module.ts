import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'libs/prisma/src/prisma.module'; // 导入 PrismaModule
import { AuthModule } from '../auth/auth.module'; // 导入 AuthModule
import { UserModule } from '../user/user.module'; // 导入 UserModule

@Module({
  imports: [PrismaModule, AuthModule, UserModule], // 导入 PrismaModule、AuthModule 和 UserModule
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // 导出 RolesService，以便其他模块可以使用
})
export class RolesModule {}
