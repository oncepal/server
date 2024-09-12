import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { $Enums, Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const createUser = await this.prismaService.user.create({ data: user });
    return createUser;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    console.log(params);
    
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    // return { results, count };
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  
  async findOneById(id: string) {
    const user = await this.findOne({
      id,
    });

    return user;
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    const user = await this.findOne({
      phoneNumber,
    });

    return user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { data, where } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }
  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    });
  }

  async deleteAll() {
    return await this.prismaService.user.deleteMany();
  }
}
