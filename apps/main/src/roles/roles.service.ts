import { CreateRoleDto, UpdateRoleDto } from '@libs/dtos/roles.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/src/prisma.service'; // 导入 PrismaService

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {} // 注入 PrismaService

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
