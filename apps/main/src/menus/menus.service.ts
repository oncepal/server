import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/prisma/src/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from 'libs/dtos/src/menus.dtos';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.menu.findMany();
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({ data: createMenuDto });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id }, data: updateMenuDto });
  }

  async delete(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
