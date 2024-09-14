import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { $Enums } from '@prisma/client';

@Injectable()
export class ChatroomService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async createSingleChatroom(friendId: number, userId: string) {
    const chatroom = await this.prismaService.chatroom.create({
      data: {
        name: '聊天室' + Math.random().toString().slice(2, 8),
        type: $Enums.ChatroomType.SINGLE,
      },

    });
    return '创建成功';
  }

  async createGroupChatroom(name: string, userId: string) {
    const { id } = await this.prismaService.chatroom.create({
      data: {
        name,
        type: $Enums.ChatroomType.SINGLE,
        chaterIds: [userId],
      },
    });

    return '创建成功';
  }
  async join(id: string, userId: string) {
    const user = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    const chatroom = await this.prismaService.chatroom.findUnique({
      where: {
        id,
      },
    });
    if (chatroom.type === $Enums.ChatroomType.SINGLE) {
      throw new BadRequestException('一对一聊天室不能加人');
    }
    if (chatroom)
      await this.prismaService.chatroom.update({
        data: {
          chaterIds: {
            push: userId,
          },
        },
        where: {
          id,
        },
      });

    return '加入成功';
  }
  async list(userId: string) {
    const chatroomIds = await this.prismaService.chatroom.findMany({
      where: {
        chaterIds: {
          has: userId,
        },
      },
      select: {
        id: true,
      },
    });
    const chatrooms = await this.prismaService.chatroom.findMany({
      where: {
        id: {
          in: chatroomIds.map((item) => item.id),
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    });
    return chatrooms;
  }


  async quit(id: string, userId: string) {
    const chatroom = await this.prismaService.chatroom.findUnique({
        where: {
            id
        }
    });
    if(chatroom.type === $Enums.ChatroomType.SINGLE) {
        throw new BadRequestException('一对一聊天室不能退出');
    }

    await this.prismaService.chatroom.update({
        data: {
          chaterIds: chatroom.chaterIds.filter(u=>u!==userId),
        },
        where: {
          id,
        },
      });

    return '退出成功';
}
}
