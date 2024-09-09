import { ChatroomService } from './chatroom.service';
import { MessagePattern } from '@nestjs/microservices';
import { Prisma, Chatroom } from '@prisma/client';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { UserInfo } from '@libs/decorators';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Get('single')
  async oneToOne(
    @Query('friendId') friendId: number,
    @UserInfo('userId') userId: string,
  ) {
    if (!friendId) {
      throw new BadRequestException('聊天好友的 id 不能为空');
    }
    return this.chatroomService.createSingleChatroom(friendId, userId);
  }

  @Get('group')
  async group(@Query('name') name: string, @UserInfo('userId') userId: string) {
    return this.chatroomService.createGroupChatroom(name, userId);
  }

  @Get('list')
  async list(@UserInfo('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId 不能为空');
    }
    return this.chatroomService.list(userId);
  }
  @Get('quit/:id')
  async quit(@Param('id') id: string, @Query('quitUserId') quitUserId: string) {
    if (!id) {
      throw new BadRequestException('id 不能为空');
    }
    if (!quitUserId) {
      throw new BadRequestException('quitUserId 不能为空');
    }
    return this.chatroomService.quit(id, quitUserId);
  }
  @Get('join/:id')
  async join(@Param('id') id: string, @Query('joinUserId') joinUserId: string) {
    if (!id) {
      throw new BadRequestException('id 不能为空');
    }
    if (!joinUserId) {
      throw new BadRequestException('joinUserId 不能为空');
    }
    return this.chatroomService.join(id, joinUserId);
  }
}
