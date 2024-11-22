import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'libs/prisma/src/prisma.module'; // 导入 PrismaModule

@Module({
  imports: [PrismaModule], // 导入 PrismaModule
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // 导出 RolesService，以便其他模块可以使用
})
export class RolesModule {}
