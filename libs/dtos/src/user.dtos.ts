import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
  Length,
  IsNumberString,
} from 'class-validator';
export class GetUsersDto {
  skip: number = 0;


  @IsInt({ message: 'take必须是一个数字！' })
  @Type(() => Number)
  take: number = 99999;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
