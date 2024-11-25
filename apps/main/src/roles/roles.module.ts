import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'libs/prisma/src/prisma.module'; // 导入 PrismaModule
import { AuthModule } from '../auth/auth.module'; // 导入 AuthModule

@Module({
  imports: [PrismaModule, AuthModule], // 导入 PrismaModule 和 AuthModule
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // 导出 RolesService，以便其他模块可以使用
})
export class RolesModule {}
