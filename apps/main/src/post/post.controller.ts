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
import { Prisma, Post as PostModel } from '@prisma/client';
import { Response } from 'express';
import { error, generateParseIntPipe, generateSkip } from '@libs/utils';
import { Public } from '@libs/decorators';
import { GetPostsDto,CreatePostDto,UpdatePostDto } from '@libs/dtos';
import {
  PoliciesGuard,
  CheckPolicies,
  DeletePostPolicyHandler,
} from '@libs/guards';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 发布帖子
   * @body post 帖子信息
   * @returns 成功信息
   */
  @Post('post')
  @Header('content-type', 'application/json')
  async post(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    return this.postService.create(createPostDto);
  }

  /**
   * 查询匹配条件的用户
   * @query params 查询条件
   * @returns 满足条件的用户列表
   */
  @Public()
  @Get('posts')
  async posts(@Query() getPostsDto: GetPostsDto): Promise<PostModel[]> {
    const { skip, take, cursor, where, orderBy } = getPostsDto;

    return this.postService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 查询帖子详情
   * @param id 帖子id
   * @returns 帖子详情对象
   */
  @Get('post/:id')
  async getPostById(@Param('id') id: string) {
    return await this.postService.findOneById(id);
  }

  /**
   * 修改帖子信息
   * @body 帖子信息
   * @returns 修改后的帖子信息
   */
  @Patch('post/:id')
  async updatePost(@Body() post) {
    return await this.postService.update(post);
  }

  /**
   * 删除帖子
   * @param id 帖子id
   * @returns 删除成功与否
   */
  @Delete('post/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeletePostPolicyHandler())
  async deletePost(@Param('id') id: string) {
    const r = await this.postService.delete({ id });
    return r;
  }

  /**
   * 清空帖子
   * @returns 清空成功与否
   */
  @Delete('posts')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeletePostPolicyHandler())
  async deletePosts() {
    const r = await this.postService.deleteAll();
    return r;
  }
}
