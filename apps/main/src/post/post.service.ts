import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { $Enums, Prisma, Post } from '@prisma/client';

@Injectable()
export class PostService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async create(post: Prisma.PostCreateInput): Promise<Post> {
    const createPost = await this.prismaService.post.create({ data: post });
    return createPost;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    // return { results, count };
  }

  async findOne(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prismaService.post.findUnique({
      where: postWhereUniqueInput,
    });
  }
  async findOneById(id: string) {
    const post = await this.findOne({
      id,
    });

    return post;
  }


  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prismaService.post.update({
      data,
      where,
    });
  }
  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prismaService.post.delete({
      where,
    });
  }

  async deleteAll() {
    return await this.prismaService.post.deleteMany();
  }
}
