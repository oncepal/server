import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { $Enums, Prisma, User } from '@prisma/client';
import { CaslAbilityFactory, ExtractSubjectType } from '@libs/casl/casl.factory';
import { Action, Role } from '@libs/constants';
import { AppSubjects } from '@libs/casl/casl.factory';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(CaslAbilityFactory)
  private caslAbilityFactory: CaslAbilityFactory;

  async create(user: Prisma.UserUncheckedCreateInput): Promise<User> {
    try {
      const createUser = await this.prismaService.user.create({ data: user });
      return createUser;
    } catch (error) {
      throw new Error(`创建用户失败: ${error.message}`);
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    
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
    data: Prisma.UserUncheckedUpdateInput;
  }): Promise<User> {
    const { data, where } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  async updateUserById(userId:string, data: Prisma.UserUncheckedUpdateInput): Promise<User> {
    const where = {
      id:userId
    }
    return this.update({
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

  async checkPermission(userId: string, action: Action, subject: AppSubjects) {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    const permissions = [
      { action, subject: subject as ExtractSubjectType<AppSubjects> },
    ];

    const ability = await this.caslAbilityFactory.createAbilityForUser(user, permissions);
    if (ability.cannot(action, subject as ExtractSubjectType<AppSubjects>)) {
      throw new BadRequestException('权限不足');
    }
  }
}
