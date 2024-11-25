import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { PrismaModule } from 'libs/prisma/src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
