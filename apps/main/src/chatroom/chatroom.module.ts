import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { ChatroomGateway } from './chatroom.gateway';
@Module({
  imports: [],
  controllers: [ChatroomController],
  providers: [ChatroomGateway,ChatroomService],
})
export class ChatroomModule {}