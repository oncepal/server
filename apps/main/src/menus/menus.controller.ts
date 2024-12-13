import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto, UpdateMenuDto } from 'libs/dtos/src/menus.dtos';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@libs/decorators';

@ApiTags('menu')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiOperation({ summary: '获取所有菜单' })
  @ApiResponse({ status: 200, description: '菜单已成功获取。'})
  async findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取菜单' })
  @ApiResponse({ status: 200, description: '菜单已成功获取。'})
  @ApiResponse({ status: 404, description: '菜单未找到。' })
  async findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: '创建菜单' })
  @ApiResponse({ status: 201, description: '菜单已成功创建。'})
  @ApiResponse({ status: 403, description: '禁止访问。' })
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '根据ID更新菜单' })
  @ApiResponse({ status: 200, description: '菜单已成功更新。'})
  @ApiResponse({ status: 404, description: '菜单未找到。' })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据ID删除菜单' })
  @ApiResponse({ status: 200, description: '菜单已成功删除。'})
  @ApiResponse({ status: 404, description: '菜单未找到。' })
  async delete(@Param('id') id: string) {
    return this.menusService.delete(id);
  }
}
