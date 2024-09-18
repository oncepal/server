import { ChatroomService } from './chatroom.service';
import { MessagePattern } from '@nestjs/microservices';
import { Prisma, Chatroom } from '@prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UserInfo } from '@libs/decorators';
import { CreateChatroomDto } from '@libs/dtos';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post('single')
  async single(
    @Body() chatroom: CreateChatroomDto,
  ) {
    return this.chatroomService.create(chatroom);
  }


  @Get()
  async chatrooms(@UserInfo('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId 不能为空');
    }
    return this.chatroomService.list(userId);
  }

  @Get('/:id')
  async chatroom(@UserInfo('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId 不能为空');
    }
    return this.chatroomService.list(userId);
  }

  @Patch('join/:id')
  async join(@Param('id') id: string, @Query('joinUserId') joinUserId: string) {
    if (!id) {
      throw new BadRequestException('id 不能为空');
    }
    if (!joinUserId) {
      throw new BadRequestException('joinUserId 不能为空');
    }
    return this.chatroomService.join(id, joinUserId);
  }

  @Patch('quit/:id')
  async quit(@Param('id') id: string, @Query('quitUserId') quitUserId: string) {
    if (!id) {
      throw new BadRequestException('id 不能为空');
    }
    if (!quitUserId) {
      throw new BadRequestException('quitUserId 不能为空');
    }
    return this.chatroomService.quit(id, quitUserId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Query('quitUserId') quitUserId: string) {
    if (!id) {
      throw new BadRequestException('id 不能为空');
    }
    if (!quitUserId) {
      throw new BadRequestException('quitUserId 不能为空');
    }
    return this.chatroomService.quit(id, quitUserId);
  }
}
