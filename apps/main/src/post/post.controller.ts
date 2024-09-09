import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
  Req,
  Query,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Header,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma,Post as PostModel } from '@prisma/client';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 创建用户
   * @body postInfo 用户信息
   * @returns 创建好的用户信息
   */
  @Post()
  @Header('content-type', 'application/json')
  async post(@Body() post: Prisma.PostCreateInput, @Res() res: Response) {
    return this.postService.create(post);
  }

  /**
   * 查询匹配条件的用户
   * @query filter 查询条件
   * @returns 满足条件的用户列表
   */
  @Get()
  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PostModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.postService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 查询用户详情
   * @param id 用户id
   * @returns 用户详情对象
   */
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return await this.postService.findOneById(id);
  }

  /**
   * 修改用户信息
   * @body 用户信息
   * @returns 修改后的用户信息
   */
  @Patch()
  async updatePost(@Body() post) {
    return await this.postService.update(post);

  }

  /**
   * 删除用户
   * @param id 用户id
   * @returns 删除成功与否
   */
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    const r = await this.postService.delete({id});
    return r;
  }
}
