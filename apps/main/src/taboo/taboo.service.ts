import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { $Enums, Prisma, Taboo } from '@prisma/client';
import { CaslAbilityFactory, ExtractSubjectType } from '@libs/casl/casl.factory';
import { Action } from '@libs/constants';
import { AppSubjects } from '@libs/casl/casl.factory';

@Injectable()
export class TabooService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(CaslAbilityFactory)
  private caslAbilityFactory: CaslAbilityFactory;
  private readonly logger = new Logger();

  async create(taboo: Prisma.TabooUncheckedCreateInput): Promise<Taboo> {
    try {
      const createTaboo = await this.prismaService.taboo.create({ data: taboo });
      return createTaboo;
    } catch (error) {
      throw new Error(`创建用户失败: ${error.message}`);
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TabooWhereUniqueInput;
    where?: Prisma.TabooWhereInput;
    orderBy?: Prisma.TabooOrderByWithRelationInput;
  }): Promise<Taboo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.taboo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    // return { results, count };
  }

  async findOne(
    tabooWhereUniqueInput: Prisma.TabooWhereUniqueInput,
  ): Promise<Taboo | null> {
    return this.prismaService.taboo.findUnique({
      where: tabooWhereUniqueInput,
    });
  }
  
  async findOneById(id: string) {
    const taboo = await this.findOne({
      id,
    });

    return taboo;
  }

  async update(params: {
    where: Prisma.TabooWhereUniqueInput;
    data: Prisma.TabooUncheckedUpdateInput;
  }): Promise<Taboo> {
    const { data, where } = params;
    return this.prismaService.taboo.update({
      data,
      where,
    });
  }

  async updateTabooById(tabooId:string, data: Prisma.TabooUncheckedUpdateInput): Promise<Taboo> {
    const where = {
      id:tabooId
    }
    return this.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.TabooWhereUniqueInput): Promise<Taboo> {
    return this.prismaService.taboo.delete({
      where,
    });
  }

  async deleteAll() {
    return await this.prismaService.taboo.deleteMany();
  }
}
