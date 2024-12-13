import { CreateRoleDto, UpdateRoleDto } from '@libs/dtos/roles.dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/src/prisma.service'; // 导入 PrismaService

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {} // 注入 PrismaService

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    console.log(124124);
    
    return this.prisma.roles.findMany();
  }

  async findOne(id: string) {
    return this.prisma.roles.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.roles.delete({
      where: { id },
    });
  }
}
