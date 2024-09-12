import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { ChatroomGateway } from './chatroom.gateway';
import { CommonModule } from '@libs/common';
@Module({
  imports: [CommonModule],
  controllers: [ChatroomController],
  providers: [ChatroomGateway,ChatroomService],
})
export class ChatroomModule {}