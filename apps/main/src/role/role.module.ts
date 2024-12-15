import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RolesController } from './role.controller';
import { PrismaModule } from 'libs/prisma/src/prisma.module'; // 导入 PrismaModule
import { AuthModule } from '../auth/auth.module'; // 导入 AuthModule
import { UserModule } from '../user/user.module'; // 导入 UserModule

@Module({
  imports: [PrismaModule, AuthModule, UserModule], // 导入 PrismaModule、AuthModule 和 UserModule
  controllers: [RolesController],
  providers: [RoleService],
  exports: [RoleService], // 导出 RolesService，以便其他模块可以使用
})
export class RoleModule {}
