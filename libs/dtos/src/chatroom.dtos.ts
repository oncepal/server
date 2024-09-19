import { Prisma, $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
  Length,
  IsNumberString,
} from 'class-validator';
export class GetChatroomsDto {
  skip?: number;
  @IsInt({ message: 'take必须是一个数字！' })
  @Type(() => Number)
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

export class GetChatroomDto {
  @IsString({ message: 'id必须是一个字符串' })
  chatroomId: string;
}

export class JoinChatroomDto {
  @IsString({
    message: 'id必须是一个字符串',
  })
  userId: string;
}
export class CreateChatroomDto {
  creatorId?: string | null;
  description?: string | null;

  @IsNotEmpty({ message: '聊天室类型不能为空！' })
  type: $Enums.ChatroomType;
  name?: string | null;
}
export class QuitChatroomDto {
  @IsString({
    message: 'id必须是一个字符串',
  })
  userId: string;
}
