import { $Enums,Like, Prisma,Post, Achievement, Demand } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsInt,
  IsNotEmpty,
  Length,
  IsNumberString,
} from 'class-validator';
export class GetPostsDto {

  skip: number = 0;
  @IsInt({ message: 'take必须是一个数字！' })
  @Type(() => Number)
  take: number = 99999;
  cursor?: Prisma.PostWhereUniqueInput;
  where?: Prisma.PostWhereInput;
  orderBy?: Prisma.PostOrderByWithRelationInput;

}
export class CreatePostDto {
  content: string;
  @IsString({message:'authorId 不能为空'})
  authorId: string
  topicsId: string;
  views: number =0;
}

export class UpdatePostDto extends CreatePostDto{
  @IsString({message:'postId不能为空'})
  id: string
}