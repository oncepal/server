import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { Prisma, Role as RoleModel } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from '@libs/dtos';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleModel> {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findOneById(id: string): Promise<RoleModel> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<RoleModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateRoleById(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleModel> {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async delete(where: Prisma.RoleWhereUniqueInput): Promise<RoleModel> {
    return this.prisma.role.delete({
      where,
    });
  }

  async deleteAll(): Promise<Prisma.BatchPayload> {
    return this.prisma.role.deleteMany();
  }
}
