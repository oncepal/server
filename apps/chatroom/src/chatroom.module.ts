import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { PrismaModule } from '@libs/prisma';
import { ChatroomGateway } from './chatroom.gateway';
@Module({
  imports: [PrismaModule],
  controllers: [ChatroomController],
  providers: [ChatroomGateway,ChatroomService],
})
export class ChatroomModule {}